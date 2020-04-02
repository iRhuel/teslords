import { Router } from 'express';
import { BAD_REQUEST, CREATED, OK } from 'http-status-codes';

import Tesla from '../utils/Tesla';
import { User } from '../db/models';
import { useLocalAuth, useJWTAuth } from '../middleware';

const authRoutes = Router();

/**
 * POST create new user
 */
authRoutes.post('/', async (req, res) => {
  const email = req?.body?.email;
  const password = req?.body?.password;

  if (!email || !password) {
    return res.status(422).send(`${email ? 'password' : 'email'} is required`);
  }

  const user = await User.create({ email });
  await user.setPassword(password);

  return res.status(CREATED).json(user.toAuthJSON());
});

/**
 * POST login user
 */
authRoutes.post('/login', useLocalAuth, (req, res) => {
  return res.json(req.user?.toAuthJSON());
});

// tesla auth
authRoutes.post('/', useJWTAuth, async (req, res) => {
  const email = req?.body?.email;
  const password = req?.body?.password;

  try {
    const { data } = await Tesla.auth(email, password);

    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

export default authRoutes;
