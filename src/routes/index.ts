import { Router } from 'express';

import authRoutes from './auth';
import apiRoutes from './api';
import { useJWTAuth } from '../middleware';

const rootRouter = Router();

rootRouter.get('/', (req, res) => {
  res.send('status: OK');
});

rootRouter.use('/auth', authRoutes);
rootRouter.use('/api', useJWTAuth, apiRoutes);

export default rootRouter;
