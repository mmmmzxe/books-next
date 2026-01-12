# Custom Hooks Documentation

This document describes all custom hooks created for the Books Shop application.

## Page Hooks (Located in respective page directories)

### 1. `useBooksShop` - `/app/books/use-books-shop.ts`
**Purpose:** Manages state and logic for the Books Shop page

**Returns:**
- `books` - Array of books from API
- `totalPages` - Total number of pages
- `currentPage` - Current active page
- `isLoading` - Loading state
- `error` - Error state
- `filters` - Current filter state
- `selectedGenres` - Array of selected genre filters
- `priceRange` - Price range filter [min, max]
- `minRating` - Minimum rating filter
- `viewMode` - Current view mode ('grid' | 'list')
- `handleSearch(search: string)` - Search handler
- `handleSort(sortBy: string)` - Sort handler
- `toggleGenre(genre: string)` - Genre filter toggle
- `handlePriceChange(range: [number, number])` - Price range handler
- `handleRatingChange(rating: number)` - Rating filter handler
- `toggleViewMode()` - View mode toggle
- `resetFilters()` - Reset all filters
- `setFilters` - Direct filter setter

---

### 2. `useBookDetail` - `/app/books/[id]/use-book-detail.ts`
**Purpose:** Manages book detail page logic including cart and favorites

**Parameters:**
- `bookId: string` - ID of the book to display

**Returns:**
- `book` - Book data
- `user` - Current user data
- `isLoading` - Loading state
- `error` - Error state
- `isOwner` - Boolean if user owns the book
- `favorite` - Boolean if book is favorited
- `handleAddToCart()` - Add book to cart
- `handleToggleFavorite()` - Toggle favorite status
- `handleDelete()` - Delete book (owner only)
- `handleEdit()` - Navigate to edit page

---

### 3. `useMyBooks` - `/app/my-books/use-my-books.ts`
**Purpose:** Manages user's personal books collection page

**Returns:**
- `books` - User's books array
- `totalPages` - Total number of pages
- `currentPage` - Current active page
- `isLoading` - Loading state
- `error` - Error state
- `user` - Current user data
- `filters` - Current filter state
- `selectedGenres` - Array of selected genre filters
- `priceRange` - Price range filter [min, max]
- `minRating` - Minimum rating filter
- `viewMode` - Current view mode ('grid' | 'list')
- `handleSort(sortBy: string)` - Sort handler
- `toggleGenre(genre: string)` - Genre filter toggle
- `handlePriceChange(range: [number, number])` - Price range handler
- `handleRatingChange(rating: number)` - Rating filter handler
- `toggleViewMode()` - View mode toggle
- `handleDeleteBook(bookId: string)` - Delete book handler
- `resetFilters()` - Reset all filters
- `setFilters` - Direct filter setter

---

### 4. `useCartPage` - `/app/cart/use-cart-page.ts`
**Purpose:** Manages shopping cart page logic

**Returns:**
- `cart` - Array of cart items
- `isEmpty` - Boolean if cart is empty
- `itemCount` - Total number of items
- `subtotal` - Cart subtotal
- `tax` - Calculated tax (10%)
- `total` - Total amount (subtotal + tax)
- `handleRemoveItem(bookId: string)` - Remove item from cart
- `handleUpdateQuantity(bookId: string, quantity: number)` - Update item quantity
- `handleClearCart()` - Clear entire cart
- `handleGoBack()` - Navigate back
- `handleCheckout()` - Proceed to checkout (placeholder)

---

### 5. `useFavoritesPage` - `/app/favorites/use-favorites-page.ts`
**Purpose:** Manages favorites page logic

**Returns:**
- `favorites` - Array of favorite books
- `isEmpty` - Boolean if favorites is empty
- `count` - Number of favorite items
- `handleAddAllToCart()` - Add all favorites to cart
- `handleRemoveFavorite(bookId: string)` - Remove from favorites
- `handleGoBack()` - Navigate back

---

### 6. `useHomePage` - `/app/use-home-page.ts`
**Purpose:** Manages home page logic including newsletter and featured books

**Returns:**
- `email` - Newsletter email state
- `isFavorite(bookId: string)` - Check if book is favorited
- `handleAddToCart(book: Book)` - Add book to cart
- `handleToggleFavorite(book: Book)` - Toggle book favorite status
- `handleNewsletterSubmit(e: FormEvent)` - Newsletter form handler
- `handleEmailChange(e: ChangeEvent)` - Email input handler
- `setEmail` - Direct email setter

