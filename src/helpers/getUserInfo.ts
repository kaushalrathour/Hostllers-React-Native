import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function getUserInfo() {
  try {
    const userInfo = await AsyncStorage.getItem('userInfo');
    if (userInfo !== null) {
      return JSON.parse(userInfo);
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error retrieving user info:', error);
    return null;
  }
}
