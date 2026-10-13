import { NextRequest, NextResponse } from 'next/server';
import {
  ADMIN_COOKIE,
  ADMIN_SESSION_SECONDS,
  checkAdminCredentials,
  createSessionToken,
  isAdminAuthConfigured,
} from '@/lib/admin-session';
import { rolePermissions, type AdminUser } from '@/lib/admin-auth';

export async function POST(request: NextRequest) {
  if (!isAdminAuthConfigured()) {
    return NextResponse.json(
      { message: 'Inloggen is nog niet ingesteld. Neem contact op met de beheerder.' },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const email = typeof body?.email === 'string' ? body.email : '';
  const password = typeof body?.password === 'string' ? body.password : '';

  if (!(await checkAdminCredentials(email, password))) {
    // Vertraag mislukte pogingen om raden duur te maken
    await new Promise((resolve) => setTimeout(resolve, 750));
    return NextResponse.json({ message: 'E-mailadres of wachtwoord klopt niet.' }, { status: 401 });
  }

  const adminEmail = process.env.ADMIN_EMAIL!.trim().toLowerCase();
  const token = await createSessionToken(adminEmail);
  if (!token) {
    return NextResponse.json({ message: 'Inloggen is nog niet ingesteld.' }, { status: 503 });
  }

  const user: AdminUser = {
    id: 'admin',
    email: adminEmail,
    name: 'Beheerder',
    role: 'super_admin',
    permissions: rolePermissions.super_admin,
    active: true,
    createdAt: new Date(),
  };

  const response = NextResponse.json({ user });
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: ADMIN_SESSION_SECONDS,
  });
  return response;
}
