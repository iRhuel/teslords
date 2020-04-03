import { Router } from 'express';

const chargeRoutes = Router();

chargeRoutes.get('/', async (req, res) => {
  const charges = await req.currentUser.getCharges();
  return res.json(charges);
});

export default chargeRoutes;
