import React from 'react';
import { Image, StyleSheet } from 'react-native';

const ProfilePicture = ({ source }) => {
  return (
    <Image source={source} style={styles.profileImage} />
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderColor: '#999',
    borderWidth: 0.5,
    // marginTop: -40,
    marginRight: 5,
  },
});

export default ProfilePicture;
