import express from 'express';
import index from './routes/index';
import user from './src/routes/user'
import token from './controllers/token';

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
    }
}

export default new App().app;
