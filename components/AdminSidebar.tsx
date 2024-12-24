'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
      <li className="mb-2">
        <Link 
          href="/admin"
          className={pathname === '/admin' ? 'active' : ''}
        >
          Dashboard
        </Link>
      </li>
      <li className="mb-2">
        <Link 
          href="/admin/posts"
          className={pathname.startsWith('/admin/posts') ? 'active' : ''}
        >
          Posts
        </Link>
      </li>
      <li className="mb-2">
        <Link 
          href="/admin/comments"
          className={pathname.startsWith('/admin/comments') ? 'active' : ''}
        >
          Comments
        </Link>
      </li>
      <li className="mt-auto">
        <button 
          onClick={() => signOut({ callbackUrl: '/' })}
          className="btn btn-ghost text-error"
        >
          Logout
        </button>
      </li>
    </ul>
  );
} 