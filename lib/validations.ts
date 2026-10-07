import { z } from 'zod';

// ─── Generieke e-maildomeinen die worden afgewezen bij B2B intake ─────────────
const BLOCKED_DOMAINS = [
  'gmail.com', 'hotmail.com', 'outlook.com', 'yahoo.com',
  'live.nl', 'hotmail.nl', 'icloud.com', 'me.com',
  'msn.com', 'live.com', 'yahoo.nl',
];

const isCorporateEmail = (email: string): boolean => {
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;
  return !BLOCKED_DOMAINS.includes(domain);
};

// ─── Donatie checkout validatie ───────────────────────────────────────────────
export const checkoutSchema = z.object({
  amount: z
    .number({ invalid_type_error: 'Bedrag moet een getal zijn' })
    .min(5, 'Minimale donatie is €5,-')
    .max(10000, 'Maximale donatie via dit formulier is €10.000,-'),
  frequency: z.enum(['once', 'monthly'], {
    errorMap: () => ({ message: 'Frequentie moet "once" of "monthly" zijn' }),
  }),
  donorName: z
    .string()
    .min(2, 'Naam moet minimaal 2 tekens bevatten')
    .max(150, 'Naam mag maximaal 150 tekens bevatten'),
  donorEmail: z
    .string()
    .email('Voer een geldig e-mailadres in'),
  newsletterOptIn: z.boolean().default(false),
  selectedProjectId: z.string().uuid().optional(),
});

export type CheckoutInput = z.infer<typeof checkoutSchema>;

// ─── B2B intakeformulier validatie ────────────────────────────────────────────
export const b2bLeadSchema = z.object({
  companyName: z
    .string()
    .min(2, 'Bedrijfsnaam is verplicht')
    .max(255),
  contactName: z
    .string()
    .min(2, 'Naam contactpersoon is verplicht')
    .max(255),
  corporateEmail: z
    .string()
    .email('Voer een geldig zakelijk e-mailadres in')
    .refine(isCorporateEmail, {
      message: 'Voer een zakelijk e-mailadres in (geen Gmail, Hotmail, etc.)',
    }),
  phoneNumber: z
    .string()
    .max(50)
    .optional()
    .or(z.literal('')),
  mvoInterestArea: z.enum(['education', 'water', 'energy', 'general'], {
    errorMap: () => ({ message: 'Selecteer een interessegebied' }),
  }),
  projectPreference: z.string().max(100).optional(),
  message: z
    .string()
    .max(2000, 'Bericht mag maximaal 2000 tekens bevatten')
    .optional(),
});

export type B2BLeadInput = z.infer<typeof b2bLeadSchema>;

// ─── Algemeen contactformulier validatie ──────────────────────────────────────
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Uw naam is verplicht').max(400),
  email: z.string().trim().email('Voer een geldig e-mailadres in').max(400),
  subject: z.string().trim().max(400).optional().or(z.literal('')),
  message: z.string().trim().min(10, 'Uw bericht is te kort (minimaal 10 tekens)').max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;
