import { users } from '../schemas/users';

export type CreateUser = typeof users.$inferInsert;
