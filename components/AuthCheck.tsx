'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function AuthCheck() {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/admin/login');
    },
  });

  return null;
} 