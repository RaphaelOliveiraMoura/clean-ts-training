import { Router } from 'express';

import { SignUpControllerFactory } from '../factories';

import { ExpressRouteAdapter } from '@/main/adapters';

export default function setup(router: Router) {
  router.post(
    '/signup',
    ExpressRouteAdapter.adapt(SignUpControllerFactory.build())
  );
}
