import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { register } from '../../actions/auth'
 
const Register = props => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const dispatch = useDispatch()
    const error = useSelector(state => state.auth.registerError)
  
    console.log(error)
  
    return (
      <View style={styles.container}>
  
        
        {error
        ?<View style={styles.errorView}>
             <Text>{error}</Text>
        </View>
        :<Text></Text>
        }
  
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
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)}
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
    
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Confirm password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password2) => setPassword2(password2)}
          />
        </View>
    
        <Pressable onPress={() => dispatch(register(username, password, password2, email))} style={styles.loginBtn}>
          <Text style={styles.loginText}>Register</Text>
        </Pressable>
  
        <TouchableOpacity  onPress={() => props.navigation.navigate('Login')}>
          <Text style={styles.forgot_button}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    );
}

export default Register

const styles = StyleSheet.create({
  container: {
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