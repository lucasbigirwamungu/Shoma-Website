/**
 * Rate Limiting Middleware
 * Prevent abuse and DoS attacks
 */

interface RateLimitStore {
  [key: string]: { count: number; resetTime: number };
}

const store: RateLimitStore = {};

export interface RateLimitConfig {
  requests: number; // Max requests
  windowMs: number; // Time window in milliseconds
  keyGenerator?: (request: Request) => string;
}

const defaultConfig: RateLimitConfig = {
  requests: parseInt(process.env.RATE_LIMIT_REQUESTS || '100'),
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'), // 15 minutes
};

/**
 * Create rate limit middleware
 */
export function createRateLimiter(config: Partial<RateLimitConfig> = {}) {
  const finalConfig = { ...defaultConfig, ...config };

  return async (request: Request): Promise<{ limited: boolean; remaining: number }> => {
    const ip = getClientIp(request);
    const key = ip;

    const now = Date.now();
    const record = store[key];

    if (!record || record.resetTime < now) {
      // Reset window
      store[key] = {
        count: 1,
        resetTime: now + finalConfig.windowMs,
      };
      return { limited: false, remaining: finalConfig.requests - 1 };
    }

    record.count++;

    if (record.count > finalConfig.requests) {
      return { limited: true, remaining: 0 };
    }

    return { limited: false, remaining: finalConfig.requests - record.count };
  };
}

/**
 * Get client IP from request
 */
function getClientIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp;

  // Fallback (won't work in production without proper headers from reverse proxy)
  return 'unknown';
}

/**
 * Rate limit response helper
 */
export function rateLimitExceeded(remaining: number): Response {
  return new Response(
    JSON.stringify({
      error: 'Too many requests',
      message: 'Rate limit exceeded. Please try again later.',
      retryAfter: remaining,
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': '60',
      },
    }
  );
}

/**
 * Cleanup old entries every hour
 */
export function startRateLimitCleanup(intervalMs = 3600000) {
  setInterval(() => {
    const now = Date.now();
    for (const key in store) {
      if (store[key].resetTime < now) {
        delete store[key];
      }
    }
  }, intervalMs);
}

// Start cleanup on module load
if (typeof globalThis !== 'undefined') {
  startRateLimitCleanup();
}
