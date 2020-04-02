import { User as UserModel } from '../../src/db/models';

declare global {
  namespace Express {
    interface User extends UserModel {}
    export interface Request {
      user?: User;
    }
  }
}
