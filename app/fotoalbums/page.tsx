import { redirect } from 'next/navigation';

// Foto's staan nu samen met het nieuws op één pagina
export default function FotoalbumsPage() {
  redirect('/nieuws#fotos');
}
