const express = require('express');
const user = require('./controllers/user');

const routes =  express.Router();

routes.get('/users', user.index);
routes.post('/users', user.store);

module.exports = routes;