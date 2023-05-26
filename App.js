import { StatusBar } from 'expo-status-bar';
import { ImageBackground ,StyleSheet, Text, View } from 'react-native';
import {images} from './Constants/index'
import AuthNavi from './Components/navigation'; 
import { NavigationContainer } from '@react-navigation/native';
import CartScreen from './Components/Screen/Cart/CartScreen'

export default function App() {
  return (
    <View style={{flex:1 }}>
      <ImageBackground source={images.background} resizeMode={'cover'} style={{height:'100%' }}>
         <NavigationContainer>
            <AuthNavi/>
         </NavigationContainer>
   
        <StatusBar style="auto" />
     </ImageBackground> 

    </View>
  );
}

