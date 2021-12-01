import React from "react";
import {Text} from 'react-native';
import 'react-native-gesture-handler';
import {useSelector} from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack';

import Login from './../accounts/Login';
import Register from './../accounts/Register';

const ProfileStack = createStackNavigator();

const ProfileScreen = () => {
    // isAuthenticated should be populated as soon as the app loads in App.js
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  
    if (isAuthenticated) {
      return (
        <Text>Profile Screen</Text>
      )
    } else {
      return (
        <ProfileStack.Navigator >
            <ProfileStack.Screen 
                options={{ headerShown: false }}
                name="Login" 
                component={Login}
            />
            <ProfileStack.Screen 
                options={{ headerShown: false }}
                name="Register" 
                component={Register}
            />
        </ProfileStack.Navigator>
      )
    }
}

export default ProfileScreen;