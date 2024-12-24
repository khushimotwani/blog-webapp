import Image from 'next/image';
import { formatDate } from '@/lib/utils';

interface BlogContentProps {
  post: {
    title: string;
    content: string;
    featuredImage?: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
  };
}

export default function BlogContent({ post }: BlogContentProps) {
  return (
    <article className="prose prose-lg max-w-none prose-img:rounded-xl">
      {post.featuredImage && (
        <div className="relative w-full h-[400px] mb-8">
          <Image
            src={post.featuredImage}
            alt={post.title}
            fill
            className="object-cover rounded-xl"
            priority
          />
        </div>
      )}
      
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      
      <div className="flex items-center gap-4 text-base-content/70 mb-8">
        <time>Published: {formatDate(post.createdAt)}</time>
        {post.updatedAt !== post.createdAt && (
          <time>(Updated: {formatDate(post.updatedAt)})</time>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {post.tags.map((tag) => (
          <span key={tag} className="badge badge-primary">{tag}</span>
        ))}
      </div>

      <div 
        className="mt-8"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
} 