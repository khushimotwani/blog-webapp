'use client';

import { Suspense, useEffect, useState } from 'react';
import BlogCard from '@/components/BlogCard';
import { useSearchParams, useRouter } from 'next/navigation';

function BlogContent() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const currentPage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/posts?page=${currentPage}&limit=6`);
        const data = await res.json();
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
      setLoading(false);
    };

    fetchPosts();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    router.push(`/blog?page=${page}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {posts.map((post: any) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`btn ${
                currentPage === page ? 'btn-primary' : 'btn-ghost'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default function BlogPage() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
      
      <Suspense fallback={
        <div className="flex justify-center items-center">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      }>
        <BlogContent />
      </Suspense>
    </div>
  );
} 