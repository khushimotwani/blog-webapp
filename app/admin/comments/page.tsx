'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Comment {
  _id: string;
  post: {
    _id: string;
    title: string;
  };
  name: string;
  email: string;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export default function CommentsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);

  const currentPage = Number(searchParams.get('page')) || 1;
  const status = searchParams.get('status') || 'all';

  useEffect(() => {
    fetchComments();
  }, [currentPage, status]);

  const fetchComments = async () => {
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        status,
      });

      const res = await fetch(`/api/admin/comments?${params}`);
      const data = await res.json();
      
      setComments(data.comments);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (commentId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/comments/${commentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update comment');
      
      fetchComments();
    } catch (error) {
      console.error('Error updating comment:', error);
      alert('Failed to update comment');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const res = await fetch(`/api/admin/comments/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete comment');
      
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
      alert('Failed to delete comment');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Comments</h1>
      </div>

      {/* Filters */}
      <div className="flex gap-4 bg-base-200 p-4 rounded-lg">
        <select
          className="select select-bordered"
          value={status}
          onChange={(e) => router.push(`/admin/comments?status=${e.target.value}`)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Comments Table */}
      {loading ? (
        <div className="flex justify-center py-8">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="overflow-x-auto bg-base-100 rounded-lg">
          <table className="table">
            <thead>
              <tr>
                <th>Comment</th>
                <th>Post</th>
                <th>Author</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr key={comment._id}>
                  <td className="max-w-md">
                    <p className="truncate">{comment.content}</p>
                  </td>
                  <td>
                    <Link 
                      href={`/blog/${comment.post._id}`}
                      className="link link-hover"
                    >
                      {comment.post.title}
                    </Link>
                  </td>
                  <td>
                    <div>
                      <p>{comment.name}</p>
                      <p className="text-sm opacity-70">{comment.email}</p>
                    </div>
                  </td>
                  <td>
                    <select
                      className="select select-bordered select-sm"
                      value={comment.status}
                      onChange={(e) => handleStatusChange(comment._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td>{new Date(comment.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(comment._id)}
                      className="btn btn-sm btn-ghost text-error"
                    >
                      Delete
                    </button>
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
              onClick={() => router.push(`/admin/comments?page=${page}&status=${status}`)}
              className={`btn ${currentPage === page ? 'btn-primary' : 'btn-ghost'}`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 