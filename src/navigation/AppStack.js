import React, {useEffect} from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerAppStack from './CustomDrawerAppStack';
import ProfileScreen from '../screens/profile';
import PetScreen from '../screens/pet';
import OwnScreen from '../screens/own';
import HomeScreen from '../screens/home';
import NotificationScreen from '../screens/notification';
import HCScreen from '../screens/hc';
import useFirebase from '../hooks/useFirebase';
import AddressScreen from '../screens/address';

const Drawer = createDrawerNavigator();

const AppStack = () => {

  const {getFirebasePet, getFirebaseProfile, getFirebaseOwn, getFirebaseHC, getFirebaseAddress} = useFirebase()


  useEffect(() => {
    getFirebaseProfile()
    getFirebasePet(),
    getFirebaseAddress(), 
    getFirebaseOwn(),
    getFirebaseHC()    
  }, [])

  return (
    <Drawer.Navigator
      backBehavior="history" // para volver a la pantalla anterior y no a la main
      screenOptions={{
        headerShown: false, // oculta el menu lateral
      }}
      drawerContent={props => <CustomDrawerAppStack {...props}/>} 
    >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="Pet" component={PetScreen} />
        <Drawer.Screen name="Own" component={OwnScreen} />
        <Drawer.Screen name="Notification" component={NotificationScreen} />
        <Drawer.Screen name="HC" component={HCScreen} />
        <Drawer.Screen name="Address" component={AddressScreen} />
        
    </Drawer.Navigator>
  )
}

export default AppStack