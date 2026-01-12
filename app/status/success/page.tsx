'use client';

import { useSearchParams } from 'next/navigation';
import { SuccessState } from '@/shared/ui';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get('message') || 'Operation completed successfully';

  return <SuccessState message={message} />;
}

export default function StatusSuccessPage() {
  return (
    <div className="container mx-auto max-w-7xl px-6 py-24">
      <Suspense fallback={<div>Loading...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
