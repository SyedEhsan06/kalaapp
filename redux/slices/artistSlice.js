import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  artists: [],
};

const artistSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {
    addArtist: (state, action) => {
      console.log("Actions",action.payload)
      state.artists = [...state.artists, action.payload];
    },
    updateArtist: (state, action) => {
      const index = state.artists.findIndex(artist => artist.id === action.payload.id);
      if (index !== -1) {
        state.artists[index] = action.payload;
      }
    },
  },
});

export const { addArtist, updateArtist } = artistSlice.actions;
export default artistSlice.reducer;
