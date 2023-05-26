import React, { useState } from 'react';
import {
    View, TextInput, Button,
    StyleSheet, Text, TouchableOpacity,
    alert, Alert, ImageBackground
} from 'react-native';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // const navigation = useNavigation();
    const handleLogin = () => {
        // navigation.navigate('Home');

        if (email.length == 0 || password.length == 0) {
            Alert.alert("Please enter full information");
        } else if (password.length <= 5) {
            Alert.alert("Mật khẩu phải lớn hơn 5 kí tự");
        } else if (reg.test(email) === false) {
            Alert.alert("Sai định dạng Email");
        }  else {
           SignIn();
        }

    };
    const goToRegister = () => {
        navigation.navigate("Register");
    }
    const SignIn = async() => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
               
                if(email == user.email) {
                    navigation.navigate('Home');
                }else {
                    Alert.alert("Email không đúng");

                }

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });

    }
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../../../assets/background.jpeg')} style={{ width: "100%", height: "100%" }}>
                <View style={{ marginTop: 150 }}></View>
                <View style={styles.containerInput}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={false}
                        placeholder="Input your Email"
                        onChangeText={(text) =>
                            setEmail(text)
                        }
                        textContentType="emailAddress"
                        keyboardType='email-address'
                        value={email}
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
                <TouchableOpacity style={styles.vBtn}>
                    <Button title="Login" onPress={
                        handleLogin
                    } color="white" />
                </TouchableOpacity>
                <View style={styles.containerFooter} >
                    <Text style={styles.txtFooter}>Want to register new account?</Text>
                    <TouchableOpacity onPress={goToRegister}>
                        <Text style={[styles.txtLine, styles.txtFooter]} >Register</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        width: "80%",
        height: 44,
        padding: 10,
        borderWidth: 2,
        borderColor: 'green',
        borderRadius: 20,
        marginBottom: 10,
        color: "white"
    },

    containerInput: {
        width: "100%",
        alignItems: "center",
    },
    label: {
        justifyContent:"flex-start",
        width:"100%",
        marginBottom: 10,
        marginTop: 20,
        color: "red",
        fontWeight: "600",
        marginLeft:100
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

export default LoginScreen;