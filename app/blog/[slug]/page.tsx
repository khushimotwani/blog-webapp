'use client';

import { useEffect, useState } from 'react';
import BlogContent from '@/components/BlogContent';
import Link from 'next/link';
import CommentForm from '@/components/CommentForm';
import CommentsList from '@/components/CommentsList';

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${params.slug}`);
        if (!res.ok) {
          throw new Error('Post not found');
        }
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-4 md:p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Error</h1>
          <p className="mb-4">{error}</p>
          <Link href="/blog" className="btn btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/blog" className="btn btn-ghost mb-8">
          ← Back to Blog
        </Link>
        
        {post && <BlogContent post={post} />}

        {/* Comments Section */}
        {post && (
          <div className="mt-12 space-y-8">
            <h2 className="text-2xl font-bold">Comments</h2>
            <CommentsList postId={post._id} />
            <CommentForm 
              postId={post._id}
              onCommentSubmitted={() => {
                // Optionally refresh comments list
                window.location.reload();
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
} 