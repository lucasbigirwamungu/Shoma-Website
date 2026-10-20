import { describe, expect, it } from 'vitest';
import { homeJsonLd, pageJsonLd, serializeJsonLd } from '@/lib/structured-data';

describe('JSON-LD', () => {
  it('describes the organisation with contactPoint and address', () => {
    const [org, site] = homeJsonLd()['@graph'] as Record<string, any>[];
    expect(org['@type']).toBe('NGO');
    expect(org.name).toBe('Stichting Shoma');
    expect(org.address).toMatchObject({ '@type': 'PostalAddress', postalCode: '7559 HC', addressCountry: 'NL' });
    expect(org.contactPoint[0]).toMatchObject({ '@type': 'ContactPoint', contactType: 'customer support', email: 'info@shoma.nl' });
    expect(org.contactPoint[0].telephone).toMatch(/^\+31/);
    expect(org.taxID).toBe('814390249');
    expect(site['@type']).toBe('WebSite');
  });

  it('links about and contact pages to the organisation', () => {
    const graph = pageJsonLd('AboutPage', '/over-ons', 'Over ons')['@graph'] as Record<string, any>[];
    expect(graph[1]['@type']).toBe('AboutPage');
    expect(graph[1].about['@id']).toBe(graph[0]['@id']);
  });

  it('escapes < so the data cannot close the script tag', () => {
    expect(serializeJsonLd({ x: '</script>' })).not.toContain('</script>');
    expect(JSON.parse(serializeJsonLd({ x: '</script>' })).x).toBe('</script>');
  });
});
