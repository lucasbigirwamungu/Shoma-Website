import { Resend } from 'resend';
import {
  getDonationConfirmationEmail,
  getBusinessCertificateEmail,
  getNewsletterWelcomeEmail,
} from './email-templates';

// Initialize Resend (fallback: null if API key not configured)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * Send donation confirmation email
 */
export async function sendDonationConfirmationEmail(
  donorEmail: string,
  donorName: string,
  treesCount: number,
  co2Kg: number,
  certificateUrl: string
) {
  const emailData = getDonationConfirmationEmail(
    donorName,
    treesCount,
    co2Kg,
    certificateUrl
  );

  if (!resend) {
    console.warn(`⚠ Resend not configured. Email to ${donorEmail} would have been sent with subject: "${emailData.subject}"`);
    return null;
  }

  try {
    const result = await resend.emails.send({
      from: 'Stichting Shoma <info@shoma.nl>',
      to: donorEmail,
      subject: emailData.subject,
      html: emailData.html,
    });

    console.log(`✓ Confirmation email sent to ${donorEmail}`, result);
    return result;
  } catch (error) {
    console.error(`✗ Failed to send confirmation email to ${donorEmail}:`, error);
    logEmailError(donorEmail, 'donation_confirmation', error);
    return null;
  }
}

/**
 * Send business MVO certificate email
 */
export async function sendBusinessCertificateEmail(
  companyEmail: string,
  companyName: string,
  treesCount: number,
  co2Kg: number,
  certificateUrl: string
) {
  const emailData = getBusinessCertificateEmail(
    companyName,
    treesCount,
    co2Kg,
    certificateUrl
  );

  if (!resend) {
    console.warn(`⚠ Resend not configured. Email to ${companyEmail} would have been sent with subject: "${emailData.subject}"`);
    return null;
  }

  try {
    const result = await resend.emails.send({
      from: 'Stichting Shoma <info@shoma.nl>',
      to: companyEmail,
      subject: emailData.subject,
      html: emailData.html,
    });

    console.log(`✓ Business certificate email sent to ${companyEmail}`, result);
    return result;
  } catch (error) {
    console.error(`✗ Failed to send certificate email to ${companyEmail}:`, error);
    logEmailError(companyEmail, 'business_certificate', error);
    return null;
  }
}

/**
 * Send newsletter welcome
 */
export async function sendNewsletterWelcome(
  email: string,
  donorName: string
) {
  const emailData = getNewsletterWelcomeEmail(donorName);

  if (!resend) {
    console.warn(`⚠ Resend not configured. Newsletter welcome to ${email} would have been sent`);
    return null;
  }

  try {
    const result = await resend.emails.send({
      from: 'Stichting Shoma <info@shoma.nl>',
      to: email,
      subject: emailData.subject,
      html: emailData.html,
    });

    console.log(`✓ Newsletter welcome sent to ${email}`, result);
    return result;
  } catch (error) {
    console.error(`✗ Failed to send newsletter welcome to ${email}:`, error);
    return null;
  }
}

/**
 * Fallback: log email errors for manual review
 */
function logEmailError(email: string, type: string, error: unknown) {
  // In production: send to logging service (e.g., Sentry)
  console.error(`[EMAIL_ERROR] ${type} to ${email}:`, error);

  // You could also store in DB for admin review:
  // await supabase.from('email_logs').insert({
  //   recipient: email,
  //   type,
  //   status: 'failed',
  //   error_message: String(error),
  // });
}

/**
 * Send transactional email (generic)
 */
export async function sendTransactionalEmail(
  to: string,
  subject: string,
  html: string
) {
  if (!resend) {
    console.warn(`⚠ Resend not configured. Email to ${to} would have been sent with subject: "${subject}"`);
    return null;
  }

  try {
    return await resend.emails.send({
      from: 'Stichting Shoma <info@shoma.nl>',
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
    return null;
  }
}

/**
 * Send batch email to multiple recipients
 */
export async function sendBatchEmail(
  recipients: Array<{ email: string; name: string }>,
  subject: string,
  htmlGenerator: (name: string) => string
) {
  const results = await Promise.all(
    recipients.map((recipient) =>
      sendTransactionalEmail(
        recipient.email,
        subject,
        htmlGenerator(recipient.name)
      )
    )
  );

  const successful = results.filter((r) => r !== null).length;
  console.log(`Sent ${successful}/${recipients.length} emails`);

  return results;
}
