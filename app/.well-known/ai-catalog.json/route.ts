import { aiCatalog, discoveryResponse } from '@/lib/mcp-server';

export function GET(request: Request) {
  return discoveryResponse(request, aiCatalog(), 'application/ai-catalog+json');
}
