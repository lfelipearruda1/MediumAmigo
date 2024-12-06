const { timeStamp } = require("console");

module.exports = {
  dialect: 'postgres', 
  host: 'localhost', 
  username: 'docker', 
  password: 'docker', 
  database: 'sqlnode', 
  port: 5432, 
  define: {
    timestamps: true, 
    underscored: true,
  },
};
