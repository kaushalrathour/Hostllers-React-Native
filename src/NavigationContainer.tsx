import React, {useEffect, useState} from 'react';
import {NavigationContainer as Navigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from './screens/HomePage';
import LoginScreen from './screens/Login';
import AccountScreen from './screens/Account';
import getUserInfo from './helpers/getUserInfo';
import NotificationsScreen from './screens/Notifications';
import FavouritesScreen from './screens/Favourites';
import ListingsScreen from './screens/Listings';
import Footer from './components/Footer';
import {useDispatch, useSelector} from 'react-redux';
import Header from './components/Header';
import {setUser} from './features/userSlice';
import NewListingScreen from './screens/NewListing';
import {View} from 'react-native';
import {getCurrentLocation} from './helpers/getCurrentLocation';
import {
  setAddress,
  setCoordinates,
  setError,
  setLoading,
} from './features/locationSlice';
import LoadingScreen from './components/LoadingScreen';
export type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Account: undefined;
  Notifications: undefined;
  Listings: undefined;
  Favourites: undefined;
  NewListing: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
export default function NavigationContainer(): React.JSX.Element {
  const screenName = useSelector((state: any) => state.activeScreen.screenName);
  const [initialRoute, setInitialRoute] =
    useState<keyof RootStackParamList>('Login');
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserInfo = async () => {
      try {
        const userInfo = await getUserInfo();
        // console.log('UserInfo in Navigation', userInfo);
        if (userInfo != null) {
          dispatch(setUser(userInfo));
          setInitialRoute('Home');
        }
      } catch (error) {
        console.error('Error checking user info:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserInfo();
  }, []);
  useEffect(() => {
    getCurrentLocation(
      dispatch,
      setCoordinates,
      setAddress,
      setLoading,
      setError,
    );
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <Navigation>
        <View style={{flex: 1}}>
          <React.Fragment>
            {screenName !== 'Login' && screenName !== 'Account' && <Header />}

            <Stack.Navigator initialRouteName={initialRoute}>
              <Stack.Screen
                options={{headerShown: false}}
                component={HomePage}
                name="Home"
              />
              <Stack.Screen
                options={{headerShown: false}}
                component={LoginScreen}
                name="Login"
              />
              <Stack.Screen
                options={{headerShown: false}}
                component={AccountScreen}
                name="Account"
              />
              <Stack.Screen
                options={{headerShown: false}}
                component={ListingsScreen}
                name="Listings"
              />
              <Stack.Screen
                options={{headerShown: false}}
                component={NotificationsScreen}
                name="Notifications"
              />
              <Stack.Screen
                options={{headerShown: false}}
                component={FavouritesScreen}
                name="Favourites"
              />
              <Stack.Screen
                options={{headerShown: false}}
                component={NewListingScreen}
                name="NewListing"
              />
            </Stack.Navigator>
            {screenName != 'Login' && <Footer />}
          </React.Fragment>
        </View>
      </Navigation>
    );
  }
}
