import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { db } from '../../Config'
import { ref, remove  } from 'firebase/database';
import { MaterialIcons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';



const ItemListProducts = (props) => {
    const { data } = props;
const navigation = useNavigation();

 
  
const onPress = () => {
    if(data != null) {
     const title = data.title;
     const price = data.price;
     const description = data.description;
     const category = data.category;
     const quantity = data.quantity;
     const discount = data.discount;
     const image = data.image;
     const id = data.id;
     navigation.navigate("EditProduct" , {title , price,description,category,quantity,discount,id , image});
     }

}
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <View style={styles.container_img}>
               {data.image && <Image source={{uri : data.image}}  style={{ width: "100%", height: "100%" , borderRadius:10 }} />}
            </View>
            <View style={styles.container_prd} >
                {data && data.title && <Text style={styles.title}>{data.title}</Text>}
                {data && data.description && <Text style={styles.desc}>{data.description}</Text>}
                <View style={{ flexDirection: "row" }} >
                    {data && data.price && <Text style={styles.price}>{data.price}</Text>}
                    <Text > vnd</Text>
                </View>
                <View style={{ flexDirection: "row" }} >
                    <Text style={styles.quantti}>Số lượng :</Text>
                    {data && data.quantity && <Text style={styles.title}>{data.quantity}</Text>}


                </View>

            </View>
            <TouchableOpacity style={styles.container_icon} onPress={() => {
                 remove(ref(db, 'Products/' + data.id));
                alert("Đã xóa")
}}>
            <MaterialIcons name="delete" size={24} color="black" />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default ItemListProducts

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        width: "90%",
        marginHorizontal:20,
        height: 120,
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "black",
        justifyContent: "space-between",
        borderRadius:10
    },
    title: {
        fontWeight: "700"
    },
    container_img: {
        width: 80,
        height: 80,
        marginHorizontal:6
    },
    container_prd: {
        marginLeft: 10,
        width:"60%",
        justifyContent:"flex-start",

    },
    desc : {
        fontSize:14,
        width:"100%",
        height:50,
        flexWrap:"wrap",
    },
    price: {
        color: "green",
    },
    quantti: {
        color: "red"
    },
    container_icon : {
        width:45 ,
        height:"100%",
        alignItems:"center",
        justifyContent:"center"
    }
})