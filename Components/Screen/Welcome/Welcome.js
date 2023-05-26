import { Text, View, Image, ImageBackground } from 'react-native'
import React, { Component, useState, useEffect } from 'react'
import { icons} from '../../../Constants/index'
import styles from './styles'
import UIButton from './UIButton'
import {images} from '../../../Constants/index'

const Welcome = ({navigation}) => {
    const [accountType, setAccountType] = useState([{
        name: "influenser",
        isSelected: true
    }, {
        name: "Business",
        isSelected: false
    }, {
        name: "Individual",
        isSelected: false
    }]);

    const setLogin = () => {
        setAccountType(accountType.map(eachAccountType => {
            return {
                ...eachAccountType,
                isSelected: eachAccountType.name == accountType.name


            }
        }));
    }
    const toLogin = () => {
        navigation.navigate("Login")
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={images.background} resizeMode="cover" style={{width:"100%" , height:"100%"}} >
                <View style={styles.containerlogo}>
                    <View style={{ flexDirection: "row" }}>
                        <Image source={icons.icon_fire} style={{ height: 30, width: 30 }}></Image>
                        <Text style={styles.txtLogo}>yourcompony.co</Text>
                    </View>
                    <View>
                        <Image source={icons.icon_question} style={{ height: 30, width: 30, tintColor: "white" }}></Image>
                    </View>
                </View>
                <View style={styles.containerHeader} >
                    <Text style={styles.txtHeader}>Welcome to</Text>
                    <Text style={[styles.txtHeader, styles.txtHeaderChild2]}>YOURCOMPONY.CO!</Text>
                    <Text style={styles.txtHeader}> Please select your account type</Text>

                </View>
                <View style={styles.containerBody} >
                    {accountType.map(accountType =>
                        <UIButton onPress={() => {
                            setLogin();
                        }}
                            isSelected={accountType.isSelected}
                            title={accountType.name}
                        />

                    )}

                </View>
                <View style={styles.containerFooter} >
                    <UIButton title={'login'.toUpperCase()} onPress={toLogin}/>
                    <Text style={styles.txtFooter}>Want to register new account?</Text>
                    <Text style={[styles.txtLine, styles.txtFooter]}>Register</Text>

                </View>
            </ImageBackground>
        </View>
    )

}

export default Welcome