import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';

export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get('limit')) || 5; // Default to 5 posts
    
    const posts = await Post.find({ status: 'published' })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('title excerpt slug createdAt');

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
} 