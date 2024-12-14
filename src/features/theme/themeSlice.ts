import { createSlice } from "@reduxjs/toolkit"
import AsyncStorage from "@react-native-async-storage/async-storage"

const initialState = {
    isDarkMode: true
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        themeToggle: (state) => {
            state.isDarkMode = !state.isDarkMode;
            // (async ()=>{
            //     await AsyncStorage.setItem("theme", JSON.stringify(state.isDarkMode))
            // })();
        },
    },
});

export const { themeToggle } = themeSlice.actions;

export default themeSlice.reducer;
