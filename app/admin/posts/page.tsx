'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';

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
  const search = searchParams.get('search') || '';
  const tag = searchParams.get('tag') || '';

  useEffect(() => {
    fetchPosts();
  }, [currentPage, status, search, tag]);

  const fetchPosts = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        status,
        search,
        tag,
      });

      const res = await fetch(`/api/admin/posts?${params}`);
      const data = await res.json();
      
      setPosts(data.posts);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const res = await fetch(`/api/admin/posts/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete post');
      
      fetchPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete post');
    }
  };

  const updateQueryParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    router.push(`/admin/posts?${params.toString()}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Posts</h1>
        <Link href="/admin/posts/new" className="btn btn-primary">
          Create New Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 bg-base-200 p-4 rounded-lg">
        <input
          type="text"
          placeholder="Search posts..."
          className="input input-bordered w-full md:w-64"
          value={search}
          onChange={(e) => updateQueryParams({ search: e.target.value, page: '1' })}
        />
        
        <select
          className="select select-bordered"
          value={status}
          onChange={(e) => updateQueryParams({ status: e.target.value, page: '1' })}
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        <input
          type="text"
          placeholder="Filter by tag..."
          className="input input-bordered w-full md:w-48"
          value={tag}
          onChange={(e) => updateQueryParams({ tag: e.target.value, page: '1' })}
        />
      </div>

      {/* Posts Table */}
      {loading ? (
        <div className="flex justify-center py-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-lg">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Tags</th>
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
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {post.tags.map((tag) => (
                        <span key={tag} className="badge badge-primary badge-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/posts/${post._id}`}
                        className="btn btn-sm btn-ghost"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="btn btn-sm btn-ghost text-error"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => updateQueryParams({ page: page.toString() })}
              className={`btn ${
                currentPage === page ? 'btn-primary' : 'btn-ghost'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 