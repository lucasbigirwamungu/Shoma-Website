import { describe, expect, it } from 'vitest';
import { aiCatalog, discoveryResponse, handleMcpPost, serverCard } from '@/lib/mcp-server';

const rpc = (body: unknown, headers: Record<string, string> = {}) =>
  handleMcpPost(
    new Request('https://shoma.example/mcp', {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json, text/event-stream', ...headers },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    }),
  );

describe('MCP server', () => {
  it('negotiates the protocol version on initialize', async () => {
    const res = await rpc({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 't', version: '1' } } });
    const body = await res.json();
    expect(res.headers.get('content-type')).toBe('application/json');
    expect(body.result.protocolVersion).toBe('2025-06-18');
    expect(body.result.capabilities.tools).toBeDefined();
    expect(body.result.serverInfo.name).toBe('nl.shoma/stichting-shoma');
  });

  it('falls back to the latest version for unknown versions', async () => {
    const body = await (await rpc({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '1999-01-01' } })).json();
    expect(body.result.protocolVersion).toBe('2025-11-25');
  });

  it('acknowledges notifications with 202', async () => {
    const res = await rpc({ jsonrpc: '2.0', method: 'notifications/initialized' });
    expect(res.status).toBe(202);
  });

  it('lists read-only tools', async () => {
    const body = await (await rpc({ jsonrpc: '2.0', id: 2, method: 'tools/list' })).json();
    const names = body.result.tools.map((t: { name: string }) => t.name);
    expect(names).toEqual(['get_organization', 'list_projects', 'how_to_donate', 'get_page']);
    for (const tool of body.result.tools) expect(tool.annotations.readOnlyHint).toBe(true);
  });

  it('calls tools', async () => {
    const org = await (await rpc({ jsonrpc: '2.0', id: 3, method: 'tools/call', params: { name: 'get_organization', arguments: {} } })).json();
    expect(JSON.parse(org.result.content[0].text).rsin).toBe('814390249');

    const page = await (await rpc({ jsonrpc: '2.0', id: 4, method: 'tools/call', params: { name: 'get_page', arguments: { path: '/contact' } } })).json();
    expect(page.result.content[0].text).toContain('info@shoma.nl');

    const missing = await (await rpc({ jsonrpc: '2.0', id: 5, method: 'tools/call', params: { name: 'get_page', arguments: { path: '/nope' } } })).json();
    expect(missing.result.isError).toBe(true);
  });

  it('returns JSON-RPC errors', async () => {
    expect((await (await rpc({ jsonrpc: '2.0', id: 6, method: 'nope' })).json()).error.code).toBe(-32601);
    expect((await (await rpc({ jsonrpc: '2.0', id: 7, method: 'tools/call', params: { name: 'nope' } })).json()).error.code).toBe(-32602);
    const parse = await rpc('{not json');
    expect(parse.status).toBe(400);
    expect((await parse.json()).error.code).toBe(-32700);
    expect((await (await rpc([{ jsonrpc: '2.0', id: 1, method: 'ping' }])).json()).error.code).toBe(-32600);
  });

  it('rejects an unsupported MCP-Protocol-Version header', async () => {
    const res = await rpc({ jsonrpc: '2.0', id: 1, method: 'ping' }, { 'mcp-protocol-version': '1999-01-01' });
    expect(res.status).toBe(400);
  });
});

describe('MCP discovery documents', () => {
  it('builds a valid server card', () => {
    const card = serverCard();
    expect(card.$schema).toBe('https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json');
    expect(card.name).toMatch(/^[a-zA-Z0-9.-]+\/[a-zA-Z0-9._-]+$/);
    expect(card.description.length).toBeLessThanOrEqual(100);
    expect(card.remotes[0].type).toBe('streamable-http');
    expect(card.remotes[0].url).toMatch(/\/mcp$/);
  });

  it('points the AI catalog at the server card', () => {
    const entry = aiCatalog().entries[0];
    expect(entry.type).toBe('application/mcp-server-card+json');
    expect(entry.url).toMatch(/\/mcp\/server-card$/);
    expect(entry.identifier).toMatch(/^urn:air:/);
  });

  it('serves discovery JSON with CORS, caching and ETag revalidation', async () => {
    const first = discoveryResponse(new Request('https://x/'), serverCard(), 'application/mcp-server-card+json');
    expect(first.headers.get('content-type')).toBe('application/mcp-server-card+json');
    expect(first.headers.get('access-control-allow-origin')).toBe('*');
    expect(first.headers.get('cache-control')).toBe('public, max-age=3600');
    const etag = first.headers.get('etag')!;
    const second = discoveryResponse(new Request('https://x/', { headers: { 'if-none-match': etag } }), serverCard(), 'application/mcp-server-card+json');
    expect(second.status).toBe(304);
  });
});
