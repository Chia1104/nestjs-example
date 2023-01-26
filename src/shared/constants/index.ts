import 'dotenv/config';

export const DB_HOST = process.env.POSTGRES_HOST || 'localhost';
export const DB_PORT = parseInt(process.env.POSTGRES_PORT) || 5432;
export const DB_NAME = process.env.POSTGRES_NAME || 'postgres';
export const DB_USER = process.env.POSTGRES_USERNAME || 'postgres';
export const DB_PASSWORD = process.env.POSTGRES_PASSWORD || 'postgres';
export const DB_MIGRATIONS_TABLE_NAME =
  process.env.DB_MIGRATIONS_TABLE_NAME || 'migrations';
export const DB_MIGRATIONS_RUN =
  Boolean(process.env.DB_MIGRATIONS_RUN) || false;
export const DB_SYNCHRONIZE = Boolean(process.env.DB_SYNCHRONIZE) || true;
