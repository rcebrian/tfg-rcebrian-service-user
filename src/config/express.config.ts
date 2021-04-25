import express, { json, Request, Response } from 'express';
import morgan from 'morgan';
import httpStatus from 'http-status';
import { errorHandler, APIError } from '@rcebrian/tfg-rcebrian-common';
import router from '../api/routes';
import { winstonStream } from './winston.config';

/**
 * Express instance
 * @public
 */
const app = express();

app.use(morgan(':remote-addr - :remote-user ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms', { stream: winstonStream }));

app.use(json());

app.use('/api', router);

app.use(errorHandler);

app.get('*', (req: Request, res: Response) => {
  throw new APIError({ message: 'Not found', status: httpStatus.NOT_FOUND });
});

export = app;
