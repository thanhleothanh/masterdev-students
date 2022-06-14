import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from './middlewares/error-handler';
import { hocsinhRouter } from './routes/hocsinh-route';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(hocsinhRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError('Route not found!');
});

app.use(errorHandler);

export default app;
