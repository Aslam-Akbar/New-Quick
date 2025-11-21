'use server'

import { cookies } from 'next/headers';
import { query } from '../lib/db';

export async function loginAdmin(email, password) {
  try {
    // In a real app, compare hashed passwords
    const users = await query(
      'SELECT * FROM admin_users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (users.length > 0) {
      const user = users[0];
      
      // Set admin session cookie
      const cookieStore = await cookies();
      cookieStore.set('admin_session', JSON.stringify({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role
      }), {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });

      return { success: true };
    }

    return { success: false, error: 'Invalid credentials' };
  } catch (error) {
    console.error('Admin Login Error:', error);
    return { success: false, error: 'Login failed' };
  }
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete('admin_session');
  return { success: true };
}

export async function verifyAdminSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  if (!session) return null;
  
  try {
    return JSON.parse(session.value);
  } catch (e) {
    return null;
  }
}
