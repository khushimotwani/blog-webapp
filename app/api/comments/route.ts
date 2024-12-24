import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Comment from '@/models/Comment';

export async function GET(request: Request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    if (!postId) {
      return NextResponse.json(
        { error: 'Post ID is required' },
        { status: 400 }
      );
    }

    const comments = await Comment.find({
      post: postId,
      status: 'approved'
    })
    .sort({ createdAt: -1 })
    .select('name content createdAt');

    return NextResponse.json({ comments });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Basic validation
    if (!body.name || !body.email || !body.content || !body.post) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create comment with pending status
    const comment = await Comment.create({
      ...body,
      status: 'pending'
    });

    return NextResponse.json(
      { message: 'Comment submitted successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
} 