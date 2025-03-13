import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASS, DATABASE_PORT, DATABASE_USER } from '@/config/env';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import * as authSchemas from '@/modules/auth/database/drizzle/schemas';

const pool = new Pool({
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  user: DATABASE_USER,
  password: DATABASE_PASS,
  database: DATABASE_NAME,
  ssl: false,
});

export const db = drizzle({ client: pool, schema: { ...authSchemas } });
