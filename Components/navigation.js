import React from 'react'

import LoginScreen from './Screen/LoginAndRegister/LoginScreen'
import RegisterScreen from './Screen/LoginAndRegister/RegisterScreen'
import DetaiScreen from './Screen/Details/DetaiScreen'
import AddProductSreen from './Screen/Products/AddProductSrceen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RootComponent from '../Components/index'
import ListProduct from './Screen/Products/ListProduct'
import EditProductScreen from './Screen/Products/EditProductScreen'

const Stack = createNativeStackNavigator();



const AuthNavi = () => {

    return (

        <Stack.Navigator initialRouteName="Login" screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Home" component={RootComponent} />
            <Stack.Screen name="Detail" component={DetaiScreen} />
            <Stack.Screen name="AddProduct" component={AddProductSreen} />
            <Stack.Screen name="EditProduct" component={EditProductScreen} />
            <Stack.Screen name="ListProduct" component={ListProduct} />
        </Stack.Navigator>

    )
}
export default AuthNavi;
//

