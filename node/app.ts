// src/app.ts

import express, { Request, Response } from 'express';
import usersRouter from './routes/users';

const app = express();
const port = 3000;

app.use('/users', usersRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
