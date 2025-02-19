import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });

const { Pool } = pkg;

export const db = new Pool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'mediumapi',
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
});

db.connect()
    .then(() => console.log('Conexão com o banco de dados bem-sucedida!'))
    .catch((error) => console.error('Erro ao conectar no banco de dados:', error.message));
