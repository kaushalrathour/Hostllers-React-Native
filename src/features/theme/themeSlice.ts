import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  isDarkMode: false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    themeToggle: state => {
      state.isDarkMode = !state.isDarkMode;
      (async () => {
        await AsyncStorage.setItem(
          'isDarkMode',
          JSON.stringify(state.isDarkMode),
        );
        console.log('Saved');
      })();
    },
  },
});

export const {themeToggle} = themeSlice.actions;

export default themeSlice.reducer;
