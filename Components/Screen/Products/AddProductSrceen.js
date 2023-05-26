import {
    StyleSheet, Text, View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    Platform,
    TouchableWithoutFeedback,
    SafeAreaView,
    Image,
    ScrollView

} from 'react-native'
import React, { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";
import { db } from '../../Config'
import { ref, set } from 'firebase/database'
import uuid from 'react-native-uuid';
import * as ImagePicker from 'expo-image-picker';
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { mStorage, convertUriToBlob } from '../../Config';
// import storage from '@react-native-firebase/storage';


const AddProductSreen = ({ navigation }) => {
    const uid = uuid.v4();
    const [id, setId] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImagePicker] = useState(null);
    const [uploading, setUploading] = useState(false);
    

    // const UploadImage = async () => {
    //     if (imagePicker == null) {
    //         return null;
    //     }
    //     const blob = await convertUriToBlob(imagePicker);
    //     const id = Date.now();

    //     const storageRef = mStorage.ref();
    //     const mountainImagesRef = storageRef(mStorage, "images/ " + id + ".png");
    //     try {
    //         const up = await uploadBytes(mountainImagesRef, blob);
    //         console.log("Uploaded a blob or file!");
    //         const url = await getDownloadURL(mountainImagesRef);
    //         console.log("Geted url image !" + url);
    //         const task = storageRef.putFile(url);
    //         task.on('state_changed', (taskSnapshot) => {
    //             console.log(
    //                 `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
    //             );
    //         });

    //         addProduct(id, title, price, discount, quantity, description, url);
    //         setImagePicker(null);
    //         setUploading(false);
    //     } catch (error) {
    //         console.log("Lỗi: " + error);
    //         setUploading(false);
    //         alert("Thêm sản phẩm thất bại!");
    //     }


    // };

    //get Image from galery
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
            setImagePicker(uri);
            console.log("Image : " + image);
        }

    };

    //add prroduct
    function addProduct() {
        if(title.length == 0 || description.length == 0) {
            alert("Vui lòng nhập đầy đủ thông tin sản phẩm.");
        }else {
            set(ref(db, 'Products/' + uid), {
            id: uid,
            title: title,
            price: price,
            discount: discount,
            quantity: quantity,
            description: description,
            image: image
        }).then(() => {

            navigation.navigate("HomeTab");
        }).catch((e) => {
            alert(e)
        });
        }
        
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <KeyboardAvoidingView style={styles.conntainer}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >

                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                        <View style={{ width: "100%", alignItems: "center" }}>
                            <Text style={styles.title_add}>Add Product</Text>
                            <TouchableOpacity style={styles.container_add_new} onPress={pickImage}>
                                <View style={styles.wrap_add_img}>
                                    {image ? <Image source={{ uri: image }} style={{ width: 80, height: 80, borderRadius:10 }} />
                                        : <Ionicons name="camera" size={80} color="black" />}
                                </View>

                                {/* <Image source={require('../../../assets/naturo1.jpg')} style={{width:200 , height:200}}></Image> */}

                            </TouchableOpacity>

                            <View style={styles.wrap_input}>
                                <Text style={styles.title_input}>Title Product</Text>
                                <View style={styles.input}>
                                    <TextInput placeholder='input title product' style={{ width: "100%" }}
                                        onChangeText={(text) => setTitle(text)} value={title} clearButtonMode={true}
                                    />
                                </View>
                            </View>

                            <View style={styles.wrap_input}>
                                <Text style={styles.title_input}>Price</Text>
                                <View style={styles.input}>
                                    <TextInput placeholder='input Price product' keyboardType='number-pad' style={{ width: "100%" }}
                                        onChangeText={(text) => setPrice(text)} value={price} clearButtonMode={true}

                                    />
                                </View>
                            </View>
                            <View style={styles.wrap_input}>
                                <Text style={styles.title_input}>Discount</Text>
                                <View style={styles.input}>
                                    <TextInput placeholder='input discount' keyboardType='number-pad' style={{ width: "100%" }}
                                        onChangeText={(text) => setDiscount(text)} value={discount} clearButtonMode={true}
                                        maxLength={2}
                                    />
                                </View>
                            </View>
                            <View style={styles.wrap_input}>
                                <Text style={styles.title_input}>quantity</Text>
                                <View style={styles.input}>
                                    <TextInput placeholder='input quantity' keyboardType='number-pad' style={{ width: "100%" }}
                                        onChangeText={(text) => setQuantity(text)} value={quantity} clearButtonMode={true}
                                        contextMenuHidden={false}
                                    />
                                </View>
                            </View>
                            <View style={styles.wrap_input}>
                                <Text style={styles.title_input}>Description</Text>
                                <View style={styles.input}>
                                    <TextInput placeholder='input Description'
                                        clearButtonMode={true}
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
                                    addProduct(id, title, price, discount, quantity, description , image);
                                    // UploadImage();
                                    // submitPost;
                                }
                                }>
                                <LinearGradient
                                    colors={["yellow", "green", "gray"]}
                                    style={styles.wrap_btn}
                                >
                                    <Text style={{ fontSize: 18, color: "red", opacity: 0.6, fontWeight: "600" }}>
                                        Add New Product
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                    </TouchableWithoutFeedback>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default AddProductSreen

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
        borderRadius: 30,
        width:"100%",
        height:"100%"
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