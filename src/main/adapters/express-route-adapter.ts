import { Request, Response } from 'express';

import { Controller } from '@/presentation/contracts';

export class ExpressRouteAdapter {
  static adapt(controller: Controller) {
    return async (req: Request, res: Response) => {
      const response = await controller.handle({ body: req.body });
      return res.status(response.statusCode).json(response.body);
    };
  }
}
