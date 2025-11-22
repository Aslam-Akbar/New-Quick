'use server'

import { query } from '../lib/db';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(email, password) {
  if (!email || !password) {
    return { success: false, message: 'Email and password are required' };
  }

  try {
    // Query the database for the user
    // WARNING: In a production environment, passwords should be hashed!
    // This example assumes plain text passwords for demonstration as requested.
    const users = await query(
      'SELECT * FROM users WHERE email = ? AND password = ?',
      [email, password]
    );

    if (users.length > 0) {
      const user = users[0];
      // Remove password from the returned user object
      const { password: _, ...userWithoutPassword } = user;
      
      // Set HttpOnly Cookie
      (await cookies()).set('user_email', email, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });

      return { success: true, user: userWithoutPassword };
    } else {
      return { success: false, message: 'Invalid email or password' };
    }
  } catch (error) {
    console.error('Login Action Error:', error);
    return { success: false, message: `Login failed: ${error.message}` };
  }
}

export async function logout() {
  (await cookies()).delete('user_email');
  redirect('/login');
}
