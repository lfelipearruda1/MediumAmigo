import { Sequelize } from 'sequelize';
import dbConfig from '../config/database.js';
import Usuario from '../models/usuario.js';
import User from '../models/User.js';
import Foto from '../models/foto.js';

const models = [Usuario, User, Foto];

const connection = new Sequelize(dbConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models)); 

export default connection;
