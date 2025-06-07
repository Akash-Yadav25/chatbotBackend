import express from 'express';
import cors from 'cors';
import chatRoute from './routers/chatRoute.js';
import {errorHandler} from './middleware/errorHandler.js'

const app = express();
app.use(express.json());

app.use('/api',chatRoute);

app.use(errorHandler)

export default app;

