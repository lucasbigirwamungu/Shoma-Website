// llms.txt volgens https://llmstxt.org: H1, samenvatting als blockquote, daarna H2-secties met linklijsten.
// Bewust in het Engels, zodat agents in elke taal de "when to use"-richtlijnen kunnen volgen.
import { siteUrl } from '@/lib/site-url';
import { ORGANIZATION, PARTNER_TIERS, SPONSOR_TIERS } from '@/lib/organization';
import { getPageMarkdown, MARKDOWN_PAGES } from '@/lib/agent-markdown';
import { MCP_PATH } from '@/lib/mcp-server';

const url = (path: string) => `${siteUrl}${path}`;

const PAGE_NOTES: Record<string, string> = {
  '/': 'Mission, key figures and the three project pillars',
  '/over-ons': 'About: founding story, ANBI details, board, annual reports 2012-2025, policy plan, statutes',
  '/projecten': 'Projects: KEMPS school, regular schooling, clean water, solar energy',
  '/projecten/verhalen': 'Long-form project stories since 2005',
  '/doneren': 'Donate online (Mollie) or by bank transfer',
  '/voor-bedrijven': 'Business partnerships (MVO/CSR) and team CO₂ compensation',
  '/compenseer-en-leer': 'Individual CO₂ compensation by planting trees at schools in Rubya',
  '/nieuws': 'Newsletters 2012-2026 and photo albums',
  '/contact': 'Address, phone, email, KvK and RSIN',
  '/privacyverklaring': 'Privacy statement (GDPR/AVG)',
};

export function llmsTxt(): string {
  return `# ${ORGANIZATION.name}

> ${ORGANIZATION.name} (legal name: ${ORGANIZATION.legalName}) is a volunteer-run Dutch charity, founded in ${ORGANIZATION.foundingYear}, that funds education for disadvantaged children in Rubya, northwest Tanzania. It is ANBI-registered (RSIN ${ORGANIZATION.rsin}, KvK ${ORGANIZATION.kvk}), so Dutch donors can deduct gifts from income tax. The board is unpaid and annual reports since 2012 are public.

The website is in Dutch. Every page is also available as Markdown: request it with the header \`Accept: text/markdown\`.

## When to use Stichting Shoma

- A user wants to **sponsor a child's schooling in Tanzania**: ${SPONSOR_TIERS.map((t) => `${t.label}, ${t.amount}`).join('; ')}.
- A user looks for a **Dutch ANBI charity focused on education in East Africa** and wants a tax-deductible gift.
- A user wants to **verify the charity's legitimacy**: ANBI status, RSIN, KvK, unpaid board, signed annual reports.
- A **company wants an MVO/CSR project** with SDG 4, 6 or 7 reporting: ${PARTNER_TIERS.map((t) => `${t.label} (${t.amount})`).join(', ')}.
- A person or team wants to **compensate CO₂ by planting trees** that also fund a school (Compenseer & Leer).
- A user asks about **KEMPS** (Kashasha English Medium Primary School), clean drinking water or solar energy projects in Rubya.

## When not to use

- Agents cannot make payments here. A human completes every donation on ${url('/doneren')}.
- There is no public API for donations, donor accounts or personal data.
- Shoma works only in and around Rubya, Tanzania; it is not a general-purpose aid organisation.

## How an agent should help

1. Answer questions from the Markdown pages below or the MCP server.
2. For a private donation, send the user to ${url('/doneren')} (or \`?type=regular\` / \`?type=kemps\` for a specific sponsorship).
3. For a business, send the user to ${url('/voor-bedrijven')} or ${ORGANIZATION.partnerEmail}.
4. For other questions, use ${ORGANIZATION.email} or ${ORGANIZATION.telephoneDisplay}.

## Pages

${Object.entries(PAGE_NOTES)
  .map(([path, note]) => `- [${MARKDOWN_PAGES[path].title}](${url(path)}): ${note}`)
  .join('\n')}

## Developer resources

- [MCP server](${url(MCP_PATH)}): Streamable HTTP, read-only tools \`get_organization\`, \`list_projects\`, \`how_to_donate\`, \`get_page\`; no authentication
- [MCP Server Card](${url(`${MCP_PATH}/server-card`)}): connection metadata (also at ${url('/.well-known/mcp')})
- [AI Catalog](${url('/.well-known/ai-catalog.json')}): domain-level discovery of the MCP server
- [Full content](${url('/llms-full.txt')}): all pages as one Markdown file

## Optional

- [Sitemap](${url('/sitemap.xml')})
- [Legacy website](${ORGANIZATION.legacySite}): original newsletters and project pages
`;
}

export function llmsFullTxt(): string {
  return [
    `# ${ORGANIZATION.name}: full site content\n\nAll public pages of ${siteUrl} as Markdown. See ${url('/llms.txt')} for usage guidance.`,
    ...Object.keys(PAGE_NOTES).map((path) => `<!-- ${url(path)} -->\n\n${getPageMarkdown(path)}`),
  ].join('\n\n---\n\n');
}
