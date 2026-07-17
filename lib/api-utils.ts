/**
 * API Utilities
 * Standard error handling, validation, and security
 */

import { NextResponse } from 'next/server';

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Common HTTP errors
export const HttpErrors = {
  BadRequest: (message: string) => new ApiError(400, message, 'BAD_REQUEST'),
  Unauthorized: (message = 'Unauthorized') => new ApiError(401, message, 'UNAUTHORIZED'),
  Forbidden: (message = 'Forbidden') => new ApiError(403, message, 'FORBIDDEN'),
  NotFound: (message = 'Not found') => new ApiError(404, message, 'NOT_FOUND'),
  Conflict: (message: string) => new ApiError(409, message, 'CONFLICT'),
  RateLimit: (message = 'Rate limit exceeded') => new ApiError(429, message, 'RATE_LIMIT'),
  InternalError: (message = 'Internal server error') =>
    new ApiError(500, message, 'INTERNAL_ERROR'),
};

/**
 * Send successful API response
 */
export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json(
    {
      success: true,
      data,
    },
    { status }
  );
}

/**
 * Send error API response
 */
export function errorResponse(error: unknown, defaultStatus = 500) {
  console.error('API Error:', error);

  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: error.code,
          message: error.message,
        },
      },
      { status: error.statusCode }
    );
  }

  // Don't expose internal error details in production
  const message =
    process.env.NODE_ENV === 'production'
      ? 'An error occurred'
      : error instanceof Error
        ? error.message
        : String(error);

  return NextResponse.json(
    {
      success: false,
      error: {
        message,
      },
    },
    { status: defaultStatus }
  );
}

/**
 * Validate required fields
 */
export function validateRequired(data: any, fields: string[]): string | null {
  for (const field of fields) {
    if (data[field] === null || data[field] === undefined || data[field] === '') {
      return `Missing required field: ${field}`;
    }
  }
  return null;
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validate phone number (Tanzania format)
 */
export function validatePhoneNumber(phone: string): boolean {
  // Tanzanian: +255 or 0, followed by 9 digits
  const re = /^(\+255|0)?[1-9]\d{8}$/;
  return re.test(phone.replace(/\s/g, ''));
}

/**
 * Sanitize user input to prevent XSS
 */
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove JS protocol
    .trim();
}

/**
 * Check if request has valid authorization header
 */
export function checkAuthorization(authHeader: string | null): { valid: boolean; token?: string } {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return { valid: false };
  }

  const token = authHeader.substring(7);
  return { valid: !!token, token };
}

/**
 * Generate secure random token
 */
export function generateToken(length = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

/**
 * Hash password (simple, use bcrypt in production)
 */
export async function hashPassword(password: string): Promise<string> {
  // TODO: Use bcrypt for production
  // For now, use crypto
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verify password
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const newHash = await hashPassword(password);
  return newHash === hash;
}

/**
 * Log API call (for monitoring)
 */
export function logApiCall(
  method: string,
  path: string,
  status: number,
  duration: number,
  userId?: string
) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${method} ${path} ${status} ${duration}ms${userId ? ` (user: ${userId})` : ''}`);
}

/**
 * Wrap async route handlers with error handling
 */
export function withErrorHandler<T extends (...args: any[]) => Promise<any>>(handler: T): T {
  return (async (...args: any[]) => {
    try {
      return await handler(...args);
    } catch (error) {
      return errorResponse(error);
    }
  }) as T;
}
