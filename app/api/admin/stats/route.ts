import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import connectDB from '@/lib/mongodb';
import Post from '@/models/Post';

export async function GET() {
  try {
    const session = await getServerSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Get counts for different post statuses
    const [totalPosts, publishedPosts, draftPosts] = await Promise.all([
      Post.countDocuments({}),
      Post.countDocuments({ status: 'published' }),
      Post.countDocuments({ status: 'draft' })
    ]);

    return NextResponse.json({
      totalPosts,
      publishedPosts,
      draftPosts
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats' },
      { status: 500 }
    );
  }
} 