import { View, Text, ImageBackground, Image  } from 'react-native';
import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Drawer } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { unlogger } from '../state/LoginSlice';
import { ownState } from '../state/OwnSlice';


const CustomDrawerAppStack = (props) => {

  const {name, lastName, avatar, status} = useSelector(state => state.profileuser.profile)
  const distpach = useDispatch()
  

  const [datos, setDatos] = useState({
    name: 'Sin datos',
    lastName: 'Sin datos',
    avatar: '../assets/images/avatar.png'
  })


  useEffect(() => {

    status ? setDatos({
      name: name,
      lastName: lastName,
      avatar: avatar,
    }) : null

  }, [status])


  

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


  


  return (
    <View style={{ flex: 1, }} >
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: '#BA4A00' }}>
        <ImageBackground
          source={require(url)}
          style={{ padding: 30, }}>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <View style={{ width: '100%', height: '10%' }}></View>
            <View style={{ width: '100%', height: '50%', flexDirection: 'row' }}>
              <View style={{width: '50%',height: '100%'}}>
                <Image
                  source={{ uri: datos.avatar }}
                  style={{height: 90,width: 90,resizeMode: 'cover',borderRadius: 40,
                          marginBottom: 10,}}/>
              </View>
              <View style={{width: '50%',height: '100%'}}>
                <Text style={{color: '#fff',fontSize: 20, fontFamily: 'Roboto-Medium',
                              fontWeight: 'bold',alignSelf:'flex-end'}}>
                  {datos.name.toUpperCase()} {datos.lastName.toUpperCase()}
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
                label='Home'
                icon={() => (
                  <FontAwesome
                    name="home"
                    color='#D35400'
                    size={20}
                    marginLeft={15}
                  />
                )}
                labelStyle={{ color: '#D35400' }}
                onPress={
                  () => {
                    props.navigation.navigate('Home')
                    // Alert.alert('Funcionalidad en desarrollo')
                  }}
              />
            }
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
                    props.navigation.navigate('HC') 
                    // Alert.alert('Funcionalidad en desarrollo')
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
                    props.navigation.navigate('Address') 
                    // Alert.alert('Funcionalidad en desarrollo')
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
                    const own = {
                      idUser: state.logger.user.id,
                      object:'vehiculo'
                    }
                    distpach(ownState(own))
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
                    const own = {
                      idUser: state.logger.user.id,
                      object:'motocicleta'
                    }
                    distpach(ownState(own))
                    props.navigation.navigate('Own')
                    // Alert.alert('Funcionalidad en desarrollo')
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
                    const own = {
                      idUser: state.logger.user.id,
                      object:'bicicleta'
                    }
                    distpach(ownState(own))
                    props.navigation.navigate('Own')
                    // Alert.alert('Funcionalidad en desarrollo')
                  }}
              />
            }
            {
              NestedOwn == true &&
              <DrawerItem
                label='Mi laptop'
                icon={() => (
                  <FontAwesome5
                    name="laptop-code"
                    color='#D35400'
                    size={20}
                  />
                )}
                labelStyle={{ color: '#D35400' }}
                onPress={
                  () => {
                    const own = {
                      idUser: state.logger.user.id,
                      object:'laptop'
                    }
                    distpach(ownState(own))
                    props.navigation.navigate('Own')
                    // Alert.alert('Funcionalidad en desarrollo')
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