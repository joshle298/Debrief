import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import ProfilePicture from './ProfilePicture';

const Header = ({ name }) => {
    const currentHour = new Date().getHours();
    let greeting;
  
    if (currentHour < 12) {
      greeting = 'Good Morning,';
    } else if (currentHour < 18) {
      greeting = 'Good Afternoon,';
    } else {
      greeting = 'Good Evening,';
    }
  
  return (
    <View style={styles.headerContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.greetingText}>{greeting}</Text>
        <Text style={styles.nameText}>{name}</Text>
      </View>
      <View style={styles.profilePictureContainer}>
        <ProfilePicture source={require('../assets/josh.jpg')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: StatusBar.currentHeight + 25, // Include StatusBar height and add extra padding
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  textContainer: {
    flexDirection: "column",
  },
  greetingText: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#000", // Set the color for the greeting text
  },
  nameText: {
    fontSize: 24,
    color: "#999", // Set the color for the name text
  },
  profilePictureContainer: {
    zIndex: 1,
  },
});

export default Header;
