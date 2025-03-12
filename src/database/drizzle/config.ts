import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASS, DATABASE_PORT, DATABASE_USER } from '@/config/env';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: ['./src/modules/auth/database/drizzle/schemas'],
  out: './src/database/drizzle/migrations',
  dbCredentials: {
    database: DATABASE_NAME,
    host: DATABASE_HOST,
    password: DATABASE_PASS,
    port: DATABASE_PORT,
    user: DATABASE_USER,
    ssl: false,
  },
});
