import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Home from '../screens/Home';
import NewTaskScreen from '../screens/NewTaskScreen';
import SearchScreen from '../screens/SearchScreen';
import ChatScreen from '../screens/ChatScreen';
import Settings from '../screens/Settings';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      tabBarPosition='bottom' 
      screenOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
        labelStyle: { display: 'none' }, 
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{ 
          tabBarLabel: '', // Empty string to remove the title
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="home" color={'#6146C6'} size={25} />
          ),
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" color={'#6146C6'} size={25} />
          ),
        }}
      />
      <Tab.Screen 
        name="Plus" 
        component={NewTaskScreen} 
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="plussquare" color={'#6146C6'} size={25} />
          ),
        }}
      />
      <Tab.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="chat" color={'#6146C6'} size={23} />
          ),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={Settings} 
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ color, size }) => (
            <Fontisto name="player-settings" color={'#6146C6'} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
