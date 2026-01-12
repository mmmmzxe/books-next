# Books Shop Management - Architecture Documentation

## Architecture Overview

This project implements a **Feature-Sliced Modular Architecture with Layered Core** (Hybrid FSD + Layered Architecture), which combines the best practices of Feature-Sliced Design with traditional layered architecture.

## Directory Structure

```
books-shop/
├── core/                   # Infrastructure Layer (Level 0)
│   ├── api/                # API client and HTTP utilities
│   ├── auth/               # Authentication helpers (server-only)
│   ├── config/             # Application configuration
│   └── types/              # Core TypeScript definitions
│
├── domains/                # Business Logic Layer (Level 1)
│   ├── auth/               # Authentication domain
│   │   ├── hooks/          # React Query hooks for auth
│   │   ├── schemas/        # Zod validation schemas
│   │   └── services/       # Auth business services
│   └── books/              # Books domain
│       ├── hooks/          # React Query hooks for books
│       ├── schemas/        # Zod validation schemas
│       └── services/       # Books business services
│
├── shared/                 # Shared UI Layer (Level 2)
│   ├── ui/                 # Reusable UI components
│   │   ├── button/
│   │   ├── card/
│   │   ├── input/
│   │   ├── select/
│   │   ├── textarea/
│   │   ├── spinner/
│   │   ├── error-state/
│   │   └── toast/
│   └── components/         # Composite shared features
│       └── navbar/
│
├── app/                    # Next.js App Router (Level 3)
│   ├── api/                # API Route Handlers
│   │   ├── auth/           # Authentication endpoints
│   │   ├── books/          # Books CRUD endpoints
│   │   └── user/           # User management
│   ├── books/              # Books pages
│   ├── my-books/           # User's books
│   ├── profile/            # User profile
│   └── login/              # Authentication
│
└── middleware.ts           # Next.js middleware for route protection
```

## Dependency Rules

The architecture enforces strict dependency rules to maintain clean separation:

```
Level 3 (app/)     ──→ Level 2 (shared/) ──→ Level 1 (domains/) ──→ Level 0 (core/)
     │                        │                     │
     └────────────────────────┴─────────────────────┴──────→ core/
```

### Rules:
1. **app/** → Can import from domains, shared, core
2. **shared/** → Can import from core (for types, config)
3. **domains/** → Can import from core, shared (UI components only)
4. **core/** → Self-contained, imports nothing

### Barrel Exports
All layers use **index.ts** barrel exports to control what is exposed:
- Prevents direct access to internal implementation
- Creates clean, documented public APIs
- Enforces interface-based design

Example:
```typescript
// ✅ Good
import { useBooks } from '@/domains/books';

// ❌ Bad
import { useBooks } from '@/domains/books/hooks/use-books';
```

## Layer Responsibilities

### 1. Core Layer (Infrastructure)
**Purpose**: Foundational utilities and configuration

- **api/**: HTTP client, request/response handling
- **auth/**: JWT session management (server-only)
- **config/**: Environment variables, constants
- **types/**: Shared TypeScript interfaces

**Key Files**:
- `core/api/client.ts` - Fetch wrapper with error handling
- `core/auth/session.ts` - JWT creation, verification
- `core/config/constants.ts` - App-wide constants
- `core/types/*.ts` - Type definitions

### 2. Domains Layer (Business Logic)
**Purpose**: Domain-specific business rules and data management

Each domain contains:
- **hooks/**: React Query hooks for data fetching/mutations
- **schemas/**: Zod validation schemas
- **services/**: Business logic and API calls

**Example - Books Domain**:
```typescript
// hooks/use-books.ts
export function useBooks(filters?: BookFilters) {
  return useQuery({
    queryKey: BOOK_QUERY_KEYS.list(filters),
    queryFn: () => bookService.getBooks(filters),
  });
}

// services/book.service.ts
export class BookService {
  async getBooks(filters?: BookFilters): Promise<BooksResponse> {
    // Business logic here
  }
}

// schemas/book.schema.ts
export const createBookSchema = z.object({
  title: z.string().min(2),
  // ...
});
```

### 3. Shared Layer (UI Components)
**Purpose**: Reusable, generic UI components

- **ui/**: Atomic components (Button, Input, Card, etc.)
- **components/**: Composite components (Navbar, layouts)

**Design Principles**:
- Components are pure and stateless where possible
- Accept props for customization
- Follow consistent naming and API patterns
- TailwindCSS with branded color palette

### 4. App Layer (Routes & Pages)
**Purpose**: Application routes, pages, and API handlers

- **Pages**: Use client components for interactivity
- **API Routes**: Use server components for data fetching
- **Layouts**: Define page structure

## Key Architectural Patterns

### 1. React Query for State Management
All server state is managed through React Query:
```typescript
// Centralized query keys
export const BOOK_QUERY_KEYS = {
  all: ['books'] as const,
  lists: () => [...BOOK_QUERY_KEYS.all, 'list'] as const,
  list: (filters?: BookFilters) => [...BOOK_QUERY_KEYS.lists(), filters] as const,
};
```

### 2. Form Handling with React Hook Form + Zod
```typescript
const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(createBookSchema),
});
```

### 3. Server-Side Authentication
- JWT tokens stored in HTTP-only cookies
- Middleware validates session on protected routes
- Server actions handle auth state changes

### 4. API Client Pattern
Centralized API client with error handling:
```typescript
export class ApiClient {
  async get<T>(endpoint: string): Promise<T> {
    // Centralized error handling
  }
}
```

## Testing Strategy

### Unit Tests
- **Schemas**: Validate Zod schemas with various inputs
- **Components**: Test rendering, interactions, states
- **Services**: Mock API calls, test business logic

```bash
npm run test
```

### Test Organization
```
__tests__/
├── auth.schema.test.ts
├── book.schema.test.ts
└── button.test.tsx
```

## Color Palette

Custom branded colors defined in `tailwind.config.ts`:

```typescript
colors: {
  brand: {
    black: '#000000',
    darkest: '#111111',
    darker: '#222222',
    brown: '#74642F',
    gray: { ... },
    neutral: { ... },
    white: '#FFFFFF',
  }
}
```

## Development Workflow

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Run Tests**
   ```bash
   npm run test
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

4. **Deploy to Vercel**
   - Push to GitHub
   - Connect to Vercel
   - Auto-deploy on push

## Best Practices

### 1. Component Organization
- One component per file
- Co-locate types with components
- Use barrel exports

### 2. Type Safety
- Use TypeScript strictly
- Define interfaces for all data structures
- Leverage Zod for runtime validation

### 3. Performance
- Use React Query caching
- Implement pagination
- Lazy load images

### 4. Security
- HTTP-only cookies for sessions
- Server-side route protection
- Input validation on client and server

## Future Enhancements

- Database integration (PostgreSQL/MongoDB)
- Image upload with cloud storage
- Advanced filtering and search
- Dark mode support
- Internationalization (i18n)
- Analytics integration
- Advanced caching strategies
- Real-time updates with WebSockets

---

This architecture provides:
- ✅ Clear separation of concerns
- ✅ Scalable structure for growth
- ✅ Maintainable codebase
- ✅ Type-safe development
- ✅ Testable components
- ✅ Production-ready code
