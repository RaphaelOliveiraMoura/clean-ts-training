import { Router } from 'express';

import { buildSingUpController, buildSignInController } from '../factories';

import { ExpressRouteAdapter } from '@/main/adapters';

export default function setup(router: Router) {
  router.post('/signup', ExpressRouteAdapter.adapt(buildSingUpController()));
  router.post('/signin', ExpressRouteAdapter.adapt(buildSignInController()));
}
