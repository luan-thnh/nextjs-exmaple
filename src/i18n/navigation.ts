import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing';

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
// Note: This file should NOT be imported in middleware (edge runtime)
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
