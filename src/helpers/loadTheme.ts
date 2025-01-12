import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function loadTheme() {
  try {
    const theme = await AsyncStorage.getItem('isDarkMode');
    if (theme !== null) {
      return JSON.parse(theme);
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error loading theme:', error);
    return false;
  }
}
