import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import { createRoot } from 'react-dom/client';

import './store';
import './style.css';

import { RouterMap, RouterProvider } from './core';
import { routerConfiguration } from './router-configuration';

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider>
        <RouterMap routes={routerConfiguration} />
      </RouterProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
