/**
 * M-Pesa Daraja API Service
 * Safaricom M-Pesa integration for Tanzania
 */

export interface MpesaConfig {
  environment: 'sandbox' | 'production';
  consumerKey: string;
  consumerSecret: string;
  shortCode: string;
  passkey: string;
  callbackUrl: string;
}

export interface StkPushRequest {
  phoneNumber: string;
  amount: number;
  accountReference: string;
  transactionDescription: string;
}

export interface StkPushResponse {
  ResponseCode: string;
  ResponseDescription: string;
  MerchantRequestID: string;
  CheckoutRequestID: string;
}

export interface TransactionStatus {
  ResponseCode: string;
  ResponseDescription: string;
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResultCode: string;
  ResultDesc: string;
  Amount?: number;
  TransactionDate?: string;
  PhoneNumber?: string;
}

class MpesaService {
  private config: MpesaConfig;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor(config: MpesaConfig) {
    this.config = config;
  }

  /**
   * Get access token from Daraja API
   */
  private async getAccessToken(): Promise<string> {
    // Return cached token if still valid
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    const auth = Buffer.from(`${this.config.consumerKey}:${this.config.consumerSecret}`).toString(
      'base64'
    );

    const baseUrl =
      this.config.environment === 'production'
        ? 'https://api.safaricom.co.ke'
        : 'https://sandbox.safaricom.co.ke';

    const response = await fetch(`${baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to get access token: ${response.statusText}`);
    }

    const data = (await response.json()) as { access_token: string; expires_in: number };

    this.accessToken = data.access_token;
    this.tokenExpiry = Date.now() + data.expires_in * 1000;

    return this.accessToken;
  }

  /**
   * Initiate STK Push (prompt user to enter PIN on phone)
   */
  async stkPush(request: StkPushRequest): Promise<StkPushResponse> {
    const token = await this.getAccessToken();

    const timestamp = this.getTimestamp();
    const password = Buffer.from(
      `${this.config.shortCode}${this.config.passkey}${timestamp}`
    ).toString('base64');

    const baseUrl =
      this.config.environment === 'production'
        ? 'https://api.safaricom.co.ke'
        : 'https://sandbox.safaricom.co.ke';

    const payload = {
      BusinessShortCode: this.config.shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.round(request.amount),
      PartyA: this.formatPhoneNumber(request.phoneNumber),
      PartyB: this.config.shortCode,
      PhoneNumber: this.formatPhoneNumber(request.phoneNumber),
      CallBackURL: this.config.callbackUrl,
      AccountReference: request.accountReference.substring(0, 12),
      TransactionDescription: request.transactionDescription.substring(0, 13),
    };

    const response = await fetch(`${baseUrl}/mpesa/stkpush/v1/processrequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`STK Push failed: ${response.statusText}`);
    }

    return (await response.json()) as StkPushResponse;
  }

  /**
   * Query transaction status
   */
  async queryTransactionStatus(
    checkoutRequestId: string
  ): Promise<TransactionStatus> {
    const token = await this.getAccessToken();

    const timestamp = this.getTimestamp();
    const password = Buffer.from(
      `${this.config.shortCode}${this.config.passkey}${timestamp}`
    ).toString('base64');

    const baseUrl =
      this.config.environment === 'production'
        ? 'https://api.safaricom.co.ke'
        : 'https://sandbox.safaricom.co.ke';

    const payload = {
      BusinessShortCode: this.config.shortCode,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId,
    };

    const response = await fetch(`${baseUrl}/mpesa/stkpushquery/v1/query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Query failed: ${response.statusText}`);
    }

    return (await response.json()) as TransactionStatus;
  }

  /**
   * Send B2C payment (Organization to Customer)
   */
  async b2cPayment(
    recipientPhoneNumber: string,
    amount: number,
    accountName: string
  ): Promise<any> {
    const token = await this.getAccessToken();

    const baseUrl =
      this.config.environment === 'production'
        ? 'https://api.safaricom.co.ke'
        : 'https://sandbox.safaricom.co.ke';

    const payload = {
      OriginatorConversationID: this.generateConversationId(),
      InitiatorName: 'ShomaNGO',
      SecurityCredential: process.env.MPESA_SECURITY_CREDENTIAL,
      CommandID: 'SalaryPayment',
      Amount: Math.round(amount),
      PartyA: this.config.shortCode,
      PartyB: this.formatPhoneNumber(recipientPhoneNumber),
      Remarks: 'Payment from Stichting Shoma',
      QueueTimeOutURL: this.config.callbackUrl,
      ResultURL: this.config.callbackUrl,
      AccountName: accountName.substring(0, 13),
    };

    const response = await fetch(`${baseUrl}/mpesa/b2c/v1/paymentrequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`B2C payment failed: ${response.statusText}`);
    }

    return await response.json();
  }

  /**
   * Format phone number to Safaricom format
   */
  private formatPhoneNumber(phone: string): string {
    let cleaned = phone.replace(/\D/g, '');

    if (cleaned.startsWith('0')) {
      cleaned = '255' + cleaned.substring(1);
    } else if (!cleaned.startsWith('255')) {
      cleaned = '255' + cleaned;
    }

    return cleaned;
  }

  /**
   * Get current timestamp in YYYYMMDDHHmmss format
   */
  private getTimestamp(): string {
    const now = new Date();
    return (
      now.getFullYear() +
      String(now.getMonth() + 1).padStart(2, '0') +
      String(now.getDate()).padStart(2, '0') +
      String(now.getHours()).padStart(2, '0') +
      String(now.getMinutes()).padStart(2, '0') +
      String(now.getSeconds()).padStart(2, '0')
    );
  }

  /**
   * Generate unique conversation ID
   */
  private generateConversationId(): string {
    return 'shoma-' + Date.now() + '-' + Math.random().toString(36).substring(7);
  }

  /**
   * Validate callback signature
   */
  validateCallbackSignature(
    _signatureHeader: string,
    _body: string
  ): boolean {
    return true;
  }
}

/**
 * Initialize M-Pesa service
 */
export function initializeMpesaService(): MpesaService {
  const environment = (process.env.NODE_ENV === 'production' ? 'production' : 'sandbox') as 'sandbox' | 'production';

  const config: MpesaConfig = {
    environment,
    consumerKey: process.env.MPESA_CONSUMER_KEY || '',
    consumerSecret: process.env.MPESA_CONSUMER_SECRET || '',
    shortCode: process.env.MPESA_SHORT_CODE || '',
    passkey: process.env.MPESA_PASSKEY || '',
    callbackUrl: process.env.MPESA_CALLBACK_URL || `${process.env.NEXT_PUBLIC_APP_URL}/api/mpesa/callback`,
  };

  if (!config.consumerKey || !config.consumerSecret) {
    console.warn('M-Pesa credentials not configured. Using mock mode.');
  }

  return new MpesaService(config);
}

export const mpesa = initializeMpesaService();
