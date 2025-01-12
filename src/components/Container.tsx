import {View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

type Props = {
  children: React.JSX.Element;
};
export default function Container({children}: Props): React.JSX.Element {
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  const screenName = useSelector(state => state.activeScreen.screenName);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode ? '#202020' : '#F2F3F4',
        paddingHorizontal: screenName == 'Login' ? 0 : 10,
        paddingVertical: screenName == 'Login' ? 0 : 10,
        justifyContent: 'space-between',
      }}>
      {children}
    </View>
  );
}
