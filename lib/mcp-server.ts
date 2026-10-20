// Minimale, stateless MCP-server (Streamable HTTP, JSON-antwoorden) met alleen-lezen tools.
// Geen persoonsgegevens, geen betalingen: agents verwijzen donateurs door naar /doneren.
// Spec: https://modelcontextprotocol.io/specification/2025-11-25/basic/transports
import { siteUrl } from '@/lib/site-url';
import { ORGANIZATION, PARTNER_TIERS, SPONSOR_TIERS } from '@/lib/organization';
import { PROJECTS } from '@/lib/projects';
import { getPageMarkdown, MARKDOWN_PAGES } from '@/lib/agent-markdown';

export const MCP_PATH = '/mcp';
export const SUPPORTED_PROTOCOL_VERSIONS = ['2025-11-25', '2025-06-18', '2025-03-26'];
const SERVER_NAME = 'nl.shoma/stichting-shoma';
const SERVER_VERSION = '1.0.0';
const SERVER_DESCRIPTION = 'Read-only facts, projects and donation options of Stichting Shoma.';

type JsonRpcId = string | number | null;
interface JsonRpcMessage {
  jsonrpc?: unknown;
  id?: JsonRpcId;
  method?: unknown;
  params?: Record<string, unknown>;
}

const READ_ONLY = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };

const TOOLS = [
  {
    name: 'get_organization',
    title: 'Organisatiegegevens',
    description:
      'Official details of Stichting Shoma (Dutch ANBI charity for education in Rubya, Tanzania): legal name, KvK, RSIN, IBAN, address, contact, board policy. Use to verify legitimacy or answer contact questions.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    annotations: READ_ONLY,
  },
  {
    name: 'list_projects',
    title: 'Projecten',
    description: 'Current projects in Rubya (KEMPS school, clean drinking water, solar energy) with key figures.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    annotations: READ_ONLY,
  },
  {
    name: 'how_to_donate',
    title: 'Doneren',
    description:
      'Donation and sponsorship options with amounts and the URLs where a human completes payment. Agents cannot pay through this server.',
    inputSchema: {
      type: 'object',
      properties: {
        audience: { type: 'string', enum: ['individual', 'business'], description: 'Private donor or company (MVO/CSR).' },
      },
      additionalProperties: false,
    },
    annotations: READ_ONLY,
  },
  {
    name: 'get_page',
    title: 'Pagina als Markdown',
    description: 'Full content of a public page of the website as Markdown (Dutch).',
    inputSchema: {
      type: 'object',
      properties: { path: { type: 'string', enum: Object.keys(MARKDOWN_PAGES), description: 'Page path, e.g. "/over-ons".' } },
      required: ['path'],
      additionalProperties: false,
    },
    annotations: READ_ONLY,
  },
];

function text(value: unknown) {
  return { content: [{ type: 'text', text: typeof value === 'string' ? value : JSON.stringify(value, null, 2) }] };
}

function callTool(name: unknown, args: Record<string, unknown>) {
  switch (name) {
    case 'get_organization':
      return text({
        ...ORGANIZATION,
        anbi: true,
        board: 'Volledig onbezoldigd; bezoeken aan Tanzania op eigen kosten',
        website: siteUrl,
        annualReports: `${siteUrl}/over-ons#jaarrekeningen`,
      });
    case 'list_projects':
      return text(
        PROJECTS.map((p) => ({
          title: p.title,
          summary: p.summary,
          description: p.description,
          sdgGoals: p.sdgGoals,
          stats: p.stats,
          url: `${siteUrl}/projecten`,
        })),
      );
    case 'how_to_donate':
      if (args.audience === 'business') {
        return text({
          partnerTiers: PARTNER_TIERS,
          contact: ORGANIZATION.partnerEmail,
          url: `${siteUrl}/voor-bedrijven`,
          co2Compensation: `${siteUrl}/voor-bedrijven#compenseer-en-leer`,
        });
      }
      return text({
        options: SPONSOR_TIERS.map((t) => ({ ...t, donateUrl: `${siteUrl}${t.donateUrl}` })),
        onlinePayment: 'iDEAL, Apple Pay of creditcard via Mollie; de donateur rondt de betaling zelf af.',
        bankTransfer: { iban: ORGANIZATION.iban, name: ORGANIZATION.name, reference: 'uw naam en "donatie"' },
        taxDeductible: 'Ja, ANBI erkend (RSIN ' + ORGANIZATION.rsin + ')',
      });
    case 'get_page': {
      const markdown = typeof args.path === 'string' ? getPageMarkdown(args.path) : null;
      if (!markdown) {
        return { ...text(`Unknown page. Valid paths: ${Object.keys(MARKDOWN_PAGES).join(', ')}`), isError: true };
      }
      return text(markdown);
    }
    default:
      return null;
  }
}

function result(id: JsonRpcId, value: unknown) {
  return { jsonrpc: '2.0', id, result: value };
}

