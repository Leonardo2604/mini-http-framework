export type SignOptions = {
  expiresIn: number;
};

export interface JWTService {
  sign(payload: Record<string, unknown>, options: SignOptions): string;

  verify(token: string): Record<string, unknown>;
}
