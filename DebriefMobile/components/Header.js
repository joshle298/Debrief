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
        <View style={styles.statusContainer}>
        <View style={styles.statusDot} />
        <Text style={styles.statusText}>Your Debrief is ready</Text>
      </View>
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
    color: "#999",
    paddingBottom: 5 // Set the color for the name text
  },
  profilePictureContainer: {
    zIndex: 1,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'green',
    marginRight: 5,
  },
  statusText: {
    fontSize: 14,
    color: 'green',
  },
  
});

export default Header;
