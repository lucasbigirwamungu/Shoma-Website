import { createMollieClient } from '@mollie/api-client';

// Singleton Mollie client – hergebruikt over alle API routes
let mollieInstance: ReturnType<typeof createMollieClient> | null = null;

export function getMollieClient(): ReturnType<typeof createMollieClient> {
  if (!mollieInstance) {
    const apiKey = process.env.MOLLIE_API_KEY;
    if (!apiKey) {
      throw new Error('MOLLIE_API_KEY is niet geconfigureerd in de omgevingsvariabelen');
    }
    mollieInstance = createMollieClient({ apiKey });
  }
  return mollieInstance;
}
