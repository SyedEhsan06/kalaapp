import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  userInfo: null, // Store single user info, not an array
  userType: null, 
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("Action", action.payload)
      state.isAuthenticated = true;
      state.userInfo = action.payload; 
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null; // Reset to null instead of an empty array
      state.userType = null;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
  },
});

export const { login, logout, setUserType } = userSlice.actions;
export default userSlice.reducer;
