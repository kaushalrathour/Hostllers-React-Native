import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Container from '../components/Container';
import {RootStackParamList} from '../NavigationContainer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {TextInput, Text, Checkbox} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {setActiveScreen} from '../features/activeScreenSlice';
import {Formik} from 'formik';
import {Picker} from '@react-native-picker/picker';
import {StateWithCity} from '../assets/StateWithCity';

type Props = NativeStackScreenProps<RootStackParamList, 'NewListing'>;

export default function NewListingScreen({navigation}: Props) {
  const userInfo = useSelector((state: any) => state.user.userInfo);
  const isDarkMode = useSelector((state: any) => state.theme.isDarkMode);
  const dispatch = useDispatch();

  // State to hold the selected state object
  const [selectedState, setSelectedState] = useState<any>(null);

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'business') {
      navigation.replace('Login');
    }
  }, [navigation, userInfo]);

  useEffect(() => {
    dispatch(setActiveScreen('New Listing'));
  }, [navigation]);

  return (
    <Container>
      <ScrollView contentContainerStyle={styles.container}>
        <Text>New Listing</Text>
        <Formik
          initialValues={{title: '', state: '', city: ''}}
          onSubmit={values => {
            console.log(values);
          }}>
          {({handleChange, handleBlur, handleSubmit, values}) => {
            return (
              <View style={styles.formContainer}>
                <Text>Title</Text>
                <TextInput
                  value={values.title}
                  onChangeText={handleChange('title')}
                />

                {/* Indian States */}
                <Picker
                  selectedValue={values.state}
                  onValueChange={value => {
                    handleChange('state')(value);
                    const stateObj = StateWithCity.find(
                      state => state.state === value,
                    );
                    setSelectedState(stateObj || null);
                  }}>
                  <Picker.Item label="Select" value="Select" />
                  {StateWithCity.map((state: any, index: number) => {
                    return (
                      <Picker.Item
                        key={index}
                        label={state.state}
                        value={state.state}
                      />
                    );
                  })}
                </Picker>

                {/* Indian Cities */}
                <Picker
                  selectedValue={values.city}
                  onValueChange={handleChange('city')}>
                  <Picker.Item label="Select" value="Select" />
                  {selectedState &&
                    selectedState.cities.map((city: string, index: number) => (
                      <Picker.Item key={index} label={city} value={city} />
                    ))}
                </Picker>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
});
