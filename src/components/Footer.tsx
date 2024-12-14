import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useSelector } from "react-redux"
type Props = {
    activeIcon: string;
};

const array = [
    { title: "Home", icon: "home" },
    { title: "Listings", icon: "list" },
    { title: "Favourites", icon: "heart" },
    { title: "Notifications", icon: "bell" },
];

export default function Footer({ activeIcon }: Props): React.JSX.Element {
    const isDarkMode = useSelector((state)=>state.theme.isDarkMode);

    // Define colors based on the theme
    const iconColor = isDarkMode ? 'white' : 'black';
    const activeIconColor = isDarkMode ? 'yellow' : 'blue';

    return (
        <View>
            {/* Render icons dynamically from the array */}
            <View style={styles.container}>
                {array.map((item, index) => (
                    <View style={styles.iconContainer} key={index}>
                        <FontAwesome 
                            name={item.icon} 
                            size={30} 
                            color={activeIcon === item.title ? activeIconColor : iconColor} 
                        />
                        <Text style={[styles.iconText, { color: activeIcon === item.title ? activeIconColor : iconColor }]}>
                            {item.title}
                        </Text>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    iconContainer: {
        alignItems: 'center',
    },
    iconText: {
        fontSize: 12,
    },
});
