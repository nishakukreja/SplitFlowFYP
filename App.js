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
import NewTaskScreen from './screens/NewTaskScreen'
import DoneTask from './screens/DoneTask';
import PasswordChange from './screens/PasswordChange';
import EditProfile from './screens/EditProfile';
import ChatScreen from './screens/ChatScreen';
import ViewAllScreen from './screens/ViewAllScreen';
import AllTaskScreen from './screens/AllTaskScreen';
import TaskDetailScreen from './screens/TaskDetailScreen';
import SearchScreen from './screens/SearchScreen';
import TwoFactorAuthentication from './screens/TwoFactorAuthentication';
import UserScreen from './screens/UserScreen';
import StepScreen from './screens/StepScreen';
import TwoFactorVerification from './screens/TwoFactorVerification';
import BackupScreen from './screens/BackupScreen';
import HomeTabs from './navigation/HomeTabs';
// import BottomTabs from './navigation/BottomTabs';
// import UserIdContext from './components/UserIdContext';
import { UserIdProvider } from './components/UserIdContext';
import FinishScreen from './screens/FinishScreen';
import PaymentScreen from './screens/PaymentScreen';
import ConversationScreen from './screens/ConversationScreen';
import Balance from './screens/Balance';
import OtpVerification from './screens/OtpVerification';
import Disable2FA from './screens/Disable2FA';
import NewSubTaskScreen from './screens/NewSubTaskScreen';
import ViewTaskScreen from './screens/ViewTaskScreen';
import StripeScreen from './screens/StripeScreen';
const Stack = createStackNavigator();

function App() {
  useEffect(() => {
    // SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <UserIdProvider>
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
        {/* <Stack.Screen name="Home" component={Home} 
        options={{
          headerShown: false
        }}
       /> */}

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
         options={{
          headerShown: false
        }}
        />
        
        <Stack.Screen name="NewTaskScreen" component={NewTaskScreen} 
         options={{
          headerShown: false
        }}
        />
          <Stack.Screen name="DoneTask" component={DoneTask} 
        //  options={{
        //   headerShown: false
        // }}
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
        <Stack.Screen name="ChatScreen" component={ChatScreen}
        options={{
          headerShown: false
        }} 
        
         />
             <Stack.Screen name="ViewAllScreen" component={ViewAllScreen}
        // options={{
        //   headerShown: false
        // }} 
        /> 
         <Stack.Screen name="AllTaskScreen" component={AllTaskScreen}
        options={{
          headerShown: false
        }} 
        /> 
       
        <Stack.Screen name="TaskDetailScreen" component={TaskDetailScreen}
        options={{
          headerShown: false
        }} 
        /> 
        
        <Stack.Screen name="SearchScreen" component={SearchScreen}
        options={{
          headerShown: false
        }} 
        /> 

<Stack.Screen name="TwoFactorAuthentication" component={TwoFactorAuthentication}
        options={{
          headerShown: false
        }} 
        /> 
        <Stack.Screen name="UserScreen" component={UserScreen}
        // options={{
        //   headerShown: false
        // }} 
        /> 
        <Stack.Screen name="StepScreen" component={StepScreen}
        options={{
          headerShown: false
        }} 
        /> 
          <Stack.Screen name="TwoFactorVerification" component={TwoFactorVerification}
        // options={{
        //   headerShown: false
        // }} 
      
        /> 
         <Stack.Screen name="BackupScreen" component={BackupScreen}
        options={{
          headerShown: false
        }} 
        />
        {/* <Stack.Screen name="BottomTabs" component={BottomTabs}
        options={{
          headerShown: false
      }}
/> */}
<Stack.Screen name="HomeTabs" component={HomeTabs} 
        options={{
          headerShown: false
        }}
       />
       <Stack.Screen name="FinishScreen" component={FinishScreen}
        options={{
          headerShown: false
        }} 
        /> 
        <Stack.Screen name="PaymentScreen" component={PaymentScreen}
        options={{
          headerShown: false
        }} 
        
      
        /> 
         <Stack.Screen name="Balance" component={Balance}
        options={{
          headerShown: false
        }} 

         
        
      
        /> 
        <Stack.Screen name="ConversationScreen" component={ConversationScreen}
        // options={{
        //   headerShown: false
        // }}
         />

<Stack.Screen name="2FAAuthVerification" component={OtpVerification}
        // options={{
        //   headerShown: false
        // }}
         />

<Stack.Screen name="Disable2FA" component={Disable2FA}
        // options={{
        //   headerShown: false
        // }}
         />

<Stack.Screen name="NewSubTask" component={NewSubTaskScreen}
        // options={{
        //   headerShown: false
        // }}
         />
         <Stack.Screen name="ViewTaskScreen" component={ViewTaskScreen}
        options={{
          headerShown: false
        }}
         />
          <Stack.Screen name="StripeScreen" component={StripeScreen}
        options={{
          headerShown: false
        }}
         />

             </Stack.Navigator>
           
    </NavigationContainer>
    </UserIdProvider>
    </Provider>
  );
}


export default App;
