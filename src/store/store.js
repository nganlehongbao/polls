import { configureStore } from '@reduxjs/toolkit';
import rootSlice from './rootSlice';
import { middleware } from '../middleware/auth';

export const store = configureStore({
  reducer: {
    root: rootSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});
