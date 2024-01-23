import React from 'react';
import { View, Text } from 'react-native';
import Custombutton from './Custombutton';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the appropriate icon library

const Socialbuttons = () => {
//   const onLoginFacebook = () => {
//     console.warn('onLoginFacebook');
//   };

  const onLoginGoogle = () => {
    console.warn('onLoginGoogle');
  };

  // const onLoginApple = () => {
  //   console.warn('onLoginApple');
  // };

  return (
    <>
      {/* <Custombutton
        text="Sign In with Facebook"
        onPress={onLoginFacebook}
        bgColor="#E7EAF4"
        fgColor="#4765A9"
      
      /> */}
      <Custombutton
        text="Sign In with Google"
        onPress={onLoginGoogle}
        bgColor="#FAE9EA"
        fgColor="#DD4D44"
      />
      {/* <Custombutton
        text="Sign In with Apple"
        onPress={onLoginApple}
        bgColor="#e3e3e3"
        fgColor="#363636"
        
      /> */}
    </>
  );
};

export default Socialbuttons;
