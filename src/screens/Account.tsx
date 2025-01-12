import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {RootStackParamList} from '../NavigationContainer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {setActiveScreen} from '../features/activeScreenSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {setUser, clearUser} from '../features/userSlice';
import Container from '../components/Container';
type Props = NativeStackScreenProps<RootStackParamList, 'Account'>;

export default function AccountScreen({navigation}: Props) {
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const userInfo = useSelector(state => state.user.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveScreen('Account'));
  }, [navigation]);

  useEffect(() => {
    if (!userInfo) {
      navigation.replace('Login');
    }
  }, [navigation, userInfo]);

  return (
    <Container>
      <>
        {userInfo != null && (
          <View style={[styles.container]}>
            {/* Header Section */}
            <View style={styles.headerContainer}>
              <Text
                style={[
                  styles.headerText,
                  {color: isDarkMode ? '#fff' : '#000'},
                ]}>
                {`@${userInfo?.username}`}
              </Text>
            </View>

            {/* Profile Section */}
            <View
              style={[
                styles.profileContainer,
                {backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff'},
              ]}>
              <View
                style={[
                  styles.iconContainer,
                  {backgroundColor: isDarkMode ? '#bb86fc' : '#6200ee'},
                ]}>
                <Text style={styles.iconText}>
                  {userInfo?.name[0].toUpperCase()}
                </Text>
              </View>
              <Text
                style={[
                  styles.nameText,
                  {color: isDarkMode ? '#e0e0e0' : '#333'},
                ]}>
                {userInfo?.name || 'User Name'}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                dispatch(clearUser());
                navigation.replace('Login');
              }}>
              <Text style={{fontSize: 25}}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {width: 0, height: 2},
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: 18,
    fontWeight: '600',
  },
});
