import { RequestHandler } from 'express';
import passport from 'passport';

export const useLocalAuth: RequestHandler = (req, res, next) => {
  return passport.authenticate('local', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }

    const email = req?.body?.email;
    const password = req?.body?.password;

    if (!email || !password) {
      return res.status(422).send(`${email ? 'password' : 'email'} is required`);
    }

    if (user) {
      req.user = user;
      return next();
    }

    return res.status(401);
  })(req, res, next);
};

export const useJWTAuth: RequestHandler = (req, res, next) => {
  return passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }

    if (user) {
      req.user = user;
      return next();
    }

    return res.status(401);
  })(req, res, next);
};
