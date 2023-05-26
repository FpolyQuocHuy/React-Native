import {
    StyleSheet, Text, View,
    SafeAreaView, TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    TouchableWithoutFeedback ,
    Image,
} from 'react-native'
import React, { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";
import { db } from '../../Config'
import { ref, get, set } from 'firebase/database'
import * as ImagePicker from 'expo-image-picker';
import { useRoute } from '@react-navigation/native';




const EditProductScreen = ({navigation}) => {

    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    function addProduct() {
        set(ref(db, 'Products/' + id), {
            id: id,
            title: title,
            price: price,
            discount: discount,
            quantity: quantity,
            description: description,
            image: image
        }).then(() => {
           alert("Đã sửa sản phẩm.")
        }).catch((e) => {
            alert(e)
        });
    };
    const route = useRoute();
    const setData = () => {

        setId(route.params.id);
        setTitle(route.params.title);
        setPrice(route.params.price);
        setDiscount(route.params.discount);
        setQuantity(route.params.quantity);
        setDescription(route.params.description);
        setImage(route.params.image);
    }
    useEffect(() => {
      

          setData();
      
    }, [])
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            path: 'image',
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            const uri = result.assets[0].uri;
            setImage(uri);
            console.log("Image : " + image);
        }

    };


    return (
        <KeyboardAvoidingView style={styles.conntainer}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            
        >
            {route.params && route.params.title &&
                <View>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                        <View style={{ width: "100%", alignItems: "center" }}>
                            <Text style={styles.title_add}>Edit Product</Text>
                            <TouchableOpacity style={styles.container_add_new} onPress={pickImage}>
                                <View style={styles.wrap_add_img}>
                                    {image ? <Image source={{uri: image}} style={{height:80, width:80, borderRadius:10}}/> : <Ionicons name="camera" size={50} color="black" />}
                                </View>
                            </TouchableOpacity>
                            
                            <View style={styles.wrap_input}>
                                <Text style={styles.title_input}>Title Product</Text>
                                <View style={styles.input}>
                                    <TextInput placeholder='input title product' style={{ width: "100%" }}
                                        onChangeText={(text) => setTitle(text)} value={title}

                                    />
                                </View>
                            </View>

                            <View style={styles.wrap_input}>
                                <Text style={styles.title_input}>Price</Text>
                                <View style={styles.input}>
                                    <TextInput placeholder='input Price product' keyboardType='number-pad' style={{ width: "100%" }}
                                        onChangeText={(text) => setPrice(text)} value={price}

                                    />
                                </View>
                            </View>
                            <View style={styles.wrap_input}>
                                <Text style={styles.title_input}>Discount</Text>
                                <View style={styles.input}>
                                    <TextInput placeholder='input discount' keyboardType='number-pad' style={{ width: "100%" }}
                                        onChangeText={(text) => setDiscount(text)} value={discount}

                                    />
                                </View>
                            </View>
                            <View style={styles.wrap_input}>
                                <Text style={styles.title_input}>quantity</Text>
                                <View style={styles.input}>
                                    <TextInput placeholder='input quantity' keyboardType='number-pad' style={{ width: "100%" }}
                                        onChangeText={(text) => setQuantity(text)} value={quantity}

                                    />
                                </View>
                            </View>
                            <View style={styles.wrap_input}>
                                <Text style={styles.title_input}>Description</Text>
                                <View style={styles.input}>
                                    <TextInput placeholder='input Descriptio'
                                        editable
                                        multiline
                                        numberOfLines={4}
                                        maxLength={40}
                                        style={{ width: "100%" }}
                                        onChangeText={(text) => setDescription(text)} value={description}

                                    />
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => {
                                    addProduct( title, price, discount, quantity, description)
                                }
                                }>
                                <LinearGradient
                                    colors={["yellow", "green", "gray"]}
                                    style={styles.wrap_btn}
                                >
                                    <Text style={{ fontSize: 18, color: "red", opacity: 0.6, fontWeight: "600" }}>
                                       Submit
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                    </TouchableWithoutFeedback>
                </View>
            }
           

        </KeyboardAvoidingView>
    )
}

export default EditProductScreen

const styles = StyleSheet.create({
    conntainer: {
        flex: 1,
    },
    title_add: {
        fontSize: 20,
        color: "green",
        marginTop: 20,
        fontWeight: "700",
    },
    container_add_new: {
        width: 80,
        height: 80
    },
    wrap_add_img: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "red",
        marginHorizontal: 30,
        borderRadius: 30,
    },
    wrap_input: {
        width: "100%",
        alignItems: "center",
    },
    title_input: {
        width: "75%",
        alignItems: "flex-start",
        marginBottom: 5,
        fontWeight: "700",
        color: "#C688EB",
        marginTop: 10,
        fontSize: 16
    },
    input: {
        borderWidth: 2,
        borderRadius: 20,
        borderColor: "black",
        padding: 10,
        paddingHorizontal: 10,
        width: "80%",
        alignItems: "flex-start"
    },
    wrap_btn: {
        width: 200, height: 45,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        borderRadius: 20
    }

})