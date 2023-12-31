import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderComponent from '../../components/HeaderComponent'
import Carrusel from '../../components/Carrusel'

const HomeScreen = () => {
  return (
    <View style={{flex:1}}>
      <HeaderComponent />
      <View style={{flex:1, backgroundColor:'#FAD7A0'}}></View>
      <View style={{flex:2, backgroundColor:'white',  flexDirection: 'row'}}>
        <Carrusel/>
      </View>
      <View style={{flex:1, backgroundColor:'#FAD7A0'}}></View>
    </View>
  )
}

export default HomeScreen