import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';

export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get('limit')) || 10;
    const status = searchParams.get('status');
    
    // Build query based on status
    const query = status && status !== 'all' ? { status } : {};

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('title status createdAt');

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const body = await request.json();

    // Create new post
    const post = await Post.create(body);

    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create post' },
      { status: 500 }
    );
  }
} 