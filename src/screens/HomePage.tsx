import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import Container from '../components/Container'
import Footer from '../components/Footer' 
import Header from '../components/Header'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
// import { TouchableOpacity } from 'react-native-gesture-handler'
import { useSelector, useDispatch } from 'react-redux'
import  { themeToggle } from '../features/theme/themeSlice'

export default function HomePage  ():React.JSX.Element  {
  const role = "business";
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state)=>state.theme.isDarkMode);
  return (
    <Container>
      <View style={styles.container}>
        <Header/>
        <View style={styles.contentContainer}>
          <View style={styles.hoverButtons}>{ role === "business" && 
          <TouchableOpacity onPress={()=>{}} activeOpacity={1}>
            <MaterialIcons name={"post-add"} size={40} color={isDarkMode?"white": "black"}/>
          </TouchableOpacity>}
          <TouchableOpacity onPress={()=>{dispatch(themeToggle())}} activeOpacity={1}>
            <MaterialIcons name={isDarkMode?"light-mode": "dark-mode"} size={40} color={isDarkMode?"white": "black"}/>
            </TouchableOpacity>
          </View>
        </View>
        <Footer activeIcon='Home'/>
      </View>
      </Container>
  )
}

 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between"
  },
  contentContainer: {
    flex: 1,
  },
  hoverButtons: {
    position: "absolute",
    bottom: 70,
    right: 20,
    gap: 30
  },

})