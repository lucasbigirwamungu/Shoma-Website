/**
 * Admin Authentication & Authorization
 * RBAC: Role-Based Access Control
 */

import type { NextRequest } from 'next/server';
import { ADMIN_COOKIE, verifySessionToken } from '@/lib/admin-session';

export type AdminRole = 'super_admin' | 'admin' | 'editor';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
  permissions: string[];
  active: boolean;
  lastLogin?: Date;
  createdAt: Date;
}

/**
 * Permission matrix for roles
 */
export const rolePermissions: Record<AdminRole, string[]> = {
  super_admin: [
    // Dashboard
    'view:dashboard',
    'view:stats',
    'export:data',

    // Users & Auth
    'manage:admins',
    'manage:roles',
    'view:logs',

    // Content
    'create:content',
    'edit:content',
    'delete:content',
    'publish:content',

    // Images
    'upload:images',
    'delete:images',
    'manage:images',

    // Donations & Payments
    'view:donations',
    'view:payments',
    'refund:payments',
    'export:payments',

    // Trees & Projects
    'create:projects',
    'edit:projects',
    'delete:projects',
    'update:tree-status',

    // Settings
    'manage:settings',
    'configure:email',
    'configure:payments',
  ],

  admin: [
    // Dashboard
    'view:dashboard',
    'view:stats',

    // Content
    'create:content',
    'edit:content',
    'publish:content',

    // Images
    'upload:images',
    'delete:images',

    // Donations & Payments
    'view:donations',
    'view:payments',
    'export:payments',

    // Trees & Projects
    'create:projects',
    'edit:projects',
    'update:tree-status',

    // Settings (read-only)
    'view:settings',
  ],

  editor: [
    // Dashboard
    'view:dashboard',

    // Content (no publish)
    'create:content',
    'edit:content',

    // Images
    'upload:images',

    // Donations & Payments (view only)
    'view:donations',
    'view:payments',

    // Projects (view only)
    'view:projects',
  ],
};

/**
 * Check if user has permission
 */
export function hasPermission(user: AdminUser | null, permission: string): boolean {
  if (!user || !user.active) return false;

  const permissions = rolePermissions[user.role] || [];
  return permissions.includes(permission);
}

/**
 * Check if user has any of the permissions
 */
export function hasAnyPermission(user: AdminUser | null, permissions: string[]): boolean {
  if (!user || !user.active) return false;

  const userPermissions = rolePermissions[user.role] || [];
  return permissions.some((p) => userPermissions.includes(p));
}

/**
 * Check if user has all permissions
 */
export function hasAllPermissions(user: AdminUser | null, permissions: string[]): boolean {
  if (!user || !user.active) return false;

  const userPermissions = rolePermissions[user.role] || [];
  return permissions.every((p) => userPermissions.includes(p));
}

/**
 * De ingelogde beheerder op basis van de sessie-cookie, of null
 */
export async function getAdminFromRequest(request: NextRequest): Promise<AdminUser | null> {
  const session = await verifySessionToken(request.cookies.get(ADMIN_COOKIE)?.value);
  if (!session) return null;

  return {
    id: 'admin',
    email: session.email,
    name: 'Beheerder',
    role: 'super_admin',
    permissions: rolePermissions.super_admin,
    active: true,
    createdAt: new Date(),
  };
}

/**
 * Protect API routes
 */
export async function requireAdminAuth(
  request: NextRequest,
  requiredPermission: string
): Promise<{ authorized: boolean; user?: AdminUser; error?: string }> {
  const user = await getAdminFromRequest(request);
  if (!user) {
    return { authorized: false, error: 'Niet ingelogd' };
  }

  if (!hasPermission(user, requiredPermission)) {
    return { authorized: false, error: 'Onvoldoende rechten' };
  }

  return { authorized: true, user };
}

/**
 * Alleen eenvoudige map- en bestandsnamen, zodat een pad nooit buiten public/images kan komen
 */
export function isSafeImageFolder(folder: unknown): folder is string {
  return typeof folder === 'string' && /^[a-z0-9][a-z0-9_-]*(\/[a-z0-9][a-z0-9_-]*)?$/i.test(folder);
}

export function isSafeImageFilename(filename: unknown): filename is string {
  return (
    typeof filename === 'string' &&
    filename.length <= 200 &&
    /^[a-z0-9][a-z0-9 ._-]*\.(jpe?g|png|webp|gif|avif)$/i.test(filename) &&
    !filename.includes('..')
  );
}

/**
 * Generate admin invite link
 */
export function generateAdminInviteToken(email: string, role: AdminRole): string {
  // TODO: Generate secure token with expiry
  const data = Buffer.from(JSON.stringify({ email, role, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 })).toString(
    'base64'
  );
  return data;
}

/**
 * Verify admin invite token
 */
export function verifyAdminInviteToken(token: string): { email: string; role: AdminRole } | null {
  try {
    const data = JSON.parse(Buffer.from(token, 'base64').toString());
    if (data.exp < Date.now()) return null;
    return { email: data.email, role: data.role };
  } catch {
    return null;
  }
}
