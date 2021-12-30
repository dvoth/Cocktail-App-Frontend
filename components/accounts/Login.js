import React, { useState } from "react";
import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { constructErrorMessage } from './../../actions/messages';
import { styles } from './../../styles/styles';
import {API_URL} from '@env';


import { login } from '../../actions/auth'
 
const Login = props => {
  // This is just component-specific state, we don't need redux when getting user input for username/password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const errors = useSelector(state => state.auth.loginError)

  return (
    <View style={styles.loginContainer}>
      <View style={styles.loginErrorContainer}>
        <FlatList
          data={errors}
          renderItem={({ item }) => (
            <Text style={styles.loginErrorText}>{constructErrorMessage(item)}</Text>
          )}/>
      </View>
      <View style={styles.inputContainer}>  
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Username"
            placeholderTextColor="#003f5c"
            onChangeText={(username) => setUsername(username)}
          />
        </View>
    
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
    
        <TouchableOpacity style={styles.forgot_button} onPress={ ()=>{ Linking.openURL(API_URL + '/accounts/password_reset')}}>
          <Text>Forgot Password?</Text>
        </TouchableOpacity>
    
        <Pressable onPress={() => dispatch(login(username, password))} style={styles.loginBtn}>
          <Text style={styles.loginText}>Login</Text>
        </Pressable>

        <TouchableOpacity style={styles.forgot_button} onPress={() => props.navigation.navigate('Register')}>
          <Text>Don't have an account? Register Now</Text>
        </TouchableOpacity>
      </View>    
    </View>
  );
}

export default Login
 