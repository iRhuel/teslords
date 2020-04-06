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
      const requestConfig = { token: `Bearer ${user.token.access_token}` };

      for (const vehicle of user.vehicles) {
        await Tesla.wakeUpVehicle(requestConfig, vehicle.id_s);
        console.log(`Wake up success for user ${args.user_id}, vehicle ${vehicle.id}`);
      }
    } catch (err) {
      throw new Error(`Wakeup attempt for user ${args.user_id} failed: ${err.message}`);
    }
  }
};
