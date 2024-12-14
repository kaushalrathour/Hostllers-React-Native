import { StyleSheet, View, Image, TextInput } from 'react-native';
import React, { useState } from 'react';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import LogoBlack from "../assets/logos/logo-black.png";
import LogoWhite from "../assets/logos/logo-white.png";
import {useSelector} from "react-redux"

export default function Header(): React.JSX.Element {
  const [searchText, setSearchText] = useState<string>("");
  const isDarkMode = useSelector((state)=>state.theme.isDarkMode);
  return (
    <View style={[styles.container]}>
      <Image source={isDarkMode ? LogoWhite : LogoBlack} style={styles.logo} />
      <View style={[styles.searchContainer, { borderColor: isDarkMode ? 'white' : 'gray' }]}>
        <TextInput
          placeholder='Search'
          value={searchText}
          onChangeText={setSearchText}
          style={styles.input}
          placeholderTextColor={isDarkMode? "grey" : "black"}
        />
        <FontAwesome name="search" size={20} color={isDarkMode ? "white" : "black"} style={styles.searchIcon} />
      </View>
      <FontAwesome name="user-circle" size={40} color={isDarkMode ? "white" : "black"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  logo: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});