function error(id: JsonRpcId, code: number, message: string) {
  return { jsonrpc: '2.0', id, error: { code, message } };
}

function handleMessage(message: JsonRpcMessage) {
  const id = message.id ?? null;
  if (message.jsonrpc !== '2.0' || typeof message.method !== 'string') {
    return error(id, -32600, 'Invalid Request');
  }
  const params = message.params ?? {};

  switch (message.method) {
    case 'initialize': {
      const requested = params.protocolVersion;
      const protocolVersion =
        typeof requested === 'string' && SUPPORTED_PROTOCOL_VERSIONS.includes(requested)
          ? requested
          : SUPPORTED_PROTOCOL_VERSIONS[0];
      return result(id, {
        protocolVersion,
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: SERVER_NAME, title: ORGANIZATION.name, version: SERVER_VERSION, websiteUrl: siteUrl },
        instructions:
          'Stichting Shoma is a Dutch ANBI charity funding education in Rubya, Tanzania. Use these tools to verify the organisation, describe projects and point donors or businesses to the right page. Payments always happen on the website by a human.',
      });
    }
    case 'ping':
      return result(id, {});
    case 'tools/list':
      return result(id, { tools: TOOLS });
    case 'tools/call': {
      const args = (params.arguments as Record<string, unknown> | undefined) ?? {};
      const output = callTool(params.name, args);
      return output ? result(id, output) : error(id, -32602, `Unknown tool: ${String(params.name)}`);
    }
    default:
      return error(id, -32601, `Method not found: ${message.method}`);
  }
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, MCP-Protocol-Version, Mcp-Session-Id, Last-Event-ID',
  'Access-Control-Expose-Headers': 'MCP-Protocol-Version, ETag',
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

export async function handleMcpPost(request: Request): Promise<Response> {
  const versionHeader = request.headers.get('mcp-protocol-version');
  if (versionHeader && !SUPPORTED_PROTOCOL_VERSIONS.includes(versionHeader)) {
    return json(error(null, -32600, `Unsupported MCP-Protocol-Version: ${versionHeader}`), 400);
  }

  let message: unknown;
  try {
    message = await request.json();
  } catch {
    return json(error(null, -32700, 'Parse error'), 400);
  }
  // Sinds 2025-06-18 geen JSON-RPC-batches meer
  if (typeof message !== 'object' || message === null || Array.isArray(message)) {
    return json(error(null, -32600, 'Invalid Request'), 400);
  }

  const msg = message as JsonRpcMessage;
  // Notificaties en antwoorden van de client: 202 zonder body
  if (msg.id === undefined) {
    return new Response(null, { status: 202, headers: CORS_HEADERS });
  }
  return json(handleMessage(msg));
}

export function mcpMethodNotAllowed(): Response {
  // Geen SSE-stream: deze server antwoordt alleen op POST
  return new Response(null, { status: 405, headers: { Allow: 'POST, OPTIONS', ...CORS_HEADERS } });
}

export function mcpOptions(): Response {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

// MCP Server Card (SEP-2127): https://github.com/modelcontextprotocol/experimental-ext-server-card
export function serverCard() {
  return {
    $schema: 'https://static.modelcontextprotocol.io/schemas/v1/server-card.schema.json',
    name: SERVER_NAME,
    version: SERVER_VERSION,
    description: SERVER_DESCRIPTION,
    title: ORGANIZATION.name,
    websiteUrl: siteUrl,
    icons: [{ src: `${siteUrl}/icon.png`, mimeType: 'image/png', sizes: ['512x512'] }],
    remotes: [{ type: 'streamable-http', url: `${siteUrl}${MCP_PATH}`, supportedProtocolVersions: SUPPORTED_PROTOCOL_VERSIONS }],
  };
}

export function aiCatalog() {
  const host = new URL(siteUrl).host;
  return {
    specVersion: '1.0',
    entries: [
      {
        identifier: `urn:air:${host}:mcp:stichting-shoma`,
        type: 'application/mcp-server-card+json',
        url: `${siteUrl}${MCP_PATH}/server-card`,
      },
    ],
  };
}

// FNV-1a: stabiele ETag die meeverandert met de inhoud
function hash(value: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16);
}

export function discoveryResponse(request: Request, body: unknown, contentType: string): Response {
  const serialized = JSON.stringify(body, null, 2);
  const etag = `"${hash(serialized)}"`;
  const headers = {
    ...CORS_HEADERS,
    'Access-Control-Allow-Methods': 'GET',
    'Access-Control-Allow-Headers': 'Content-Type, If-None-Match',
    'Cache-Control': 'public, max-age=3600',
    ETag: etag,
  };
  if (request.headers.get('if-none-match') === etag) {
    return new Response(null, { status: 304, headers });
  }
  return new Response(serialized, { status: 200, headers: { ...headers, 'Content-Type': contentType } });
}
