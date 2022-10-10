import createStore from 'zustand';

import { createTrainingProgressSlice } from '../modules';

type StateFromFunctions<T extends [...any]> = T extends [infer F, ...infer R]
  ? F extends (...args: any) => object
    ? StateFromFunctions<R> & ReturnType<F>
    : unknown
  : unknown;

export type AppState = StateFromFunctions<[typeof createTrainingProgressSlice]>;

export const useStore = createStore<AppState>((set, get) => ({
  ...createTrainingProgressSlice(set, get),
}));
