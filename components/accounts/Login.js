import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { constructErrorMessage } from './../../actions/messages';


import { login } from '../../actions/auth'
 
const Login = props => {
  // This is just component-specific state, we don't need redux when getting user input for username/password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const errors = useSelector(state => state.auth.loginError)

  return (
    <View style={styles.container}>
      <View style={styles.errorContainer}>
        <FlatList
          data={errors}
          renderItem={({ item }) => (
            <Text style={styles.errorText}>{constructErrorMessage(item)}</Text>
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
    
        <TouchableOpacity style={styles.forgot_button}>
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
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  errorText: {
    color: 'red'
  },

  inputContainer: {
    flex: 5
  },
 
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: 'center'
  },
 
  loginBtn: {
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },

  forgot_button: {
    justifyContent: 'center',
    alignItems: "center",
  }
});