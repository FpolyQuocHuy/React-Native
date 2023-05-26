import {SafeAreaView, StyleSheet ,View} from 'react-native'
import { React} from 'react'
import DrawerNavigation from './DrawerNavigation';
import RootComponent from '../..';


const HomeScreen = () => {

  return (
    <SafeAreaView style={styles.container}>
        <DrawerNavigation/>
       
        {/* <RootComponent/> */}
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container : {
    flex:1,
    
  }
})
export default HomeScreen