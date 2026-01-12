# Books Shop Management

A modern, full-stack Books Shop Management application built with Next.js 16, TypeScript, and TailwindCSS, following Feature-Sliced Design architecture principles.

## 🚀 Features

### Authentication

- ✅ Server-side authentication using cookies and JWT
- ✅ Protected routes with middleware
- ✅ Login page with form validation
- ✅ User profile management (view & edit)
- ✅ Secure logout functionality

### Books Management

- ✅ Browse all books in a responsive grid layout
- ✅ Create, read, update, and delete books
- ✅ Search books by title
- ✅ Filter books by category
- ✅ Sort books by title (A-Z, Z-A) and price
- ✅ Pagination support
- ✅ User-specific books view (My Books)
- ✅ Permission-based actions (only authors can edit/delete their books)

### User Interface

- ✅ Fully responsive design (mobile-first)
- ✅ Custom TailwindCSS components
- ✅ Toast notifications for user feedback
- ✅ Loading and error states
- ✅ Profile dropdown menu in navbar
- ✅ Image thumbnails for books

### Technical Features

- ✅ TypeScript for type safety
- ✅ React Query for server state management
- ✅ React Hook Form with Zod validation
- ✅ Vitest + React Testing Library for unit tests
- ✅ ESLint configuration
- ✅ Feature-Sliced Design (FSD) architecture

## 📁 Project Architecture

This project follows **Feature-Sliced Modular Architecture with Layered Core**:

\`\`\`
books-shop/
├── core/ # Infrastructure layer
│ ├── api/ # API client
│ ├── auth/ # Authentication utilities
│ ├── config/ # Configuration & constants
│ └── types/ # Core TypeScript types
│
├── domains/ # Business logic layer
│ ├── auth/ # Authentication domain
│ └── books/ # Books domain
│
├── shared/ # Shared UI layer
│ ├── ui/ # Reusable UI components
│ └── components/ # Shared features (Navbar)
│
├── app/ # Next.js App Router
│ ├── api/ # API route handlers
│ ├── books/ # Books pages
│ ├── my-books/ # My Books page
│ ├── profile/ # Profile pages
│ └── login/ # Login page
│
└── middleware.ts # Auth middleware
\`\`\`

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **State Management:** React Query
- **Forms:** React Hook Form + Zod
- **Testing:** Vitest + React Testing Library
- **Authentication:** JWT with HTTP-only cookies

## 📦 Installation

\`\`\`bash

# Install dependencies

npm install

# Run development server

npm run dev

# Open http://localhost:3000

\`\`\`

## 🔑 Demo Credentials

\`\`\`
Email: admin@books.com
Password: admin123
\`\`\`

## 📜 Available Scripts

\`\`\`bash
npm run dev # Start development server
npm run build # Build for production
npm run start # Start production server
npm run lint # Run ESLint
npm run test # Run tests
\`\`\`

## 🚀 Deployment

Deploy to Vercel with one click:

1. Push to GitHub
2. Import in Vercel
3. Deploy

## 📄 License

MIT
