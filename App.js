import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login'; 
import Signup from './screens/Signup'
import Welcome from './screens/Welcome';
import Home from './screens/Home';
import AccountDetail from './screens/AccountDetail';
// import  ComfirmEmailScreen from "./screens/ConfirmEmailScreen";
import NewPasswordScreen from './screens/NewPasswordScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import AccountDetails from './screens/AccountDetails';
import Gender from './screens/Gender';
import AreaOfInterest from './screens/AreaOfInterest'
import { StyleSheet } from 'react-native';
import UploadPicture from './screens/UploadPicture';
import Splash from './screens/Splash';
import OTPScreen from './screens/OTPScreen';
import { Provider } from 'react-redux';
import { store } from './redux/Store';
import Profile from './screens/Profile';


import PlusScreen from './screens/PlusScreen';
import Settings from './screens/Settings';
import CheckEmail from './screens/CheckEmail';
import Notification from './screens/Notification';
import BottomTabs from './navigation/BottomTabs';
import NewTaskScreen from './screens/NewTaskScreen'
import DoneTask from './screens/DoneTask';
import PasswordChange from './screens/PasswordChange';
import EditProfile from './screens/EditProfile';
const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    // SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>

    <NavigationContainer>
      <Stack.Navigator initialRouteName='Splash'>
      <Stack.Screen name="Welcome" component={Welcome}
         options={{
          headerShown: false
        }} />

<Stack.Screen name="Splash" component={Splash}
         options={{
          headerShown: false
        }} />
        <Stack.Screen name="Login" component={Login}
        options={{
          headerShown: false
        }}
         />
        <Stack.Screen name="Signup" component={Signup}
         options={{
          headerShown: false
        }} /> 
        <Stack.Screen name="AccountDetails" component={AccountDetails}
        options={{
          headerShown: false
        }}  />
        <Stack.Screen name="Gender" component={Gender}
         options={{
          headerShown: false
        }}
         />
        <Stack.Screen name="AreaOfInterest" component={AreaOfInterest}
         options={{
          headerShown: false
        }} />
         <Stack.Screen name="UploadPicture" component={UploadPicture}
           options={{
            headerShown: false
          }}
         />
         
         
    {/* <Stack.Screen name="CameraScreen" component={CameraScreen}/> */}
        {/* <Stack.Screen name="Notification" component={Notification} />  */}
        <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} 
         options={{
          headerShown: false
        }}
        /> 
        <Stack.Screen name="NewPasswordScreen" component={NewPasswordScreen}
         options={{
          headerShown: false
        }} />
        <Stack.Screen name="Home" component={Home} 
        options={{
          headerShown: false
        }}
       />

<Stack.Screen name="SendAndVerifyOTP" component={OTPScreen}
        options={{
          headerShown: false
        }}
         />
         
<Stack.Screen name="Profile" component={Profile}
        options={{
          headerShown: false
        }}
         />
         <Stack.Screen name="PlusScreen" component={PlusScreen}
        // options={{
        //   headerShown: false
        // }}
         />
         <Stack.Screen name="Settings" component={Settings}
        options={{
          headerShown: false
        }}
         />
          <Stack.Screen name="CheckEmail" component={CheckEmail}
        options={{
          headerShown: false
        }}
         />
           <Stack.Screen name="Notification" component={Notification} 
        //  options={{
        //   headerShown: false
        // }}
        />
        
        <Stack.Screen name="NewTaskScreen" component={NewTaskScreen} 
         options={{
          headerShown: false
        }}
        />
          <Stack.Screen name="DoneTask" component={DoneTask} 
         options={{
          headerShown: false
        }}
        />
              <Stack.Screen name="PasswordChange" component={PasswordChange} 
            options={{
              headerShown: false
            }}
          
            />
             <Stack.Screen name="EditProfile" component={EditProfile} 
         options={{
          headerShown: false
        }}
      
        />
        <Stack.Screen name="AccountDetail" component={AccountDetail}
        options={{
          headerShown: false
        }}  />
            
             </Stack.Navigator>
           
    </NavigationContainer>
    </Provider>
  );
}


export default App;
