const { timeStamp } = require("console");

module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'docker', // Usuário do banco de dados
  password: 'docker', // Senha do usuário
  database: 'sqlnode', // Nome do banco
  port: 5432, // Porta do PostgreSQL
  define: {
    timestamps: true, // Cria os campos createdAt e updatedAt automaticamente
    underscored: true, // Usa snake_case para nomes de tabelas e colunas
  },
};