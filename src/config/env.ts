export const NODE_ENV = process.env.NODE_ENV || 'development';

export const SERVER_HOST = process.env.SERVER_HOST;
export const SERVER_PORT = Number(process.env.SERVER_PORT) || 3000;

export const DATABASE_HOST = String(process.env.DATABASE_HOST);
export const DATABASE_USER = String(process.env.DATABASE_USER);
export const DATABASE_PASS = String(process.env.DATABASE_PASS);
export const DATABASE_PORT = Number(process.env.DATABASE_PORT) || 5432;
export const DATABASE_NAME = String(process.env.DATABASE_NAME);

export const PASSWORD_SALT = Number(process.env.PASSWORD_SALT) || 10;
