'use client';

import { useSearchParams } from 'next/navigation';
import { ErrorState } from '@/shared/ui';
import { Suspense } from 'react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message') || 'An unexpected error occurred';

  return <ErrorState error={message} />;
}

export default function StatusErrorPage() {
  return (
    <div className="container mx-auto max-w-7xl px-6 py-24">
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorContent />
      </Suspense>
    </div>
  );
}
