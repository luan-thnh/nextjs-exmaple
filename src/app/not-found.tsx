import Link from 'next/link';
import { FileQuestion } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-slate-50 text-center">
      <div className="rounded-full bg-slate-100 p-4">
        <FileQuestion className="text-primary h-12 w-12" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">Page Not Found</h1>
        <p className="text-muted-foreground text-sm">
          Could not find requested resource. Please check the URL and try again.
        </p>
      </div>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}
