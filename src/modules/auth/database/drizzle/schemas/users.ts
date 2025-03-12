import { timestamp } from 'drizzle-orm/pg-core';
import { uuid, varchar, smallint } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey(),
  name: varchar('name', { length: 180 }).notNull(),
  email: varchar('email').notNull(),
  password: varchar('password').notNull(),
  birthday: timestamp('birthday', { withTimezone: true }).notNull(),
  gender: smallint('gender').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
});
