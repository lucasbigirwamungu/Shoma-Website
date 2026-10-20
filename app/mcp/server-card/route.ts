import { discoveryResponse, serverCard } from '@/lib/mcp-server';

export function GET(request: Request) {
  return discoveryResponse(request, serverCard(), 'application/mcp-server-card+json');
}
