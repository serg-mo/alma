import { configureStore } from '@reduxjs/toolkit';
import leadsReducer from './leads';

export const store = configureStore({
  reducer: {
    leads: leadsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
