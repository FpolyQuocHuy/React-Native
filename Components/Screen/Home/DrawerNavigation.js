import { StatusBar } from 'expo-status-bar';
import React, { useRef, useState } from 'react';
import { Animated, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View ,Alert} from 'react-native';
import ListProduct from './ListProduct'
// Tab ICons...
import home from '../../../assets/home.png';
import search from '../../../assets/search.png';
import notifications from '../../../assets/bell.png';
import settings from '../../../assets/settings.png';
import logout from '../../../assets/logout.png';

import profile from '../../../assets/profile.png'
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
export default function DrawerNavigation() {

    const [currentTab, setCurrentTab] = useState("Home");
    // To get the curretn Status of menu ...
    const [showMenu, setShowMenu] = useState(false);
    // Animated Properties...
    const offsetValue = useRef(new Animated.Value(0)).current;
    // Scale Intially must be One...
    const scaleValue = useRef(new Animated.Value(1)).current;
    const closeButtonOffset = useRef(new Animated.Value(0)).current;
    const [seatch, setseatch] = useState("")
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.imageBanner}>
                <Image source={profile} style={styles.imgBanner}></Image>

                <Text style={styles.nameUser}>Hoàng Quốc Huy</Text>

                <TouchableOpacity>
                    <Text style={styles.viewProfile}>View Profile</Text>
                </TouchableOpacity>

                <View style={{ flexGrow: 1, marginTop: 50 }}>
                    {TabButton(currentTab, setCurrentTab, "Home", home)}
                    {TabButton(currentTab, setCurrentTab, "Search", search)}
                    {TabButton(currentTab, setCurrentTab, "Notifications", notifications)}
                    {TabButton(currentTab, setCurrentTab, "Settings", settings)}
                    <View style={{marginTop:180}}></View>
                    {TabButton(currentTab, setCurrentTab, "LogOut", logout)}
                </View>

                

            </View>

            {
                // Over lay View...
            }

            <Animated.View style={[styles.animated, {
                borderRadius: showMenu ? 15 : 0,
                // Transforming View...
                transform: [
                    { scale: scaleValue },
                    { translateX: offsetValue }
                ]
            }]}>


                <Animated.View style={{
                    transform: [{
                        translateY: closeButtonOffset
                    }]
                }}>
                    <TouchableOpacity onPress={() => {

                        Animated.timing(scaleValue, {
                            toValue: showMenu ? 1 : 0.88,
                            duration: 300,
                            useNativeDriver: true
                        }).start()

                        Animated.timing(offsetValue, {
                            // YOur Random Value...
                            toValue: showMenu ? 0 : 230,
                            duration: 300,
                            useNativeDriver: true
                        }).start()

                        Animated.timing(closeButtonOffset, {
                            // YOur Random Value...
                            toValue: !showMenu ? -30 : 0,
                            duration: 300,
                            useNativeDriver: true
                        }).start()

                        setShowMenu(!showMenu);

                    }}>

                        <View style={styles.icon_options}>
                            
                            <View></View>
                            <Text style={styles.title}>Danh Sách Sản Phẩm</Text>
                            <FontAwesome name="user-circle-o" size={30} color="black" />
                        </View>
                        <View style={styles.line_height}></View>
                    </TouchableOpacity>
                    <View style={{marginBottom:80}}>
                        <ListProduct />
                    </View>
                </Animated.View>
            </Animated.View>

        </SafeAreaView>
    );
}

// For multiple Buttons...
const TabButton = (currentTab, setCurrentTab, title, image) => {
    const navigation = useNavigation();
    return (

        <TouchableOpacity onPress={() => {
            if (title == "LogOut") {
                Alert.alert('Sign Out', 'Do you want to sign out?', [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () =>navigation.navigate("Login")},
                  ]);
                

            } else {
                setCurrentTab(title)
            }
        }}>

            <View style={[styles.ItemTab, { backgroundColor: currentTab == title ? 'white' : 'transparent' }]}>

                <Image source={image} style={{
                    width: 25, height: 25,
                    tintColor: currentTab == title ? "#5359D1" : "white"
                }}></Image>

                <Text style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    paddingLeft: 15,
                    color: currentTab == title ? "#5359D1" : "white"
                }}>{title}</Text>

            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5359D1',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    imageBanner: {
        justifyContent: 'flex-start',
        padding: 15
    },
    imgBanner: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginTop: 8
    },
    nameUser: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        marginTop: 20
    },
    viewProfile: {
        marginTop: 6,
        color: 'white'
    },
    animated: {
        flexGrow: 1,
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 5,
        paddingVertical: 20,

    },
    icon_options: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        height: 40,
        tintColor: 'black',
        borderRadius: 20,
        justifyContent: "space-between"
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
    },


    line_height: {
        borderWidth: 2,
        borderColor: "red",
        opacity: 0.5,

    },
    titleTab: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        paddingTop: 20
    },
    ItemTab: {
        flexDirection: "row",
        alignItems: 'center',
        paddingVertical: 8,
        paddingLeft: 13,
        paddingRight: 35,
        borderRadius: 8,
        marginTop: 15
    }
});