import passport from 'passport';
import Local from 'passport-local';
import JWT from 'passport-jwt';
import { Request } from 'express';

import { User } from '../db/models';

const { APP_SECRET } = process.env;

const getToken = (req: Request) => {
  const {
    headers: { authorization },
  } = req;

  const splitToken = authorization ? authorization.split(' ') : [];

  if (splitToken[0] === 'Token' || splitToken[0] === 'Bearer') {
    return splitToken[1];
  } else {
    return null;
  }
};

export default () => {
  passport.use(
    new Local.Strategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ where: { email }, include: [User.associations.token] });
          if (!user || !user.validatePassword(password)) {
            return done({ 'email or password': 'is invalid' });
          } else {
            return done(null, user);
          }
        } catch (err) {
          return done(err);
        }
      },
    ),
  );

  passport.use(
    new JWT.Strategy(
      {
        jwtFromRequest: JWT.ExtractJwt.fromExtractors([JWT.ExtractJwt.fromAuthHeaderAsBearerToken(), getToken]),
        secretOrKey: APP_SECRET || 'secret',
      },
      async (jwt, done) => {
        try {
          const user = await User.findOne({ where: { id: jwt.id }, include: [User.associations.token] });
          if (!user) {
            done({ user: 'Not found' });
          } else {
            return done(null, user);
          }
        } catch (err) {
          done(err);
        }
      },
    ),
  );
};
