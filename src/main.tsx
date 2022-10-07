import React from 'react';
import { createRoot } from 'react-dom/client';

import './store';
import './style.css';

import { RouterMap, RouterProvider } from './core';
import { routerConfiguration } from './router-configuration';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <RouterProvider>
      <RouterMap routes={routerConfiguration} />
    </RouterProvider>
  </React.StrictMode>,
);
