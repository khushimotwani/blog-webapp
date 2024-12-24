import { headers } from 'next/headers';
import AdminSidebar from '@/components/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Only check if we're on login page
  const currentPath = (await headers()).get("x-invoke-path") || "";
  if (currentPath.includes("/admin/login")) {
    return children;
  }

  // Admin layout for all other pages
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