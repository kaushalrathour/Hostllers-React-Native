import React, { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';
import NavigationContainer from './NavigationContainer';
import { Provider } from 'react-redux';
import { store } from './app/store';
import {Text, View} from "react-native"

export default function App(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  console.log("Hello");
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading)  {
    return (
      <Provider store={store}>
        <LoadingScreen />
    </Provider>
    )
  };
  return (
    <Provider store={store}>
    <NavigationContainer/>
    </Provider>
    // <View style={{backgroundColor: "white"}}>
    // <Text style={{color: "pink"}}>
    //   Hello, There
    // </Text>
    // </View>
  );
}
