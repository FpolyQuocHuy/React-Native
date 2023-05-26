import { StyleSheet, Image, Text, View, TouchableOpacity, Button, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { db } from '../../Config'
import { ref, set, remove } from 'firebase/database'


const ItemCart = (item) => {
  const { data } = item;
  const [count, setCount] = useState(1);
  const [free, setFree] = useState()
  const strCount = count.toString();
  const renderDAta = () => {
    if (data) {
      setFree(data.price);
    }
  }
  useEffect(() => {
    renderDAta();
    setCount(1);
  }, [])

  const onMinus = () => {
    setCount(count - 1);
    let countCr = count - 1;
    setFree(data.price * countCr);


  }
  const onPluss = () => {
    setCount(count + 1);
    let countCr = count + 1;
    setFree(data.price * countCr);

  }
  const onBuy = () => {

    Alert.alert('Xác Nhận Đặt Hàng ', 'Tổng đơn hàng của bạn là : ' + free, [
      {
        text: 'Cancel',

        style: 'cancel',
      },
      {
        text: 'OK', style: 'OK', onPress: () =>
          set(ref(db, 'ListOrder/' + data.id), {
            title: data.title,
            free: free,
            count: count

          }).then(() => {

          }).catch((e) => {
            alert(e)
          })
      }
      ,
    ]);
    onRemove(data.id);
  }

  const onRemove = (id) => {
    remove(ref(db , "Cart/" + id))
    .then(() => {
      
    }).catch((e) => {
      alert("Lỗi" + e)
    })
  }
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image source={{uri : data.image}} style={{ width: "100%", height: "100%", borderRadius: 20 }}></Image>
      </View>
      <View style={{ marginLeft: 20, justifyContent: "center" }}>
        <View>
          {data && data.title && <Text style={{ fontSize: 16, fontWeight: "600", marginBottom: 6 }}>{data.title}</Text>}
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "green", fontWeight: "600", marginVertical: 6 }}>Đơn Giá :</Text>
          <Text style={{ marginLeft: 10 ,marginTop:6 ,fontWeight:"500" }}> {data.price} VND</Text>

        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "green", fontWeight: "600", marginBottom: 6 }}>Số Lượng : </Text>
          <TouchableOpacity onPress={() =>
            onMinus()}>
            <AntDesign name="minussquareo" size={24} color="red" />

          </TouchableOpacity>
          <Text style={{ marginHorizontal: 10, color: "green" , }}>{strCount} </Text>
          <TouchableOpacity style={{}} onPress={onPluss}>
            <AntDesign name="plussquareo" size={24} color="green" />
          </TouchableOpacity>

        </View>
        <View style={{flexDirection:"row"}}>
           <Text style={{fontWeight:"500" , color:"green"}}> Tổng Tiền : </Text>
           <Text style={{fontWeight:"500"}}>  {free} VND</Text>
        </View>
        <View style={{ width: "100%", position:"absolute" ,alignItems: "flex-end" , bottom:-28 , right:-70 , marginTop:10}}>
          <Button title='Đặt Hàng ' onPress={ onBuy}></Button>
        </View>
      </View>
      <TouchableOpacity style={{ position: "absolute", width: 80, height: 80, top: 6, right: 6, justifyContent: "flex-start", alignItems: "flex-end" }}
        onPress={() => {
          Alert.alert('Delete Order', 'Do yout want to delete this order?', [
            {
              text: 'Cancel',

              style: 'cancel',
            },
            { text: 'OK', style: 'OK', onPress: onRemove(data.id) },
          ]);


        }}
      >
        <AntDesign name="closecircleo" size={24} color="red" />
      </TouchableOpacity>

    </View>
  )
}

export default ItemCart

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 20,
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 20,
    width: "95%", 
    height:150,
    alignItems: "center",
    justifyContent: "flex-start",
    marginHorizontal: 10,
    padding: 5,

  },
  image: {
    width: 100,
    height: 100,

  }
})