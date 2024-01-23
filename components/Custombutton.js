// Custombutton.js
import React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';

const Custombutton = ({ onPress, text, type = 'PRIMARY', bgColor, fgColor }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        styles[`container_${type}`],
        bgColor ? { backgroundColor: bgColor } : {},
      ]}
    >
      <Text
        style={[
          styles.text,
          styles[`text_${type}`],
          fgColor ? { color: fgColor } : {}, // Set text color
        ]}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '77%',
    height: 55, // Set a specific height for the container
    padding: 16,
    marginVertical: 7,
    marginHorizontal: 7,
    alignItems: 'center',
    borderRadius: 16,
  },

  container_PRIMARY: {
    backgroundColor: '#6146C6',
    marginTop: 31,
  },

  container_SECONDARY: {
    borderColor: 'gray',
    borderWidth: 1,
  },

  container_TERTIARY: {
    backgroundColor: 'transparent',
  },

  text_TERTIARY: {
    color: 'black',
  },

  text: {
    // fontWeight: 'bold',
    color: 'white',
    fontSize: 16,
  },

  text_SECONDARY: {
    color: 'black',
    borderRadius: 1,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default Custombutton;
