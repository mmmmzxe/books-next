# Component Architecture Documentation

## Overview
The home page has been refactored into modular, reusable components following best practices.

## Environment Variables
- `.env.local` - Local development environment variables
- `.env.example` - Example environment variables template

### Available Variables:
- `NEXT_PUBLIC_API_URL` - API base URL (default: http://localhost:3000)
- `NEXT_PUBLIC_APP_NAME` - Application name (BOOKSAW)
- `NEXT_PUBLIC_APP_VERSION` - Application version

## Component Structure

### Core Components (app/components/)

#### 1. **BookCard** (`book-card.tsx`)
Reusable card component for displaying books with:
- Book thumbnail with hover effects
- Add to cart button (on hover)
- Favorite toggle button
- Book title, author, and price
- Optional discount badge
- Optional old price (strikethrough)

**Props:**
- `book` - Book data object
- `isFavorite` - Boolean for favorite state
- `onAddToCart` - Cart handler function
- `onToggleFavorite` - Favorite toggle handler
- `showAddToCart` - Show/hide cart button (default: true)
- `showDiscount` - Show/hide discount badge (default: false)
- `discount` - Discount text (e.g., "10% OFF")

---

#### 2. **HeroSection** (`hero-section.tsx`)
Hero banner with:
- Welcome text and tagline
- Main title and description
- Featured book image
- Call-to-action button
- Pagination dots for slider

---

#### 3. **CategoriesSection** (`categories-section.tsx`)
Horizontal category navigation with:
- Icon representation
- Category name
- 5 main categories (Higher Education, Management, Engineering, Academic, Children)

---

#### 4. **FeaturedBooksSection** (`featured-books-section.tsx`)
Featured books showcase with:
- Section header
- 4-column grid of BookCard components
- "View All Products" link

**Props:**
- `books` - Array of featured books
- `isFavorite` - Check favorite status
- `onAddToCart` - Cart handler
- `onToggleFavorite` - Favorite toggle handler

---

#### 5. **BestSellingBookSection** (`best-selling-book-section.tsx`)
Large featured book display with:
- Large book cover image
- Author name in uppercase
- Book title and description
- Price with star rating
- "Shop It Now" button

**Props:**
- `book` - Best selling book object

---

#### 6. **PopularBooksSection** (`popular-books-section.tsx`)
Popular books with category tabs:
- Section header
- Category filter tabs (All Genre, Business, Technology, etc.)
- 4-column grid of book cards
- Optional author name display

**Props:**
- `books` - Array of popular books

---

#### 7. **QuoteSection** (`quote-section.tsx`)
Inspirational quote display with:
- "Quote Of The Day" title
- Quote text
- Author attribution

---

#### 8. **BooksWithOfferSection** (`books-with-offer-section.tsx`)
Discounted books showcase with:
- Discount badge overlay
- 4-column grid using BookCard
- Old price (strikethrough) and new price
- "View All Products" link

**Props:**
- `books` - Array of books with discount info
- `isFavorite` - Check favorite status
- `onAddToCart` - Cart handler
- `onToggleFavorite` - Favorite toggle handler

---

#### 9. **NewsletterSection** (`newsletter-section.tsx`)
Email subscription form with:
- Section title and description
- Email input field
- Submit button

**Props:**
- `email` - Current email value
- `onEmailChange` - Input change handler
- `onSubmit` - Form submit handler

---

#### 10. **LatestArticlesSection** (`latest-articles-section.tsx`)
Blog articles showcase with:
- Section header
- 3-column grid of article cards
- Article thumbnail, title, date
- Social action buttons
- "Read All Articles" link

**Props:**
- `articles` - Array of article objects

---

#### 11. **DownloadAppSection** (`download-app-section.tsx`)
Mobile app promotion with:
- App screenshot mockup
- Description text
- Google Play button
- App Store button

---

#### 12. **Footer** (`footer.tsx`)
Site-wide footer with:
- Brand name and copyright
- Four columns: About Us, Discover, My Account
- Social media links (Facebook, Twitter, Instagram, LinkedIn, YouTube)
- Navigation links to all major pages

---

## Main Page Component

### **HomePage** (`app/page.tsx`)
Main page orchestrator that:
1. Fetches home page data via `useHomePage` hook
2. Shows loading spinner during data fetch
3. Shows error message if data fails to load
4. Renders all section components with appropriate props
5. Passes cart and favorites handlers to child components

**Structure:**
```tsx
<HeroSection />
<CategoriesSection />
<FeaturedBooksSection {...props} />
<BestSellingBookSection {...props} />
<PopularBooksSection {...props} />
<QuoteSection />
<BooksWithOfferSection {...props} />
<NewsletterSection {...props} />
<LatestArticlesSection {...props} />
<DownloadAppSection />
<Footer />
```

## Benefits of Component Architecture

1. **Reusability** - Components can be used across different pages
2. **Maintainability** - Easier to update and debug isolated components
3. **Testability** - Each component can be tested independently
4. **Separation of Concerns** - Clear boundaries between features
5. **Code Organization** - Cleaner file structure and smaller file sizes
6. **Type Safety** - Each component has its own TypeScript interfaces
7. **Performance** - Easier to optimize individual components

## File Structure

```
app/
├── components/
│   ├── book-card.tsx
│   ├── hero-section.tsx
│   ├── categories-section.tsx
│   ├── featured-books-section.tsx
│   ├── best-selling-book-section.tsx
│   ├── popular-books-section.tsx
│   ├── quote-section.tsx
│   ├── books-with-offer-section.tsx
│   ├── newsletter-section.tsx
│   ├── latest-articles-section.tsx
│   ├── download-app-section.tsx
│   ├── footer.tsx
│   └── index.ts (barrel export)
├── page.tsx (main home page)
└── use-home-page.ts (custom hook)
.env.local (environment variables)
.env.example (environment template)
```

## TypeScript Interfaces

All components use proper TypeScript interfaces for type safety:
- **HomeBook** - Book data from API
- **Article** - Article data structure
- Component-specific prop interfaces

## Next Steps

Consider:
1. Adding loading skeletons for each section
2. Implementing category filtering in PopularBooksSection
3. Making HeroSection dynamic with slider functionality
4. Adding pagination to article and book sections
5. Creating a shared layout component for other pages
6. Extracting Footer to a shared location for app-wide use
