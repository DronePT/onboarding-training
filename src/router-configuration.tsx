import { RouteEntry } from './core';
import { HomePage, ViewTrainingPage } from './modules';

export const routerConfiguration: RouteEntry[] = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/training',
    component: ViewTrainingPage,
  },
];