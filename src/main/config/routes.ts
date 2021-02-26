import { Application, Router } from 'express';

import auth from '@/main/routes/auth';

export function setupRoutes(app: Application) {
  const router = Router();

  auth(router);

  app.use(router);
}
