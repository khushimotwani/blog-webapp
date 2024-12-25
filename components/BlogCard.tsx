'use client';

import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface Post {
  _id: string;
  title: string;
  excerpt: string;
  slug: string;
  createdAt: string;
  tags?: string[]; // Make tags optional
}

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link 
      href={`/blog/${post.slug}`}
      className="card bg-base-200 hover:bg-base-300 transition-colors"
    >
      <div className="card-body">
        <h3 className="card-title">{post.title}</h3>
        <p>{post.excerpt}</p>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {post.tags.map((tag) => (
              <span key={tag} className="badge badge-primary">{tag}</span>
            ))}
          </div>
        )}
        <div className="text-sm text-base-content/60 mt-4">
          {formatDate(post.createdAt)}
        </div>
      </div>
    </Link>
  );
} 