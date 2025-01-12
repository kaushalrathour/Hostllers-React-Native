import axios from 'axios';
import {MAPBOX_TOKEN} from '@env';

export const fetchAddressFromMapbox = async (
  latitude: number,
  longitude: number,
) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_TOKEN}`;

  try {
    const response = await axios.get(url);

    if (response.data.features && response.data.features.length > 0) {
      const address = response.data.features[0].place_name;
      // console.log('Address:', address);
      return address;
    } else {
      // console.log('No results found');
    }
  } catch (error) {
    console.error('Error fetching address from Mapbox:', error);
  }
};
