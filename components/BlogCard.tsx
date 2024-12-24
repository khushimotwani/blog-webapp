import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@/lib/utils';

interface BlogCardProps {
  post: {
    title: string;
    excerpt: string;
    slug: string;
    featuredImage?: string;
    tags: string[];
    createdAt: string;
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="card bg-base-100 shadow-xl">
      {post.featuredImage && (
        <figure className="relative h-48">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </figure>
      )}
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p className="text-sm text-base-content/70">{formatDate(post.createdAt)}</p>
        <p>{post.excerpt}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {post.tags.map((tag) => (
            <span key={tag} className="badge badge-primary">{tag}</span>
          ))}
        </div>
        <div className="card-actions justify-end mt-4">
          <Link href={`/blog/${post.slug}`} className="btn btn-primary">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
} 