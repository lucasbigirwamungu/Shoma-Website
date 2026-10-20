// Domeinbrede verwijzing naar de MCP-server: GET geeft de Server Card, POST spreekt MCP zelf
import { discoveryResponse, handleMcpPost, mcpOptions, serverCard } from '@/lib/mcp-server';

export function GET(request: Request) {
  return discoveryResponse(request, serverCard(), 'application/mcp-server-card+json');
}

export const POST = handleMcpPost;
export const OPTIONS = mcpOptions;
