import React, { useState } from 'react'
 import AddProductSreen from './Screen/Products/AddProductSrceen'
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from './Screen/Profile/ProfileScreen' 

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons'; 
import DrawerNavigation from './Screen/Home/DrawerNavigation'
import ListProduct from './Screen/Products/ListProduct'
import { Zocial } from '@expo/vector-icons'; 
import CartScreen from './Screen/Cart/CartScreen';

const Tab = createBottomTabNavigator();



const RootComponent = () => {

    return(
    // <NavigationContainer independent={true}>
      <Tab.Navigator  screenOptions={{
    tabBarStyle: { position: 'absolute' },
    headerShown: false
  }} >
      <Tab.Screen name="HomeTab" component={DrawerNavigation}  options={{
        tabBarLabel: 'Home',
        tabBarIcon: () => (
            <Ionicons name="home" size={26} />
        )
    }}/>
      <Tab.Screen name="AddProduct" component={AddProductSreen} options={{
        tabBarLabel: 'Add',
        tabBarIcon: () => (
            <Ionicons name="add-circle" size={26} />
        )
    }}/>
     <Tab.Screen name="ListProduct" component={ListProduct} options={{
        tabBarLabel: 'List',
        tabBarIcon: () => (
          <FontAwesome name="list-alt" size={26} color="black" />
        )
    }}/>
     {/* <Tab.Screen name="Detail" component={DetaiScreen} options={{
        tabBarLabel: 'Detail',
        tabBarIcon: () => (
          <FontAwesome name="list-alt" size={26} color="black" />
        )
    }}/> */}
      <Tab.Screen name="Cart" component={CartScreen} options={{
        tabBarLabel: 'Cart',
        tabBarIcon: () => (
          <Zocial name="cart" size={24} color="black" />
        )
    }}/>
    </Tab.Navigator>
  //  </NavigationContainer>
    )
  }
  export default RootComponent;
//

