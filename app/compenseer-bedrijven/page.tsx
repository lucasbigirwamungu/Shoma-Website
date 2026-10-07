import { redirect } from 'next/navigation';

// Alle zakelijke informatie staat nu samen op de pagina Voor Bedrijven
export default function CompenseerBedrijvenPage() {
  redirect('/voor-bedrijven#compenseer-en-leer');
}
