import { View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

type Props = {
  children: React.JSX.Element
}
export default function Container  ({ children }:Props):React.JSX.Element {
  const isDarkMode = useSelector((state)=>state.theme.isDarkMode);
  return <View style={{flex: 1, backgroundColor: isDarkMode?"black":"white", paddingHorizontal:10, paddingVertical: 10}}>{children}</View>
}

 

