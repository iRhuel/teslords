import { Tesla } from '../src/utils';
import { User, Token, Vehicle } from '../src/db/models';

export default async () => {
  console.info('Waking up all eligible vehicles');
  const vehicles = await Vehicle.findAll({
    include: [{ model: User, include: [{ model: Token, required: true }] }],
  });

  const promises: ReturnType<typeof Tesla.wakeUpVehicle>[] = [];

  for (const vehicle of vehicles) {
    const user = vehicle.user!;
    const token = `Bearer ${user.token!.access_token}`;

    promises.push(
      Tesla.wakeUpVehicle({ token }, vehicle.id_s)
        .then((res) => {
          console.info(`wake up successful for vehicle ${vehicle.id_s}:\n`, res.data);
          return res;
        })
        .catch((err) => {
          console.error(`wakeup failed for vehicle ${vehicle.id_s}:`, err.message);
          throw err;
        }),
    );
  }

  const wakeupResponses = await Promise.all(promises);
};
