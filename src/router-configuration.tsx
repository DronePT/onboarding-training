import { RouteEntry } from './core';
import { PreviewPage, ViewTrainingPage } from './modules';

export const routerConfiguration: RouteEntry[] = [
  {
    path: '/',
    component: PreviewPage,
  },
  {
    path: '/training/:slug/:step',
    exact: true,
    component: ViewTrainingPage,
  },
  {
    path: '/training/:slug',
    exact: true,
    component: ViewTrainingPage,
  },
];
