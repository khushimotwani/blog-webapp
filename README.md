# Khushi's Blog 🎀

A beautiful and feature-rich blog platform built with Next.js, DaisyUI, and MongoDB.

## Features

- 📱 Responsive design using DaisyUI with coffee theme
- 🔐 Admin panel for content management
- 📝 Create, edit, and delete blog posts
- 💬 Comment system
- 🏷️ Tag support
- 🔍 Search functionality
- 📱 Mobile-friendly interface

## Tech Stack

- **Frontend:**
  - Next.js 14 (App Router)
  - TailwindCSS
  - DaisyUI
  - TypeScript

- **Backend:**
  - MongoDB
  - NextAuth.js (for admin authentication)
  - API Routes

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yourusername/khushis-blog.git
cd khushis-blog
```

2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file with the following variables:
```env
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── admin/        # Admin panel pages
│   ├── api/         # API routes
│   ├── blog/        # Blog related pages
│   ├── components/  # Reusable components
│   └── lib/        # Utility functions and configs
├── public/         # Static assets
└── types/         # TypeScript type definitions
```

## Features in Detail

### Blog Posts
- Rich text editor for creating posts
- Image upload support
- Draft/publish functionality
- Categories and tags

### Admin Panel
- Secure authentication
- Dashboard with analytics
- Content management
- User comments moderation

### User Features
- Responsive design
- Dark/light mode
- Comment system
- Search functionality
- Category filtering

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

