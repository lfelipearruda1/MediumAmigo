import { Pool } from 'pg'; //diferente do dele
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

export const db = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB,
    port: process.env.DB_PORT,
});

