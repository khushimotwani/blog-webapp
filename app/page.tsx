'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface Post {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  createdAt: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/posts');
        if (!res.ok) throw new Error('Failed to fetch posts');
        const data = await res.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <div className="hero min-h-[60vh] bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold mb-8">Khushi's Blog 🎀</h1>
            <p className="text-xl mb-8">
              Welcome to my corner of the internet where I share my thoughts, experiences, and discoveries.
            </p>
            <Link href="/blog" className="btn btn-primary">
              Read Blog
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Posts Section */}
      <div className="max-w-4xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-8">Recent Posts</h2>
        
        {loading ? (
          <div className="flex justify-center py-8">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8 text-base-content/70">
            No posts yet. Check back soon!
          </div>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <Link 
                key={post._id} 
                href={`/blog/${post.slug}`}
                className="card bg-base-200 hover:bg-base-300 transition-colors"
              >
                <div className="card-body">
                  <h3 className="card-title">{post.title}</h3>
                  <p className="text-base-content/70">{post.excerpt}</p>
                  <div className="text-sm text-base-content/60">
                    {formatDate(post.createdAt)}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/blog" className="btn btn-outline">
            View All Posts
          </Link>
        </div>
      </div>
    </main>
  );
}
