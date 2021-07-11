import React from "react";
import {Text} from 'react-native';
import 'react-native-gesture-handler';
import {useSelector} from 'react-redux'

import Login from './../accounts/Login';

const ProfileScreen = () => {
    // isAuthenticated should be populated as soon as the app loads in App.js
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  
    if (isAuthenticated) {
      return (
        <Text>Profile Screen</Text>
      )
    } else {
        return (
            <Login />
        );
    }
}

export default ProfileScreen;