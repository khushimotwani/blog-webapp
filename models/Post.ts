import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this post.'],
    maxlength: [60, 'Title cannot be more than 60 characters'],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: [true, 'Please provide the content for this post.'],
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide a short excerpt for this post.'],
    maxlength: [200, 'Excerpt cannot be more than 200 characters'],
  },
  featuredImage: {
    type: String,
    required: false,
  },
  tags: [{
    type: String,
  }],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema); 