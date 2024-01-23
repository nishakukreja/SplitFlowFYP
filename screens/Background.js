import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const Background = ({ children }) => {
    return (
      <LinearGradient
        colors={['#ffffff', 'transparent']}  // Change the gradient colors here
        style={{ flex: 1 }}
      >
        {children}
      </LinearGradient>
    );
  }
  
  export default Background;
  
