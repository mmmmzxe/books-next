export function SuccessState({ message = 'Action completed successfully' }: { message?: string }) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-lg border border-neutral-100">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
          <svg
            className="h-10 w-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="mb-2 font-serif text-2xl font-medium text-neutral-900">Success</h3>
        <p className="text-neutral-500">{message}</p>
      </div>
    </div>
  );
}
