import {configureStore} from '@reduxjs/toolkit';
import themeReducer from '../features/theme/themeSlice';
import userReducer from '../features/userSlice';
import activeScreenReducer from '../features/activeScreenSlice';
import locationReducer from '../features/locationSlice';

export const store = configureStore({
  reducer: {
    activeScreen: activeScreenReducer,
    theme: themeReducer,
    user: userReducer,
    location: locationReducer,
  },
});
