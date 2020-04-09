import { Router } from 'express';

import vehicleRoutes from './vehicles';
import tokenRoutes from './token';

const apiRoutes = Router();

apiRoutes.use('/vehicles', vehicleRoutes);
apiRoutes.use('/tokens', tokenRoutes);

export default apiRoutes;
