# Booksaw | Premium Books Shop Management

A modern, high-performance Books Shop Management application built with Next.js 16, TypeScript, and TailwindCSS. Designed with a premium aesthetic and following Feature-Sliced Design (FSD) architecture principles.

## 🚀 Features

### Authentication & Security

- ✅ Server-side authentication using HTTP-only cookies and JWT
- ✅ Modern `proxy.ts` middleware for secure routing
- ✅ Premium login experience with real-time validation
- ✅ Secure user profile management

### Books Management

- ✅ **Expansive Shop**: Browse books in grid or list views
- ✅ **Author Controls**: Create, update, and manage your own literary works
- ✅ **Smart Filtering**: Filter by genre, rating, and price range
- ✅ **Dynamic Search**: Real-time book search across the entire collection
- ✅ **My Books**: Dedicated dashboard for authors

### Technical Excellence

- ✅ **SEO Optimized**: Server-side metadata for all main routes
- ✅ **Remote Assets**: Fully integrated with high-quality remote image hosting
- ✅ **CI/CD Built-in**: GitHub Actions for Vercel deployment notifications and linting
- ✅ **Type Safety**: End-to-end TypeScript implementation
- ✅ **FSD Architecture**: Scalable and maintainable project structure

## 📁 Project Architecture

This project follows **Feature-Sliced Modular Architecture**:

```
books-shop/
├── app/          # Next.js App Router (Pages & API)
├── core/         # Infrastructure & Global Config
├── domains/      # Business Logic & Schemas
├── shared/       # Reusable UI & Business-agnostic Hooks
├── proxy.ts      # Modern Edge Middleware
└── .github/      # CI/CD Workflows
```

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Vanilla CSS + TailwindCSS 4
- **State:** React Query (TanStack Query)
- **Validation:** Zod + React Hook Form
- **Testing:** Vitest + React Testing Library
- **Architecture:** Feature-Sliced Design (FSD)

## 📦 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔑 Demo Credentials

```
Email: admin@books.com
Password: admin123
```

## 📜 Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Production build
- `npm run lint`: Code quality check
- `npm run test`: Run unit tests

---

Developed with focus on performance, SEO, and premium user experience.
