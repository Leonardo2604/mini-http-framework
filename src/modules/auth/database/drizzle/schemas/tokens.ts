import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { users } from './users';

export const tokens = pgTable('tokens', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  revokedAt: timestamp('revoked_at'),
  expiresAt: timestamp('expires_at').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});
