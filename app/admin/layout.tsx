import AdminSidebar from '@/components/AdminSidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col">
        {/* Navbar for mobile */}
        <div className="w-full navbar bg-base-300 lg:hidden">
          <div className="flex-none">
            <label htmlFor="admin-drawer" className="btn btn-square btn-ghost">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <div className="flex-1">
            <span className="text-xl font-bold">Admin Dashboard</span>
          </div>
        </div>

        {/* Main content */}
        <div className="p-4 md:p-8">
          {children}
        </div>
      </div>

      <div className="drawer-side">
        <label htmlFor="admin-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <AdminSidebar />
      </div>
    </div>
  );
} 