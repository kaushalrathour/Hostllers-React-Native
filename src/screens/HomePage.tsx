import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../components/Container';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {themeToggle} from '../features/theme/themeSlice';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../NavigationContainer';
import ListingCard from '../components/ListingCard';
import {setActiveScreen} from '../features/activeScreenSlice';
import {listings} from '../assets/listings';
import haversine from 'haversine';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomePage({navigation}: Props): React.JSX.Element {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state: any) => state.theme.isDarkMode);
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const coordinates = useSelector((state: any) => state.location.coordinates);
  const [showMore, setShowMore] = useState(false);
  useEffect(() => {
    if (!userInfo) {
      navigation.replace('Login');
    }
  }, [navigation]);

  useEffect(() => {
    dispatch(setActiveScreen('Home'));
  }, [navigation]);
  const calculateDistance = (listingCoordinates: any, coordinates: any) => {
    if (coordinates != null) {
      const calculatedDistance: number = haversine(
        coordinates,
        listingCoordinates,
      );
      return `${calculatedDistance.toFixed(1)} km from here`;
    } else {
      return 'Distance unavailable';
    }
  };
  return (
    <Container>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hoverButtons}>
          {userInfo != null && userInfo.role === 'business' && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('NewListing');
              }}
              style={{zIndex: 5000}}
              activeOpacity={1}>
              <MaterialIcons
                name={'post-add'}
                size={40}
                color={isDarkMode ? 'white' : 'black'}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              dispatch(themeToggle());
            }}
            style={{zIndex: 5000}}
            activeOpacity={1}>
            <MaterialIcons
              name={isDarkMode ? 'light-mode' : 'dark-mode'}
              size={40}
              color={isDarkMode ? 'white' : 'black'}
            />
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={listings.slice(0, 4)}
            renderItem={({item, index}: any) => {
              return (
                <React.Fragment>
                  {index === 0 && (
                    <Text
                      style={{
                        color: isDarkMode ? 'white' : 'black',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}>
                      Listings
                    </Text>
                  )}
                  <ListingCard
                    listing={item}
                    distance={calculateDistance(item.coordinates, coordinates)}
                  />
                </React.Fragment>
              );
            }}
            keyExtractor={item => item.id.toString()}
          />

          {!showMore && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Listings');
              }}
              style={styles.viewMoreButton}>
              <Text style={styles.viewMoreText}>View More</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
  },
  hoverButtons: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    gap: 15,
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginVertical: 12,
  },
  viewMoreButton: {
    alignItems: 'center',
    marginTop: 12,
  },
  viewMoreText: {
    fontSize: 16,
    color: '#ea266d',
    fontWeight: 'bold',
  },
});
