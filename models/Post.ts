import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
  },
  slug: {
    type: String,
    required: [true, 'Please provide a slug'],
    unique: true,
  },
  content: {
    type: String,
    required: [true, 'Please provide content'],
  },
  excerpt: {
    type: String,
    required: [true, 'Please provide an excerpt'],
  },
  tags: [{
    type: String,
  }],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },
  featuredImage: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema); 