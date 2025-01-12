import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {RootStackParamList} from '../NavigationContainer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useDispatch, useSelector} from 'react-redux';
import {setActiveScreen} from '../features/activeScreenSlice';
import Container from '../components/Container';

type Props = NativeStackScreenProps<RootStackParamList, 'Listings'>;

export default function ListingsScreen({navigation}: Props) {
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setActiveScreen('Listings'));
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
