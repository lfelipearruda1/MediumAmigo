import express from 'express';
import dotenv from 'dotenv';

import './database/index.js';
import routes from './routes.js';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(5432, () => {
  console.log('Server is running on port 3333');
});
