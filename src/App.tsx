import React, {useEffect, useState} from 'react';
import LoadingScreen from './components/LoadingScreen';
import NavigationContainer from './NavigationContainer';
import {Provider} from 'react-redux';
import {Provider as PaperProvider, Button, Text} from 'react-native-paper';
import {store} from './app/store';
import axios from 'axios';
import {ENDPOINT} from '@env';
import {LogBox} from 'react-native';

export default function App(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const checkServer = async () => {
    try {
      await axios.get(ENDPOINT);
      setTimeout(() => {
        setIsLoading(false);
      }, 3000);
      setIsError(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.error('Network Error:', error);
    }
  };

  useEffect(() => {
    checkServer();
  }, []);
  useEffect(() => {
    LogBox.ignoreLogs([
      'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
    ]);

    return () => {
      LogBox.ignoreLogs([]);
    };
  }, []);

  const handleRetry = () => {
    setIsLoading(true);
    setIsError(false);
    checkServer();
  };

  return (
    <Provider store={store}>
      <PaperProvider>
        {isLoading ? (
          <LoadingScreen />
        ) : isError ? (
          <>
            <Text style={{textAlign: 'center', marginTop: 50}}>
              Unable to reach the server.
            </Text>
            <Button
              mode="contained"
              onPress={handleRetry}
              style={{marginTop: 20}}>
              Retry
            </Button>
          </>
        ) : (
          <NavigationContainer />
        )}
      </PaperProvider>
    </Provider>
  );
}
