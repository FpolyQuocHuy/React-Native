import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect, } from 'react'
import ItemProduct from './ItemProduct';
import { TextInput } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';
import { db } from '../../Config'
import { ref, child, get, onValue } from 'firebase/database'
import database from 'firebase/database'

const ListNew = (item) => {
    const [data, setdata] = useState([]);
    const [isLoading, setisloading] = useState(true);
    const [search, setSearch] = useState([]);
    const [filteredDataSource, setFilteredDataSource] = useState([]);

    const getData = () => {

        const dbRef = ref(db, "Products");
        onValue(
            dbRef, (snapshot) => {
                const item = snapshot.val();
                {
                    item && setdata (Object.values(item));
                    item && setFilteredDataSource (Object.values(item));
                    setisloading(false);
                }
            },
            {
                onlyOnce: true,
            }
        );
       
       
    }


    useEffect(() => {
        setisloading(true);
        getData();

    }, []);
    // Filter DATA = [
    const searchFilterFunction = (text) => {

        if (text) {
            const newData = data.filter(function (item) {
                const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setFilteredDataSource(newData);
            setSearch(text);
        } else {

            setFilteredDataSource(data);
            setSearch(text);
        }
    };

    const onRefresh = () => {
        setdata([]);
        getData();
    }


    return (
        <View style={styles.container}>
            <View style={styles.textInput}>
                <TextInput style={{ width: "90%" }}
                    onChangeText={(text) => searchFilterFunction(text)}
                    value={search}
                    clearButtonMode={true}
                    placeholder="Search Here">
                </TextInput>
                {search.length != null &&
                    <TouchableOpacity style={{ marginTop: 2, width: "10%", }}>
                        <Ionicons name="search" size={30} ></Ionicons>
                    </TouchableOpacity>
                }
                {/* <TouchableOpacity style={{ marginTop: 2, width: "10%", }}>
                            <Ionicons name="search" size={30} ></Ionicons>
                        </TouchableOpacity> */}
            </View>
            <View>

                <View  >
                    {isLoading ? <ActivityIndicator /> : (
                        <FlatList
                            data={filteredDataSource}
                            numColumns={2}

                            renderItem={({ item }) => (
                                <ItemProduct data={item}
                                // key={item.id}
                                // title={item.title}
                                // price={item.price}
                                // category={item.category}
                                // description={item.description}

                                />
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

        </View>

    )
}



export default ListNew

const styles = StyleSheet.create({
    container: {

    },
    textInput: {
        flexDirection: "row",
        height: 40,
        borderWidth: 2,
        borderRadius: 20,
        borderColor: "red",
        marginVertical: 10,
        paddingHorizontal: 5,
        justifyContent: "space-between"
    }
})