import { User, Token, Vehicle, Charge, ChargeState } from '../src/db/models';
import { Tesla, sleep } from '../src/utils';
import { AxiosResponse } from 'axios';
import { ChargeStateResp } from '../src/utils/Tesla';

const isCharging = (resp: AxiosResponse<ChargeStateResp>) => {
  return !!resp.data.response?.charge_rate && !!resp.data.response?.charger_voltage;
};

const longPoll = async (
  ...args: Parameters<typeof Tesla.getChargeState>
): Promise<AxiosResponse<ChargeStateResp> | null> => {
  await sleep(60000);

  const resp = await Tesla.getChargeState(...args);

  if (isCharging(resp)) {
    return longPoll(...args);
  } else {
    return resp;
  }
};

export default async () => {
  const vehicles = await Vehicle.findAll({
    include: [{ model: User, include: [{ model: Token, required: true }] }],
  });

  for (const vehicle of vehicles) {
    const user = vehicle.user!;
    const token = `Bearer ${user.token?.access_token}`;

    Tesla.getChargeState(vehicle.id_s, { token })
      .then(async (resp) => {
        if (isCharging(resp)) {
          const charge = await Charge.create({
            ...resp.data.response,
            user_id: user.id,
          });

          const chargeStateStart = await ChargeState.create({
            charge_id: charge.id,
          });

          await charge.update({ charge_state_start_id: chargeStateStart.id });

          const respEnd = await longPoll(vehicle.id_s, { token });

          if (respEnd) {
            const chargeStateEnd = await ChargeState.create({
              ...respEnd.data.response,
              user_id: user.id,
            });

            await charge.update({ charge_state_end_id: chargeStateEnd.id });
          }
        }
      })
      .catch((err) => {
        console.error(`Charge logging error for vehicle ${vehicle.id_s}`, err.message);
      });
  }
};
