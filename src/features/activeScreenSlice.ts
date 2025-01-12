import {createSlice} from '@reduxjs/toolkit';
const initialState = {
  screenName: 'Login',
};
const activeScreenSlice = createSlice({
  name: 'activeScreen',
  initialState: initialState,
  reducers: {
    setActiveScreen: (state, action) => {
      state.screenName = action.payload;
    },
  },
});

export const {setActiveScreen} = activeScreenSlice.actions;

export default activeScreenSlice.reducer;
