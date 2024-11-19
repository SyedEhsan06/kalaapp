import { configureStore } from '@reduxjs/toolkit';
import artistReducer from './slices/artistSlice';
import userReducer from './slices/userSlice';

const store = configureStore({
  reducer: {
    artist: artistReducer,
    user: userReducer,
  },
});

export default store;
