import express from 'express';
import dotenv from 'dotenv';

import './database/index.js';
import routes from './routes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use(routes);

const PORT = process.env.PORT || 5432;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
