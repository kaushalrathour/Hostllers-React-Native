import React, {Fragment, useMemo, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {
  TextInput,
  MD2Colors as Colors,
  Text,
  HelperText,
  Checkbox,
} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParamList} from '../NavigationContainer';
import LogoTransparent from '../assets/logos/logo-transparent-png.png';
import {useSelector, useDispatch} from 'react-redux';
import {themeToggle} from '../features/theme/themeSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import Toast from 'react-native-toast-message';

type Props = StackScreenProps<RootStackParamList, 'Login'>;
const API_ENDPOINT = 'http://192.168.225.161:5000';

export default function LoginScreen({navigation}: Props) {
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const dispatch = useDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoginScreen, setIsLoginScreen] = useState(true);

  const validationSchema = useMemo(() => {
    return Yup.object().shape({
      name: Yup.string().required('Name is required'),
      username: Yup.string()
        .required('Username is required')
        .matches(/^\S*$/, 'Username cannot contain spaces')
        .matches(
          /^[a-zA-Z0-9_]+$/,
          'Username must contain only letters, numbers, or underscores',
        )
        .min(3, 'Username must be at least 3 characters long')
        .max(15, 'Username must not exceed 15 characters'),
      password: Yup.string().required('Password is required'),
      email: isLoginScreen
        ? Yup.string().email().notRequired()
        : Yup.string()
            .email('Please enter a valid email')
            .required('Email is required'),
      role: isLoginScreen
        ? Yup.string().notRequired()
        : Yup.string()
            .oneOf(
              ['user', 'business'],
              'Role must be either "user" or "business"',
            )
            .required('Role is required'),
    });
  }, [isLoginScreen]);

  const handleLogin = async (values: any) => {
    const {username, password} = values;

    try {
      const response = await axios.post(`${API_ENDPOINT}/login`, {
        username,
        password,
      });

      if (response.data.status === 'success') {
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: 'Welcome back!',
          position: 'top',
        });
        console.log('Login successful:', response.data);
      }
    } catch (error) {
      if (error.response.data.status === 'fail') {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2:
            error.response.data.message ||
            'Please check your credentials and try again.',
          position: 'top',
        });
        return;
      }
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An unexpected error occurred. Please try again later.',
        position: 'top',
      });
      console.error('Login error:', error);
    }
  };

  const handleRegister = async (values: any) => {
    console.log('Register', values);
    const {username, password, email, role, name} = values;
    try {
      const response = await axios.post(`${API_ENDPOINT}/register`, {
        name,
        username,
        password,
        email,
        role,
      });
      console.log('Registration successful:', response.data);
      Toast.show({
        type: 'success',
        text1: response.data.message,
        text2: 'Welcome to Hostllers',
        position: 'top',
      });
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response.data.status === 'fail') {
        Toast.show({
          type: 'error',
          text1: 'Registration Failed',
          text2:
            error.response.data.message ||
            'Please check your credentials and try again.',
          position: 'top',
        });
        // return;
      }
    }
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDarkMode ? '#121212' : Colors.white},
      ]}>
      {/* Theme Toggle */}
      <TouchableOpacity
        onPress={() => dispatch(themeToggle())}
        style={styles.themeToggle}>
        <MaterialIcons
          name={isDarkMode ? 'light-mode' : 'dark-mode'}
          size={30}
          color={isDarkMode ? Colors.white : Colors.black}
        />
      </TouchableOpacity>

      {/* Formik Form */}
      <Formik
        initialValues={{
          name: '',
          username: '',
          email: '',
          password: '',
          role: 'user',
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          isLoginScreen ? handleLogin(values) : handleRegister(values);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.formContainer}>
            {/* Header Section */}
            <View style={styles.formHeaderContainer}>
              <Image
                source={LogoTransparent}
                style={[
                  styles.logoImage,
                  {tintColor: isDarkMode ? Colors.blue300 : Colors.blue700},
                ]}
              />
              <Text
                style={[
                  styles.formHeaderText,
                  {color: isDarkMode ? Colors.white : Colors.blue700},
                ]}>
                {isLoginScreen ? 'Login to Hostllers' : 'Register to Hostllers'}
              </Text>
              <Text
                style={[
                  styles.formHeaderSubText,
                  {color: isDarkMode ? Colors.grey300 : Colors.grey700},
                ]}>
                {isLoginScreen
                  ? 'Welcome back! Please login to continue'
                  : 'Welcome to Hostllers! Please register to continue'}
              </Text>
            </View>

            {/* Input Fields */}
            <View style={styles.formInputContainer}>
              {!isLoginScreen && (
                <Fragment>
                  <View style={styles.checkboxContainer}>
                    <Text style={styles.checkboxLabel}>Register as</Text>
                    <View style={styles.checkboxGroup}>
                      <TouchableOpacity
                        style={styles.checkboxRow}
                        onBlur={handleBlur('role')}
                        onPress={() => {
                          setFieldValue('role', 'user');
                          // values.role = 'user'
                        }}>
                        <Checkbox
                          status={
                            values.role === 'user' ? 'checked' : 'unchecked'
                          }
                          color={Colors.blue500}
                        />
                        <Text style={styles.checkboxText}>User</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.checkboxRow}
                        onBlur={handleBlur('role')}
                        onPress={() => {
                          setFieldValue('role', 'business');
                        }}>
                        <Checkbox
                          status={
                            values.role === 'business' ? 'checked' : 'unchecked'
                          }
                          color={Colors.blue500}
                        />
                        <Text style={styles.checkboxText}>Business</Text>
                      </TouchableOpacity>
                    </View>
                    {touched.role && errors.role && (
                      <HelperText type="error">{errors.role}</HelperText>
                    )}
                  </View>
                  <View style={styles.inputContainer}>
                    <TextInput
                      label="Name"
                      mode="outlined"
                      maxLength={15}
                      value={values.name}
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      error={touched.name && Boolean(errors.name)}
                      style={styles.input}
                      theme={{
                        colors: {
                          primary: Colors.blue500,
                          background: isDarkMode
                            ? Colors.grey800
                            : Colors.white,
                        },
                      }}
                    />
                    {touched.name && errors.name && (
                      <HelperText type="error">{errors.name}</HelperText>
                    )}
                  </View>
                </Fragment>
              )}

              <View style={styles.inputContainer}>
                <TextInput
                  label="Username"
                  mode="outlined"
                  maxLength={15}
                  value={values.username}
                  onChangeText={value => {
                    setFieldValue('username', value.trim());
                  }}
                  onBlur={handleBlur('username')}
                  error={touched.username && Boolean(errors.username)}
                  style={styles.input}
                  theme={{
                    colors: {
                      primary: Colors.blue500,
                      background: isDarkMode ? Colors.grey800 : Colors.white,
                    },
                  }}
                />
                {touched.username && errors.username && (
                  <HelperText type="error">{errors.username}</HelperText>
                )}
              </View>

              {!isLoginScreen && (
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Email"
                    mode="outlined"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    error={touched.email && Boolean(errors.email)}
                    style={styles.input}
                    theme={{
                      colors: {
                        primary: Colors.blue500,
                        background: isDarkMode ? Colors.grey800 : Colors.white,
                      },
                    }}
                  />
                  {touched.email && errors.email && (
                    <HelperText type="error">{errors.email}</HelperText>
                  )}
                </View>
              )}

              <View style={styles.inputContainer}>
                <TextInput
                  label="Password"
                  mode="outlined"
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  secureTextEntry={!passwordVisible}
                  error={touched.password && Boolean(errors.password)}
                  style={styles.input}
                  theme={{
                    colors: {
                      primary: Colors.blue500,
                      background: isDarkMode ? Colors.grey800 : Colors.white,
                    },
                  }}
                  right={
                    <TextInput.Icon
                      icon={passwordVisible ? 'eye-off' : 'eye'}
                      onPress={() => setPasswordVisible(!passwordVisible)}
                    />
                  }
                />
                {touched.password && errors.password && (
                  <HelperText type="error">{errors.password}</HelperText>
                )}
              </View>
            </View>

            {/* Footer Section */}
            <TouchableOpacity
              style={styles.alreadyContainer}
              onPress={() => setIsLoginScreen(!isLoginScreen)}>
              <Text
                style={[
                  styles.alreadyText,
                  {color: isDarkMode ? Colors.blue300 : Colors.blue700},
                ]}>
                {isLoginScreen
                  ? 'Not registered yet? Register!'
                  : 'Already registered? Login!'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={[
                styles.submitButton,
                {backgroundColor: isDarkMode ? Colors.blue300 : Colors.blue500},
              ]}>
              <Text style={styles.submitButtonText}>
                {isLoginScreen ? 'Login' : 'Register'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  themeToggle: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  formHeaderContainer: {
    marginBottom: 24,
  },
  logoImage: {
    width: '70%',
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  formHeaderText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formHeaderSubText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 8,
  },
  formInputContainer: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: Colors.white,
  },
  checkboxContainer: {
    marginBottom: 16,
    padding: 8,
    backgroundColor: Colors.grey100,
    borderRadius: 8,
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.grey800,
  },
  checkboxGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  checkboxText: {
    fontSize: 14,
    marginLeft: 8,
    color: Colors.grey800,
  },
  alreadyText: {
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  alreadyContainer: {
    marginBottom: 10,
    alignItems: 'flex-end',
  },
  submitButton: {
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});