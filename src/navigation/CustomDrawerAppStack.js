import { View, Text, ImageBackground, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Drawer } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { unlogger } from '../state/LoginSlice';
import { Enviroment } from '../enviroment';
import axios from 'axios';
import { profileSuccess } from '../state/Profileslice';
import firestore from '@react-native-firebase/firestore';


const CustomDrawerAppStack = (props) => {

  const state = useSelector(state => state)

  const [datos, setDatos] = useState({
    name: 'Sin datos',
    lastName: 'Sin datos',
    avatar: '../assets/images/avatar.png'
  })

  const [data, setData] = useState()

  useEffect(() => {

    getFirebase()


  }, [])

  useEffect(() => {

    state.profileuser.profile.status ? setDatos({
      name: state.profileuser.profile.name,
      lastName: state.profileuser.profile.lastName,
      avatar: state.profileuser.profile.avatar,
    }) : null

  }, [state.profileuser.profile.status])


  const distpach = useDispatch();

  let url = '../assets/images/portadapet.jpg';

  const [NestedHome, setNestedHome] = useState(false);
  const [NestedPet, setNestedPet] = useState(false);
  const [NestedOwn, setNestedOwn] = useState(false);

  const [focus, setFocus] = useState('1');


  const handleNestedHome = () => { setNestedHome(!NestedHome) }
  const handleNestedPet = () => { setNestedPet(!NestedPet) }
  const handleNestedOwn = () => { setNestedOwn(!NestedOwn) }

  const handleExit = () => {
    distpach(unlogger())
  }


  const getFirebase = async ()=>{

   
  const suscriber = firestore()
    .collection('ProfileUsers')
    .where('idUser', '==', state.logger.user.id)
    .onSnapshot(querySnapshot => {
      const objeto = [];      
      querySnapshot.forEach(documentSnapshot => {
        objeto.push({
          ...documentSnapshot.data(),
          key: documentSnapshot.id
        });
      });
      setData(objeto);
      setDatos({
        ...datos,
        name:objeto[0].name,
        lastName:objeto[0].lastName,
        avatar:objeto[0].avatar,

      })
      console.log('data::::> ', JSON.stringify(objeto, null, 5));
    });

  return () => suscriber();
  
  }


  return (
    <View style={{ flex: 1, }} >
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#BA4A00' }}>
        <ImageBackground
          source={require(url)}
          style={{ padding: 30, }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            {/* <View style={{ width: '100%', height: '40%' }}></View> */}
            <View style={{ width: '100%', height: '10%' }}></View>
            <View style={{ width: '100%', height: '50%', flexDirection: 'row' }}>
              <View style={{width: '50%',height: '100%'}}>
                <Image
                  source={{ uri: datos.avatar }}
                  style={{
                    height: 90,
                    width: 90,
                    resizeMode: 'cover',
                    borderRadius: 40,
                    marginBottom: 10,
                  }}
                />
              </View>
              <View style={{width: '50%',height: '100%'}}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 22,
                    fontFamily: 'Roboto-Medium',
                    fontWeight: 'bold',
                    alignSelf:'flex-end'
                  }}>
                  {datos.name} {datos.lastName}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            paddingTop: 10,
          }}>
          <Drawer.Section>
            <DrawerItem
              label='Inicio'
              labelStyle={{ color: '#873600' }}
              focused={focus == 1 ? true : false}
              onPress={handleNestedHome}
              icon={() => (
                <FontAwesome
                  name="home"
                  color='#873600'
                  size={20}
                />
              )} />
            {
              NestedHome == true &&
              <DrawerItem
                label='Mi perfil'
                icon={() => (
                  <FontAwesome
                    name="check-square-o"
                    color='#D35400'
                    size={20}
                    marginLeft={15}
                  />
                )}
                labelStyle={{ color: '#D35400' }}
                onPress={
                  () => {
                    props.navigation.navigate('Profile')
                    // Alert.alert('Funcionalidad en desarrollo')
                  }}
              />
            }

          </Drawer.Section>
          <Drawer.Section>
            <DrawerItem
              label='Mi Mascota'
              labelStyle={{ color: '#873600' }}
              focused={focus == 1 ? true : false}
              onPress={handleNestedPet}
              icon={() => (
                <MaterialIcons
                  name="pets"
                  color='#873600'
                  size={20}
                />
              )} />
            {
              NestedPet == true &&
              <DrawerItem
                label='Agregar información'
                icon={() => (
                  <FontAwesome
                    name="plus"
                    color='#D35400'
                    size={20}
                  />
                )}
                labelStyle={{ color: '#D35400' }}
                onPress={
                  () => {
                    props.navigation.navigate('Pet')
                    // Alert.alert('Funcionalidad en desarrollo')
                  }}
              />
            }
            {
              NestedPet == true &&
              <DrawerItem
                label='Historial clinico'
                icon={() => (
                  <MaterialIcons
                    name="history-edu"
                    color='#D35400'
                    size={20}
                  />
                )}
                labelStyle={{ color: '#D35400' }}
                onPress={
                  () => {
                    // props.navigation.navigate('Club') 
                    Alert.alert('Funcionalidad en desarrollo')
                  }}
              />
            }
            {
              NestedPet == true &&
              <DrawerItem
                label='Mi hogar'
                icon={() => (
                  <MaterialCommunityIcons
                    name="home-map-marker"
                    color='#D35400'
                    size={20}
                  />
                )}
                labelStyle={{ color: '#D35400' }}
                onPress={
                  () => {
                    // props.navigation.navigate('Club') 
                    Alert.alert('Funcionalidad en desarrollo')
                  }}
              />
            }
          </Drawer.Section>
          <Drawer.Section>
            <DrawerItem
              label='Mis pertenencias'
              labelStyle={{ color: '#873600' }}
              focused={focus == 1 ? true : false}
              onPress={handleNestedOwn}
              icon={() => (
                <MaterialIcons
                  name="privacy-tip"
                  color='#873600'
                  size={20}
                />
              )} />
            {
              NestedOwn == true &&
              <DrawerItem
                label='Mi vehiculo'
                icon={() => (
                  <Fontisto
                    name="car"
                    color='#D35400'
                    size={20}
                  />
                )}
                labelStyle={{ color: '#D35400' }}
                onPress={
                  () => {
                    props.navigation.navigate('Own')
                    // Alert.alert('Funcionalidad en desarrollo')
                  }}
              />
            }
            {
              NestedOwn == true &&
              <DrawerItem
                label='Mi motocicleta'
                icon={() => (
                  <MaterialIcons
                    name="motorcycle"
                    color='#D35400'
                    size={20}
                  />
                )}
                labelStyle={{ color: '#D35400' }}
                onPress={
                  () => {
                    // props.navigation.navigate('Club') 
                    Alert.alert('Funcionalidad en desarrollo')
                  }}
              />
            }
            {
              NestedOwn == true &&
              <DrawerItem
                label='Mi bicicleta'
                icon={() => (
                  <MaterialCommunityIcons
                    name="bicycle"
                    color='#D35400'
                    size={20}
                  />
                )}
                labelStyle={{ color: '#D35400' }}
                onPress={
                  () => {
                    // props.navigation.navigate('Club') 
                    Alert.alert('Funcionalidad en desarrollo')
                  }}
              />
            }
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>

      <View
        style={{
          padding: 10,
          borderTopWidth: 2,
          borderTopColor: 'black',
        }}
      >
        <TouchableOpacity
          onPress={() => {
            handleExit();
            console.log('exit')
          }}
          style={{
            paddingVertical: 5
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',

            }}
          >
            <FontAwesome
              name="power-off"
              color='black'
              size={20}
            />
            <Text style={{ paddingHorizontal: 20, color: 'black' }}>Salir</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default CustomDrawerAppStack