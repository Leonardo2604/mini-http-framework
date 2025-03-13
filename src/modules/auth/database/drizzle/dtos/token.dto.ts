import { tokens } from '../schemas';

export type Token = typeof tokens.$inferSelect;
export type NewToken = typeof tokens.$inferInsert;
