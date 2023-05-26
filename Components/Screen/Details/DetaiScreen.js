import { View, Text, StyleSheet, Image, Button, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { db } from '../../Config'
import { ref, set  } from 'firebase/database';
const DetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  let title = route.params.title;
  let price = route.params.giaGiam;
  let image = route.params.image;
  let id = route.params.id;
  let count = 1;
  let free  = price * count ;

  const handleBuy = () => {

    set(ref(db, 'Cart/' + id ), {
      id: id,
      title: title,
      price: price,
      free: free,
      count: count,
      image:image
  }).then(() => {
    alert("Đã thêm sản phảm vào giỏ hàng");
    navigation.navigate('HomeTab')
  }).catch((e) => {
      alert(e)
  });    
   

  }
  
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container_header}>
        <TouchableOpacity style={styles.image_back} onPress={() => { navigation.navigate("Home"); }}>
          <AntDesign name="arrowleft" size={40} color="black" />
        </TouchableOpacity>
        <View style={styles.title_page}>
          <Text style={{ color: "red", fontSize: 24, fontWeight: "700", }}>DetailProduct</Text>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.container_img_product}>
          <Image source={{uri: route.params.image}} resizeMode="cover" style={styles.img_product} />
        </View>
        <View style={styles.container_detail_product}>
          <Text style={styles.title_product} >{route.params.title}</Text>
          <Text style={styles.desc_product} >{route.params.description} </Text>
          <View style={styles.container_free}>
            <View style={styles.wrap_text}>
              <Text style={styles.title} >Price :  </Text>
              <Text style={styles.text} >{route.params.giaGiam}</Text>
            </View>
            <View style={styles.wrap_text}>
              <Text style={styles.title} >quantity : </Text>
              <Text style={styles.text} >{route.params.quantity} </Text>
            </View>
          </View>
          <View style={styles.wrap_text}>
            <Text style={styles.title} >Category : </Text>
            <Text style={styles.text} >{route.params.category} </Text>
          </View>


          <View style={styles.wrap_text}>
            <Text style={styles.title} >discount : </Text>
            <Text style={styles.text} >{route.params.discount} </Text>
          </View>
        </View>
      
          <View style={styles.wrap_btn} >
            <Button title='Thêm vào giỏ hàng' onPress={handleBuy} />
            <Feather name="shopping-cart" size={24} color="black" />
          </View>


        
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  container_header: {
    flexDirection: "row",
    height: 50,
    alignItems: "center"
  },
  image_back: {
    marginTop: 10,
    marginHorizontal: 10
  },
  title_page: {
    width: "70%",
    height: 50,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  container_img_product: {
    width: "90%",
    height: 250,
    justifyContent: "center",
    alignItems: "center"
  },
  img_product: {
    width: "90%",
    height: "90%",
    margin: 10,
    borderRadius: 20

  },
  container_detail_product: {
    marginLeft: 10,
    marginHorizontal: 10,
    marginTop: 20,
    width: "90%",
    alignItems: "flex-start",
    marginLeft: 50
  },
  container_free: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  title_product: {
    width: "100%",
    fontSize: 26,
    fontWeight: "bold",
  },
  desc_product: {
    color: "green",
    fontSize: 14,
    fontWeight: "bold"
  },
  wrap_text: {
    flexDirection: "row",
    margin: 5
  },
  title: {
    color: "red",
    fontSize: 18,
    fontWeight: "700",
    opacity: 0.7

  },
  text: {
    fontSize: 16,

  },
  wrap_btn: {
    width: "90%",
    flexDirection: "row",
    height: 80,
    borderRadius: 20,
    marginTop: 100,
    marginHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "red"
  }
})
export default DetailScreen