'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import AuthCheck from '@/components/AuthCheck';

interface Post {
  _id: string;
  title: string;
  status: 'draft' | 'published';
  createdAt: string;
  tags: string[];
}

export default function PostsList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  
  const currentPage = Number(searchParams.get('page')) || 1;
  const status = searchParams.get('status') || 'all';

  useEffect(() => {
    fetchPosts();
  }, [currentPage, status]);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/admin/posts?page=${currentPage}&status=${status}`);
      const data = await res.json();
      setPosts(data.posts || []); // Ensure posts is always an array
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <AuthCheck />
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Posts</h1>
          <Link href="/admin/posts/new" className="btn btn-primary">
            New Post
          </Link>
        </div>

        {posts.length === 0 ? (
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
                {posts.map((post) => (
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
  );
} 