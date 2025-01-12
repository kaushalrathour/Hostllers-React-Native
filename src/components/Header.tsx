import {StyleSheet, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {Text, TextInput} from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../NavigationContainer';

export default function Header(): React.JSX.Element {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const locationError = useSelector(state => state.location.error);
  const locationLoading = useSelector(state => state.location.loading);
  const address = useSelector(state => state.location.address);

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#333' : '#fff'},
      ]}>
      {/* Location and User Icon */}
      <View style={styles.headerRow}>
        <View style={{width: '80%'}}>
          <Text
            style={[
              styles.locationText,
              {
                color: isDarkMode ? '#aaa' : '#595a63',
                fontSize: locationError || locationLoading ? 14 : 16,
              },
            ]}>
            {locationError ? locationError : address}
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
          <FontAwesome
            name="user-circle"
            size={30}
            color={isDarkMode ? '#fff' : '#595a63'}
          />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View
        style={[
          styles.searchContainer,
          {borderColor: isDarkMode ? '#aaa' : '#595a63'},
        ]}>
        <TextInput
          placeholder="Search"
          placeholderTextColor={isDarkMode ? '#aaa' : '#595a63'}
          style={[
            styles.searchInput,
            {
              backgroundColor: isDarkMode ? '#444' : '#f8f8f8',
              color: isDarkMode ? '#fff' : '#000',
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationText: {
    textAlign: 'justify',
  },
  searchContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderRadius: 5,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
  },
});
