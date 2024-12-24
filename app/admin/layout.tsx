import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { headers } from 'next/headers';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isLoginPage = pathname.includes("/admin/login");
  
  // Don't redirect on login page
  if (!session && !isLoginPage) {
    redirect('/admin/login');
  }

  // Don't show admin layout on login page
  if (isLoginPage) {
    return children;
  }

  return (
    <div className="drawer lg:drawer-open">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content p-4">
        {children}
      </div> 
      <div className="drawer-side">
        <label htmlFor="admin-drawer" className="drawer-overlay"></label>
        <AdminSidebar />
      </div>
    </div>
  );
} 