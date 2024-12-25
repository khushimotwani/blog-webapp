'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import RichTextEditor from '@/components/RichTextEditor';
import AuthCheck from '@/components/AuthCheck';

interface PostData {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  tags: string[];
  status: 'draft' | 'published';
  featuredImage?: string;
}

export default function PostEditor({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const isNewPost = id === 'new';
  const [loading, setLoading] = useState(!isNewPost);
  const [saving, setSaving] = useState(false);
  const [post, setPost] = useState<PostData>({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    tags: [],
    status: 'draft',
  });

  useEffect(() => {
    if (!isNewPost) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/admin/posts/${id}`);
      const data = await res.json();
      setPost(data);
    } catch (error) {
      console.error('Error fetching post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = isNewPost 
        ? '/api/admin/posts' 
        : `/api/admin/posts/${id}`;
      
      const method = isNewPost ? 'POST' : 'PUT';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });

      if (!res.ok) throw new Error('Failed to save post');

      router.push('/admin/posts');
    } catch (error) {
      console.error('Error saving post:', error);
      alert('Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          {isNewPost ? 'Create New Post' : 'Edit Post'}
        </h1>
        <div className="space-x-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn btn-ghost"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              'Save'
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Content</span>
            </label>
            <RichTextEditor
              content={post.content}
              onChange={(content) => setPost({ ...post, content })}
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Slug</span>
            </label>
            <input
              type="text"
              value={post.slug}
              onChange={(e) => setPost({ ...post, slug: e.target.value })}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Excerpt</span>
            </label>
            <textarea
              value={post.excerpt}
              onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
              className="textarea textarea-bordered"
              rows={3}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Tags</span>
            </label>
            <input
              type="text"
              value={post.tags.join(', ')}
              onChange={(e) => setPost({ 
                ...post, 
                tags: e.target.value.split(',').map(tag => tag.trim()) 
              })}
              className="input input-bordered"
              placeholder="Separate tags with commas"
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Status</span>
            </label>
            <select
              value={post.status}
              onChange={(e) => setPost({ 
                ...post, 
                status: e.target.value as 'draft' | 'published' 
              })}
              className="select select-bordered"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
      </div>
    </form>
  );
} 