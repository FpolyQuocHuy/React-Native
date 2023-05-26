import { FlatList, ActivityIndicator, StyleSheet, Text, View, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import ItemCart from './ItemCart'
import { db } from '../../Config'
import { ref, onValue } from 'firebase/database'



const ListCart = (item) => {
  const [data, setData] = useState([]);
  const [isLoading, setisloading] = useState(true);

  const getDataCart = () => {
    // const dbRef = ref(db);
    // get(child(dbRef, `Cart/`)).then((snapshot) => {
    //   if (snapshot.exists()) {
    //     setData(snapshot.val());
    //     setisloading(false);

    //   } else {
    //     console.log("No data available");
    //   }
    // }).catch((error) => {
    //   console.error(error);
    // }).finally(() => {
    //   setisloading(false);
    // })

    const dbRef = ref(db, "Cart");
    onValue(
        dbRef, (snapshot) => {
            const item = snapshot.val();
            {
                item && setData (Object.values(item));
                setisloading(false);
            }
        },
        {
            onlyOnce: true,
        }
    );

  }
  useEffect(() => {
    getDataCart();
    setisloading(false);
  }, []);

  const onRefresh = () => {
    setData([]);
    getDataCart();
  }


  return (
    <View style={styles.container}>
      <View style={styles.container_title}>
        <Text>Thông Tin Giỏ Hang</Text>
      </View>
      {isLoading ? <ActivityIndicator /> : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ItemCart data={item} />
          )}
          keyExtractor={item = item.id}
          refreshControl={
            <RefreshControl
              isLoading={isLoading}
              onRefresh={onRefresh}
            />
          }

        />
      )}

    </View>
  )
}

export default ListCart

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    
  },
  container_title: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    opacity: 0.7
  }


})