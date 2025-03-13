import { users } from '../schemas/users';

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
