import React from 'react'
import { NavigationContainer as Navigation } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack';
import {Provider as PaperProvider} from "react-native-paper"
import HomePage from './screens/HomePage';
import LoginScreen from './screens/Login';

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
}

const Stack = createStackNavigator<RootStackParamList>()
export default function NavigationContainer  ():React.JSX.Element  {
  return (
    <PaperProvider>
            <Navigation>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen options={{headerShown: false}} component={HomePage} name="Home"/>
                    <Stack.Screen options={{headerShown: false}} component={LoginScreen} name="Login"/>
                </Stack.Navigator>
                </Navigation>
        </PaperProvider>  
  )
}
