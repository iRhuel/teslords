// importing the dependencies
require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import Tesla from './utils/Tesla';

const TeslaAPI = new Tesla();

console.log(process.env.TESLA_API_URL || 'noUrl');

// consts
const PORT = 3000;

// defining the Express app
const app = express();

// defining an array to work as the database (temporary solution)
const resp = 'hello world';

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

app.post('/auth', async (req, res) => {
  const email = req?.body?.email;
  const password = req?.body?.password;

  if (!email || !password) {
    res.send('no email or password!');
  }

  try {
    const { data } = await TeslaAPI.oauth.password(email, password);

    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

app.get('/vehicles', async (req, res) => {
  const token = req?.headers.authorization;

  if (!token) {
    res.send('no token!');
  }

  try {
    const { data } = await TeslaAPI.vehicles(token!);
    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

// starting the server
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