---

### 7. `useProfile` - `/app/profile/use-profile.ts`
**Purpose:** Manages user profile page

**Returns:**
- `user` - User data
- `isLoading` - Loading state
- `error` - Error state or null
- `initial` - User's name initial for avatar
- `hasUser` - Boolean if user exists

---

### 8. `useLoginPage` - `/app/login/use-login-page.ts`
**Purpose:** Manages login page form and authentication

**Returns:**
- `form` - React Hook Form instance
- `register` - Form field registration function
- `errors` - Form validation errors
- `isPending` - Login mutation pending state
- `error` - Login error (removed - handled via toast)
- `onSubmit` - Form submit handler

---

## Shared Utility Hooks (Located in `/shared/hooks/`)

### 1. `useLocalStorage<T>(key: string, initialValue: T)`
**Purpose:** Persist state in localStorage with React state synchronization

**Parameters:**
- `key: string` - localStorage key
- `initialValue: T` - Initial value if no stored value exists

**Returns:**
- `[storedValue, setValue]` - Similar to useState but persisted

**Example:**
```typescript
const [theme, setTheme] = useLocalStorage('theme', 'light');
```

---

### 2. `useDebounce<T>(value: T, delay: number = 500)`
**Purpose:** Debounce rapidly changing values (e.g., search inputs)

**Parameters:**
- `value: T` - Value to debounce
- `delay: number` - Debounce delay in ms (default: 500)

**Returns:**
- `debouncedValue: T` - Debounced value

**Example:**
```typescript
const [search, setSearch] = useState('');
const debouncedSearch = useDebounce(search, 300);
```

---

### 3. `useClickOutside<T>(ref: RefObject<T>, handler: Function)`
**Purpose:** Detect clicks outside of a referenced element

**Parameters:**
- `ref: RefObject<T>` - React ref to the element
- `handler: Function` - Callback when click outside occurs

**Returns:** void

**Example:**
```typescript
const menuRef = useRef<HTMLDivElement>(null);
useClickOutside(menuRef, () => setMenuOpen(false));
```

---

### 4. `useMediaQuery(query: string)`
**Purpose:** Responsive design with CSS media queries

**Parameters:**
- `query: string` - CSS media query string

**Returns:**
- `matches: boolean` - Whether query matches

**Preset Hooks:**
- `useIsMobile()` - Returns true if max-width: 768px
- `useIsTablet()` - Returns true if 769px - 1024px
- `useIsDesktop()` - Returns true if min-width: 1025px

**Example:**
```typescript
const isMobile = useIsMobile();
const isLargeScreen = useMediaQuery('(min-width: 1440px)');
```

---

## Best Practices

1. **Separation of Concerns:** Page hooks contain page-specific logic, utility hooks are reusable
2. **Error Handling:** All hooks handle loading and error states consistently
3. **Toast Notifications:** User feedback is provided through toast notifications
4. **Type Safety:** All hooks are fully typed with TypeScript
5. **Performance:** Use debouncing for expensive operations like API calls
6. **Persistence:** Cart and favorites use localStorage for data persistence

## Hook Usage Examples

### Books Shop Page
```typescript
function BooksShopPage() {
  const {
    books,
    isLoading,
    handleSearch,
    toggleGenre,
  } = useBooksShop();
  
  return (
    // Component JSX
  );
}
```

### Cart Page
```typescript
function CartPage() {
  const {
    cart,
    total,
    handleUpdateQuantity,
    handleCheckout,
  } = useCartPage();
  
  return (
    // Component JSX
  );
}
```

---

## Migration Guide

All pages have been refactored to use custom hooks. The business logic has been extracted from components into hooks, making components focused purely on presentation.

**Before:**
```typescript
function Page() {
  const [state, setState] = useState();
  const handleAction = () => {
    // logic here
  };
  // More logic...
  
  return <div>...</div>;
}
```

**After:**
```typescript
function Page() {
  const { state, handleAction } = usePageHook();
  
  return <div>...</div>;
}
```

This architecture improves:
- **Testability:** Hooks can be tested independently
- **Reusability:** Logic can be shared across components
- **Maintainability:** Clear separation between logic and UI
- **Readability:** Components are cleaner and easier to understand
