import { StyleSheet, Text, View,
   ActivityIndicator, FlatList,  RefreshControl } from 'react-native'
import { React, useState, useEffect } from 'react'
import ItemListProducts from './itemListProducts'
import { db } from '../../Config'
import { ref, onValue } from 'firebase/database';


const ListProduct = (item) => {
  const [data, setdata] = useState([]);
  const [isLoading, setisloading] = useState(true);

  const getData = () => {


    const dbRef = ref(db, "Products");
    onValue(
        dbRef, (snapshot) => {
            const item = snapshot.val();
            {
                item && setdata (Object.values(item));
                setisloading(false);
            }
        },
        {
            onlyOnce: true,
        }
    );
      
     
  
  };


  useEffect(() => {
    getData();
    setisloading(false);

  }, []);
  const onRefresh = () => {
    setdata([]);
    getData();
  }

  if (data != null) {

    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: "700", color: "black", alignItems: "center", fontSize: 20, marginLeft: 10 }}>Danh Sách Sản Phẩm</Text>
        <View style={{ width: "100%", height: "100%" }}>

          {isLoading ? <ActivityIndicator /> : (

            <FlatList
              data={data}

              renderItem={({ item }) => (
                <ItemListProducts data={item} />
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



      </View>

    )
  }
}

export default ListProduct

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    marginBottom: 80,
  }
})