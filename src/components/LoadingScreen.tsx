import {StyleSheet, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import LogoTransparent from '../assets/logos/logo-transparent-png.png';
import {ActivityIndicator} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import loadTheme from '../helpers/loadTheme';
import {themeToggle} from '../features/theme/themeSlice';

export default function LoadingScreen() {
  const isDarkMode = useSelector((state: any) => state.theme.isDarkMode);
  const dispatch = useDispatch();
  const [indicatoryVisible, setIndicatoryVisible] = useState(false);
  useEffect(() => {
    (async () => {
      const theme = await loadTheme();
      if (isDarkMode != theme) {
        dispatch(themeToggle());
      }
    })();
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setIndicatoryVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#2e2e2e' : 'white'},
      ]}>
      <Image source={LogoTransparent} style={styles.logo} />
      {indicatoryVisible && (
        <ActivityIndicator
          animating={true}
          color={isDarkMode ? 'white' : 'black'}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  logo: {
    height: '50%',
    width: '100%',
    resizeMode: 'contain',
  },
});
