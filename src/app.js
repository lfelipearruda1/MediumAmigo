import express from 'express';
import index from './routes/index';
import user from './src/routes/user'

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
    }
}

export default new App().app;
