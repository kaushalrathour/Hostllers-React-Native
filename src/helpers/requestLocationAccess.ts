import {Platform, PermissionsAndroid} from 'react-native';

export const requestLocationAccess = async () => {
  if (Platform.OS === 'android') {
    try {
      const access = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (access !== PermissionsAndroid.RESULTS.GRANTED) {
        console.error('Location access denied');
        return false;
      }
    } catch (error) {
      console.error('Error requesting location access:', error);
      return false;
    }
  }
  console.log('Got Location Access');
  return true;
};
