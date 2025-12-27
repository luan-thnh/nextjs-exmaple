'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-slate-50 text-center">
      <div className="bg-destructive/10 text-destructive rounded-full p-4">
        <AlertCircle className="h-12 w-12" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Something went wrong!</h1>
        <p className="text-muted-foreground max-w-[500px] text-sm">
          {error.message || 'An unexpected error occurred. Our team has been notified.'}
        </p>
      </div>
      <div className="flex gap-2">
        <Button onClick={() => reset()} variant="outline">
          Try again
        </Button>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
