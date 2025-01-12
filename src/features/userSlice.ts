import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  userInfo: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isLoggedIn = true;
      state.userInfo = action.payload;
      (async () => {
        await AsyncStorage.setItem('userInfo', JSON.stringify(action.payload));
      })();
    },
    clearUser: state => {
      state.isLoggedIn = false;
      state.userInfo = null;
      (async () => {
        await AsyncStorage.removeItem('userInfo');
      })();
    },
  },
});

export const {setUser, clearUser} = userSlice.actions;

export default userSlice.reducer;
