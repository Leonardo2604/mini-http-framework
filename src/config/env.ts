export const NODE_ENV = process.env.NODE_ENV || 'development';

export const SERVER_HOST = process.env.SERVER_HOST;
export const SERVER_PORT = Number(process.env.SERVER_PORT) || 3000;

export const DATABASE_HOST = String(process.env.DATABASE_HOST);
export const DATABASE_USER = String(process.env.DATABASE_USER);
export const DATABASE_PASS = String(process.env.DATABASE_PASS);
export const DATABASE_PORT = Number(process.env.DATABASE_PORT) || 5432;
export const DATABASE_NAME = String(process.env.DATABASE_NAME);

export const HASH_SALT = Number(process.env.HASH_SALT) || 10;

export const JWT_SECRET = String(process.env.JWT_SECRET);
export const TOKEN_EXPIRES_IN_SECONDS = Number(process.env.TOKEN_EXPIRES_IN_SECONDS) || 600;
export const REFRESH_TOKEN_EXPIRES_IN_DAYS = Number(process.env.REFRESH_TOKEN_EXPIRES_IN_DAYS) || 30;
