import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8">
      {/* Hero Section */}
      <div className="hero bg-base-200 rounded-lg mb-8">
        <div className="hero-content text-center py-12">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">Khushi's Blog 🎀</h1>
            <p className="py-6">Welcome to my corner of the internet where I share my thoughts, experiences, and discoveries.</p>
            <Link href="/blog" className="btn btn-primary">Read Blog</Link>
          </div>
        </div>
      </div>

      {/* Featured Posts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* We'll populate this with actual posts later */}
        <div className="card bg-base-100 shadow-xl">
          <figure><div className="h-48 w-full bg-base-300"></div></figure>
          <div className="card-body">
            <h2 className="card-title">Coming Soon!</h2>
            <p>Stay tuned for amazing blog posts...</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Read More</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
