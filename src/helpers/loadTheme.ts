import AsyncStorage from "@react-native-async-storage/async-storage"
export default async function loadTheme () {
    // const theme = await AsyncStorage.getItem("theme")
    const theme = false;
    if(theme) {
        return JSON.parse(theme);
    }else {
        return;
    }
}