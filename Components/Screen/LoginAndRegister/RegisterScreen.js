import React, { useState } from 'react';
import {
  View, TextInput, Button,
  StyleSheet, Text, TouchableOpacity,
  alert, Alert, ImageBackground ,TouchableWithoutFeedback, Keyboard, ToastAndroid
} from 'react-native';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setemail] = useState('');
  const [cfPass, setcfPass] = useState('');
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const RegisterAcc = async(email,password,username) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password )
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        ToastAndroid.show("Register succesfully" , ToastAndroid.SHORT);
        navigation.navigate("Home");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

  }
 
  const handleLogin = () => {
    if (username.length == 0 || password.length == 0 || email.length == 0 || cfPass.length == 0) {
      Alert.alert("Please enter full information");
    }else if(reg.test(email ) === false) {
      Alert.alert("Sai định dạng Email");
    } else {
     
      if (password.length <= 5) {
        Alert.alert("Mật khẩu phải lớn hơn 5 kí tự");
      } else if (username.length <= 9) {
        Alert.alert("Tài khoản phải lớn hơn 9 kí tự");
      }else if(password != cfPass) {
        Alert.alert("Xác nhận mật khẩu sai");
      } 
      else {
        RegisterAcc(email, password , username);
        // navigation.navigate("Login")
      }
    }

  };
const goToLogin = () => {
  navigation.navigate("Login")
  
}
  return (
    <TouchableWithoutFeedback style={styles.container}  >
      <ImageBackground source={require('../../../assets/background.jpeg')} style={{ width: "100%", height: "100%" }} >
        <View style={{ marginTop: 80 }}></View>
        <View style={styles.containerInput}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="example123@gmail.com"
            secureTextEntry={false}
            textContentType="emailAddress"
            keyboardType='email-address'
            onChangeText={(text) =>
              setemail(text)
            }
            value={email}
            placeholderTextColor="white"
          />
        </View>

        <View style={styles.containerInput}>
          <Text style={styles.label}>UserName</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={false}
            placeholder="Input your UserName"
            onChangeText={(text) =>
              setUsername(text)
            }
            value={username}
            placeholderTextColor="white"
          />
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.label}>Password</Text>

          <TextInput
            style={styles.input}
            placeholder="Input your Password"
            secureTextEntry={true}
            onChangeText={(text) =>
              setPassword(text)
            }
            value={password}
            placeholderTextColor="white"

          />
        </View>
        <View style={styles.containerInput}>
          <Text style={styles.label}>Confirm </Text>

          <TextInput
            style={styles.input}
            placeholder="Confirm  your Password"
            secureTextEntry={true}
            onChangeText={(text) =>
              setcfPass(text)
            }
            value={cfPass}
            placeholderTextColor="white"

          />
        </View>
        <TouchableOpacity style={styles.vBtn}>
          <Button title="Register" onPress={
            handleLogin
          } color="white" />
        </TouchableOpacity>
        <View style={styles.containerFooter} >
          <Text style={styles.txtFooter}>If you have a account</Text>
          <Text style={[styles.txtLine, styles.txtFooter]} onPress={goToLogin}>Login</Text>

        </View>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {

    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    color:"white",
    width: "80%",
    height: 44,
    padding: 10,
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 20,
    marginBottom: 10,
  },

  containerInput: {
    width: "100%",
    alignItems: "center",
  },
  label: {
    right: 120,
    marginBottom: 10,
    marginTop: 20,
    color: "red",
    fontWeight: "600"
  },
  vBtn: {
    width: "80%",
    height: 40,
    backgroundColor: "green",
    borderRadius: 20,
    marginTop: 30,
    marginLeft: 50,


  },

  containerFooter: {
    width: "100%",


  },
  txtFooter: {
    alignSelf: 'center',
    color: "white",
    marginTop: 10,

  },
  txtLine: {
    textDecorationLine: 'underline',
  }
});

export default RegisterScreen;