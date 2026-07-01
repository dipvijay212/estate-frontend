import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/features/auth/store/authSlice';
import websiteThemeReducer from '@/features/settings/store/websiteThemeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    websiteTheme: websiteThemeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
