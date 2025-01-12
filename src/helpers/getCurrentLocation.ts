import Geolocation from '@react-native-community/geolocation';
import {requestLocationAccess} from './requestLocationAccess';
import {fetchAddressFromMapbox} from './fetchAddressFromMapbox';

export const getCurrentLocation = async (
  dispatch: any,
  setCoordinates: any,
  setAddress: any,
  setLoading: any,
  setError: any,
) => {
  dispatch(setLoading(true));
  const granted = await requestLocationAccess();
  if (!granted) {
    console.error('Location access not granted');
    dispatch(setError('Location access not granted'));
    dispatch(setLoading(false));
    return;
  }

  dispatch(setLoading(true));
  Geolocation.getCurrentPosition(
    async position => {
      try {
        const {latitude, longitude} = position.coords;
        console.log('Latitude:', latitude, 'Longitude:', longitude);

        dispatch(setCoordinates({latitude, longitude}));

        const address = await fetchAddressFromMapbox(latitude, longitude);
        if (address) {
          dispatch(setAddress(address));
        } else {
          console.warn('Address not found');
          dispatch(setAddress('Unknown location'));
        }
      } catch (error: any) {
        console.error('Error during location/address handling:', error);
        dispatch(setError(error.message || 'Failed to fetch location/address'));
      } finally {
        dispatch(setLoading(false));
      }
    },
    error => {
      console.error('Error while fetching current location:', error.message);
      dispatch(setError(error.message || 'Failed to get current location'));
      dispatch(setLoading(false));
    },
    {
      enableHighAccuracy: false,
      timeout: 30000,
    },
  );
};
