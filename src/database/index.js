const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const User = require('../models/User');

const models = [User];

const connection = new Sequelize(dbConfig);

models.forEach((model) => model.init(connection));

module.exports = connection;
