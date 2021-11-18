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

import { login } from '../../actions/auth'
 
const Login = props => {
  // This is just component-specific state, we don't need redux when getting user input for username/password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  const errors = useSelector(state => state.auth.loginError)

  console.log(errors)

  return (
    <View style={styles.container}>

      
      <View style={styles.errorView}>
        <Text>At least the view works</Text>
        <FlatList
          data={errors}
          renderItem={({ item }) => (
            <Text>Test</Text>
          )}/>
      </View>

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
  
      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
  
      <Pressable onPress={() => dispatch(login(username, password))} style={styles.loginBtn}>
        <Text style={styles.loginText}>Login</Text>
      </Pressable>

      <TouchableOpacity  onPress={() => props.navigation.navigate('Register')}>
        <Text style={styles.forgot_button}>Don't have an account? Register Now</Text>
      </TouchableOpacity>
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

  errorView: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
 
  image: {
    marginBottom: 40,
  },
 
  inputView: {
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});