import { Router } from 'express';
import { Tesla } from '../../utils';

const vehicleRoutes = Router();

vehicleRoutes.get('/', async (req, res) => {
  try {
    const { data } = await Tesla.getVehicles({ token: req.headers.authorization ?? '' });

    res.send(data);
  } catch (err) {
    res.send(err);
  }
});

export default vehicleRoutes;
