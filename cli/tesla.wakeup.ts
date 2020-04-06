import { Tesla } from '../src/utils';
import { User, Token, Vehicle } from '../src/db/models';

interface Args {
  user_id: number;
}

export default async (args: Args) => {
  const user = await User.findByPk(args.user_id, { include: [Token, Vehicle] });

  if (!user) {
    throw new Error(`No user found for id ${args.user_id}`);
  } else if (!user.token) {
    throw new Error(`No token for user ${args.user_id}`);
  } else if (!user.vehicles) {
    throw new Error(`No vehicle for user ${args.user_id}`);
  } else {
    try {
      const requestConfig = { token: user.token.access_token };
      const resp = await Tesla.wakeUpVehicle(requestConfig, user.vehicles[0].id);

      console.log('GOOD!', resp.data);
    } catch (err) {
      console.log('BAD!', err.message);
    }
  }
};
