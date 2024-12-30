import dotenv from 'dotenv';

dotenv.config();

import './src/database';

import express from 'express';
import index from './src/routes/index';
import user from './src/routes/user'
import token from './src/routes/token';
import usuarioRoutes from './src/routes/usuarioRoutes';

class App{
    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/', index);
        this.app.use('/users/', user);
        this.app.use('/tokens/', token);
        this.app.use('/usuarios/', usuarioRoutes);
    }
}

export default new App().app;
