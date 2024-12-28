import { Sequelize } from 'sequelize';
import dbConfig from '../config/database.js';
import User from '../models/User.js';

const models = [User];
const connection = new Sequelize(dbConfig);

models.forEach((model) => model.init(connection));

export default connection;
