'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import CommentsList from '@/components/CommentsList';
import CommentForm from '@/components/CommentForm';

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPost({ params }: BlogPostProps) {
  const { slug } = use(params);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/posts/${slug}`);
        if (!res.ok) throw new Error('Failed to fetch post');
        const data = await res.json();
        setPost(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen p-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="btn btn-ghost mb-8">
            ← Back to Blog
          </Link>
          <div className="text-center py-8">
            <h1 className="text-2xl font-bold mb-4">Post not found</h1>
            <p>The post you're looking for doesn't exist or has been removed.</p>
          </div>
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
        
        <article className="prose prose-lg max-w-none">
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        {post._id && (
          <div className="mt-12 space-y-8">
            <h2 className="text-2xl font-bold">Comments</h2>
            <CommentsList postId={post._id} />
            <CommentForm postId={post._id} />
          </div>
        )}
      </div>
    </div>
  );
} 