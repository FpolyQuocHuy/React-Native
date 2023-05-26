import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';



const ItemListNew = (item) => {
  const { data } = item;
  const navigation = useNavigation();
  const title = data.title;
  const price = data.price;
  const description = data.description;
  const category = data.category;
  const quantity = data.quantity;
  const discount = data.discount;
  const image = data.image;
  const id = data.id;

  const onPress = () => {
    navigation.navigate("Detail", { title, giaGiam, description, category, quantity, discount, id,image });

  }
  let percent = price * (discount / 100);
  const giaGiam = price - percent;
  
//   function currencyFormat(number) {
//     return `` + number.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
//  }
//  console.log(currencyFormat(price)); // $2,665. 

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={{ width: "100%", height: "30%", justifyContent: "center", alignItems: "center", marginBottom: 10 }}>
        <Image source={{uri: data.image}} style={{ height: 80, width: "100%", borderRadius: 10 }} resizeMethod="cover" />
      </View>
      <View style={styles.containerItem}>
        <Text style={styles.TitleItem}>{data.title}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {percent > 0 &&
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "row", color: "red" }}>
                <Text style={styles.PriceItem}>{data.price}</Text>
                <View style={{ width: 70, borderWidth: 1, borderColor: "red", height: 1, position: "absolute", top: 8 }}></View>
                <Text style={{ fontSize: 12 }}>đ</Text>
              </View>
              <Text style={styles.discountItem}>{giaGiam}</Text>
              <Text style={{ fontSize: 12 }}>đ</Text>

            </View>
          }
          {percent == 0 &&
            <View>
              <View style={{ flexDirection: "row", color: "red" }}>
                <Text style={styles.PriceItem}>{data.price}</Text>
                <Text style={{ fontSize: 12 }}>đ</Text>
              </View>
            </View>
          }



        </View>
        <Text style={styles.DescreptionItem}>{data.category}</Text>
        <Text style={styles.descItem}>{data.description}</Text>

      </View>
      <View style={{
        height: 35, width: 35, backgroundColor: "red", borderRadius: 20, justifyContent: "center", alignItems: "center",
        position: "absolute", right: 7, top: 5, opacity: 0.8
      }}>
        <Text style={{ color: "white" }}>{data.discount}%</Text>
      </View>
    </TouchableOpacity>
  )
}

export default ItemListNew

const styles = StyleSheet.create({
  container: {
    width: "45%",
    height: 200,
    margin: 5,
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",

  },
  containerItem: {
    width: "100%",
    height: "50%",
    justifyContent: "center",

  },
  TitleItem: {
    fontSize: 14,
    marginTop: 10,
    fontWeight: "600",
    color: "black",
    width: "100%",
  },
  PriceItem: {
    color: "green",
    fontSize: 14,
  },
  DescreptionItem: {
    fontSize: 12,
  },
  containerIcon: {
    width: "20%",
  },
  discountItem: {
    marginLeft: 10,
    color: "green"
  }

})