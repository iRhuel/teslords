import { Router } from 'express';
import { Tesla } from '../../utils';
import { Vehicle } from '../../db/models';

const vehicleRoutes = Router();

vehicleRoutes.get('/', async (req, res) => {
  const token = req.currentUser.token;
  if (!token) {
    return res.boom.unauthorized('no access_token');
  } else {
    try {
      const { data } = await Tesla.getVehicles({ token: token.getAuthHeader() });
      const vehicles = await req.currentUser.getVehicles();

      const intIds = vehicles.map(vehicle => vehicle.id);
      const createPromises: Promise<Vehicle>[] = [];

      for (const extVehicle of data.response) {
        if (!intIds.includes(extVehicle.id)) {
          createPromises.push(Vehicle.create(extVehicle));
        }
      }

      const newVehicles = await Promise.all(createPromises);

      return res.json(vehicles.concat(newVehicles));
    } catch (err) {
      return res.send(err);
    }
  }
});

export default vehicleRoutes;
