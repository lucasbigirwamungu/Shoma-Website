import { createRateLimiter, rateLimitExceeded } from '@/lib/rate-limiter';
import { handleMcpPost, mcpMethodNotAllowed, mcpOptions } from '@/lib/mcp-server';

const limiter = createRateLimiter({ requests: 120, windowMs: 60_000 });

export async function POST(request: Request) {
  const { limited, remaining } = await limiter(request);
  if (limited) return rateLimitExceeded(remaining);
  return handleMcpPost(request);
}

export const GET = mcpMethodNotAllowed;
export const DELETE = mcpMethodNotAllowed;
export const OPTIONS = mcpOptions;
