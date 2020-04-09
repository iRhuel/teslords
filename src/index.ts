require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import boom from 'express-boom';

import { startDB } from './db';
import routes from './routes';
import { usePassport } from './utils';

const { PORT, APP_SECRET } = process.env;

const app = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));
app.use(boom());
app.use(
  session({ secret: APP_SECRET || 'secret', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }),
);
app.use(passport.initialize());
app.use(passport.session());

startDB();
usePassport();

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
