# A&D Studios Hosting Platform

A professional web hosting platform built with React, Vite, and Supabase, offering ad hosting, web development, and cloud services.

## Features

- Modern, responsive UI built with React and Tailwind CSS
- User authentication and account management via Supabase
- Web hosting services dashboard
- Ad hosting management platform
- Development services showcase
- Cloud services integration

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or pnpm

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ad-hosting.git
cd ad-hosting
```

2. Install dependencies
```bash
pnpm install
```

3. Create a .env file based on .env.example
```bash
cp .env.example .env
```

4. Start the development server
```bash
pnpm dev
```

## Build

```bash
pnpm build
```

## Technology Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- Supabase
- React Router DOM
- Framer Motion
- Tanstack Query

## Supabase Setup

This project connects directly to a remote Supabase instance. To verify your connection, follow these steps:

1. Ensure your environment variables are set correctly in `.env`:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

2. Run the Supabase verification script:

```
node verify-supabase.js
```

### Storage Buckets

The project requires two storage buckets:
- `profiles`: For user profile images (public access)
- `admin_uploads`: For admin-only files (restricted access)

These buckets may exist but not be visible to the verification script due to Row Level Security (RLS) policies. To check and fix bucket issues:

1. Use the Supabase SQL Editor to run the bucket check script:
   ```
   node check-buckets.sql
   ```

2. If buckets are missing or need configuration updates, run:
   ```
   node fix-buckets-final.sql
   ```

3. If you're experiencing permission issues, follow the instructions in `configure-service-role.md` to set up your service role key properly.

4. You can also manage storage buckets through the Supabase Dashboard at:
   https://app.supabase.com/project/kgdthezjfdnoedvwryus/storage/buckets

5. View Supabase status in the admin panel at `/admin/supabase`

### Updating Database Schema Types

To update TypeScript types for your Supabase database schema:

```
npm run supabase:types
```

## License

MIT