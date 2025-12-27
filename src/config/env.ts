import { z } from 'zod';

const envSchema = z.object({
  // Server-side env variables
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

  // Client-side env variables (must start with NEXT_PUBLIC_)
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  NEXT_PUBLIC_API_URL: z.string().url().default('http://localhost:3000/api'),
  NEXT_PUBLIC_APP_NAME: z.string().default('CNTT Examples'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

export const env = _env.data;
