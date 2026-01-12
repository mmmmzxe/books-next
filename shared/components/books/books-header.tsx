'use client';

interface BooksHeaderProps {
  totalBooks: number;
  sortBy?: string;
  viewMode: 'grid' | 'list';
  onSort: (sortBy: string) => void;
  onToggleViewMode: () => void;
}

export function BooksHeader({
  totalBooks,
  sortBy,
  viewMode,
  onSort,
  onToggleViewMode,
}: BooksHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm text-[#7A7A7A]">{totalBooks} books found</p>
      </div>
      <div className="flex flex-wrap items-center gap-4">

        {/* Sort Dropdown */}
        <select
          value={sortBy || ''}
          onChange={(e) => onSort(e.target.value)}
          className="rounded-md border border-[#D0D0D0] bg-white px-4 py-2 text-sm text-[#222222] focus:border-[#74642F] focus:outline-none"
        >
          <option value="">Most Popular</option>
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>

        {/* View Mode Toggle */}
        <div className="flex gap-2 rounded-md border border-[#D0D0D0] bg-white p-1">
          <button
            onClick={onToggleViewMode}
            className={`rounded p-2 ${
              viewMode === 'grid' ? 'bg-[#222222] text-white' : 'text-[#7A7A7A]'
            }`}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z" />
            </svg>
          </button>
          <button
            onClick={onToggleViewMode}
            className={`rounded p-2 ${
              viewMode === 'list' ? 'bg-[#222222] text-white' : 'text-[#7A7A7A]'
            }`}
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
