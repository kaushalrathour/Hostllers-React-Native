import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../NavigationContainer';
import {useNavigation} from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Footer(): React.JSX.Element {
  const isDarkMode = useSelector((state: any) => state.theme.isDarkMode);
  const activeIcon = useSelector((state: any) => state.activeScreen.screenName);
  const navigation = useNavigation<NavigationProp>();
  const array = [
    {
      title: 'Home',
      icon: 'home',
      onPress: () => {
        navigation.navigate('Home');
      },
    },
    {
      title: 'Listings',
      icon: 'list',
      onPress: () => {
        navigation.navigate('Listings');
      },
    },
    {
      title: 'Favourites',
      icon: 'heart',
      onPress: () => {
        navigation.navigate('Favourites');
      },
    },
    // {
    //   title: 'Notifications',
    //   icon: 'bell',
    //   onPress: () => {
    //     navigation.navigate('Notifications');
    //   },
    // },
  ];

  const iconColor = isDarkMode ? '#C0C0C0' : '#606060';
  const activeIconColor = isDarkMode ? '#FFD700' : '#0000FF';

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#282828' : '#E8E9EB'},
      ]}>
      {array.map((item, index) => (
        <TouchableOpacity
          style={styles.iconContainer}
          key={index}
          onPress={item.onPress}>
          <FontAwesome
            name={item.icon}
            size={30}
            color={
              activeIcon === item.title ||
              (item.title === 'Listings' && activeIcon === 'New Listing')
                ? activeIconColor
                : iconColor
            }
          />
          <Text
            style={[
              styles.iconText,
              {
                color:
                  activeIcon === item.title ||
                  (item.title === 'Listings' && activeIcon === 'New Listing')
                    ? activeIconColor
                    : iconColor,
              },
            ]}>
            {item.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  iconContainer: {
    alignItems: 'center',
  },
  iconText: {
    fontSize: 12,
  },
});
