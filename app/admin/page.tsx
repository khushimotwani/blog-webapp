'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import AuthCheck from '@/components/AuthCheck';

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
}

interface Post {
  _id: string;
  title: string;
  status: 'draft' | 'published';
  createdAt: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0
  });
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, postsRes] = await Promise.all([
          fetch('/api/admin/stats'),
          fetch('/api/admin/posts?limit=5')
        ]);
        
        const statsData = await statsRes.json();
        const postsData = await postsRes.json();
        
        setStats(statsData);
        setRecentPosts(postsData.posts || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setRecentPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <>
      <AuthCheck />
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        {loading ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="stat bg-base-100 rounded-box">
                <div className="stat-title">Total Posts</div>
                <div className="stat-value">{stats?.totalPosts || 0}</div>
              </div>
              <div className="stat bg-base-100 rounded-box">
                <div className="stat-title">Published</div>
                <div className="stat-value">{stats?.publishedPosts || 0}</div>
              </div>
              <div className="stat bg-base-100 rounded-box">
                <div className="stat-title">Drafts</div>
                <div className="stat-value">{stats?.draftPosts || 0}</div>
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-base-100 rounded-box p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Recent Posts</h2>
                <Link href="/admin/posts" className="btn btn-primary">
                  View All
                </Link>
              </div>

              {recentPosts.length === 0 ? (
                <div className="text-center py-8 text-base-content/70">
                  No posts found.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentPosts.map((post) => (
                        <tr key={post._id}>
                          <td>{post.title}</td>
                          <td>
                            <span className={`badge ${
                              post.status === 'published' ? 'badge-success' : 'badge-ghost'
                            }`}>
                              {post.status}
                            </span>
                          </td>
                          <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                          <td>
                            <Link 
                              href={`/admin/posts/${post._id}`}
                              className="btn btn-sm btn-ghost"
                            >
                              Edit
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
} 