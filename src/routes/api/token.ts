import { Router } from 'express';
import { Tesla } from '../../utils';
import { Token } from '../../db/models';

const tokenRoutes = Router();

tokenRoutes.post('/', async (req, res) => {
  const email = req.body?.email;
  const password = req.body?.password;

  if (!email || !password) {
    return res.boom.badData(`${!email ? 'email' : 'password'} is required`);
  }

  try {
    const { data } = await Tesla.auth(email, password);

    await Token.create({
      ...data,
      created_at: new Date(data.created_at),
      user_id: req.currentUser.id,
    });
  } catch (err) {
    return res.boom.badImplementation(err.message);
  }
});

tokenRoutes.delete('/', async (req, res) => {
  if (!req.currentUser.token) {
    return res.boom.badRequest('no access_token');
  } else {
    try {
      await req.currentUser.token.destroy();
      return res.status(204).send();
    } catch (err) {
      return res.send(err);
    }
  }
});

export default tokenRoutes;
