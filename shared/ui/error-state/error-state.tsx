export function ErrorState({ error }: { error: Error | string }) {
  const message = typeof error === 'string' ? error : error.message;

  return (
    <div className="flex min-h-100 flex-col items-center justify-center">
      <div className="rounded-lg bg-red-50 p-6 text-center">
        <svg
          className="mx-auto h-12 w-12 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-4 text-lg font-semibold text-red-900">Error</h3>
        <p className="mt-2 text-sm text-red-700">{message}</p>
      </div>
    </div>
  );
}
