import { User as UserModel } from '../../src/db/models';

declare global {
  namespace Express {
    export interface Request {
      currentUser: UserModel;
    }
  }
}
