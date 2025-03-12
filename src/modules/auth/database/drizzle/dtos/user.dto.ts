import { users } from '../schemas/users';

export type User = typeof users.$inferSelect;
