'use client';

import { useEffect, useState } from 'react';
import AuthCheck from '@/components/AuthCheck';
import { formatDate } from '@/lib/utils';

interface Comment {
  _id: string;
  content: string;
  name: string;
  email: string;
  postTitle: string;
  createdAt: string;
}

export default function CommentsPage() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await fetch('/api/admin/comments');
      const data = await res.json();
      setComments(data.comments || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const res = await fetch(`/api/admin/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete comment');
      
      // Refresh comments list
      fetchComments();
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <>
      <AuthCheck />
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Comments</h1>

        {loading ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-8 text-base-content/70">
            No comments found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Comment</th>
                  <th>Post</th>
                  <th>Author</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {comments.map((comment) => (
                  <tr key={comment._id}>
                    <td>{comment.content}</td>
                    <td>{comment.postTitle}</td>
                    <td>
                      <div>{comment.name}</div>
                      <div className="text-sm text-base-content/70">{comment.email}</div>
                    </td>
                    <td>{formatDate(comment.createdAt)}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(comment._id)}
                        className="btn btn-ghost btn-sm text-error"
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
      </div>
    </>
  );
} 