import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeTabs from './HomeTabs';

const Stack = createStackNavigator();

function BottomTabs() {
  useEffect(() => {
    // SplashScreen.hide();
  }, []);

return (
    <Provider store={store}>

    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
<Stack.Screen name="HomeTabs" component={HomeTabs}
options={{
  headerShown: false
}}
/>
     </Stack.Navigator>
   
</NavigationContainer>
</Provider>
)}
export default BottomTabs;