'use client';

import { useEffect, useState } from 'react';
import { formatDate } from '@/lib/utils';
import CommentForm from './CommentForm';

interface Comment {
  _id: string;
  name: string;
  content: string;
  createdAt: string;
}

interface CommentsListProps {
  postId: string;
}

export default function CommentsList({ postId }: CommentsListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comments?postId=${postId}`);
      const data = await res.json();
      setComments(data.comments);
    } catch (error) {
      console.error('Error fetching comments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleCommentSubmitted = () => {
    fetchComments(); // Refresh comments after new submission
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CommentForm postId={postId} onCommentSubmitted={handleCommentSubmitted} />
      
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-base-content/70">
            No comments yet. Be the first to comment!
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="bg-base-200 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div className="font-semibold">{comment.name}</div>
                <div className="text-sm text-base-content/70">
                  {formatDate(comment.createdAt)}
                </div>
              </div>
              <p className="whitespace-pre-line">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 