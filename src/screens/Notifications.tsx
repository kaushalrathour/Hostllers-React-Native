import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {RootStackParamList} from '../NavigationContainer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {setActiveScreen} from '../features/activeScreenSlice';
import {useDispatch, useSelector} from 'react-redux';
import Container from '../components/Container';

type Props = NativeStackScreenProps<RootStackParamList, 'Notifications'>;

export default function NotificationsScreen({navigation}: Props) {
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setActiveScreen('Notifications'));
  }, [navigation]);
  return (
    <Container>
      <View>
        <Text>Listings</Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({});
