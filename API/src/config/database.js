module.exports = {
  username: process.env.DB_USER || 'root', 
  password: process.env.DB_PASSWORD || null,
  database: process.env.DB_NAME || 'mydatabase',
  host: process.env.DB_HOST || 'localhost',
  dialect: 'postgres',
};
