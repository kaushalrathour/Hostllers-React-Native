import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  coordinates: null,
  address: null,
  loading: false,
  error: null,
};

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setCoordinates: (state, action) => {
      state.coordinates = action.payload;
    },
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCoordinates, setAddress, setLoading, setError } = locationSlice.actions;

export default locationSlice.reducer;
