import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HeaderComponent from '../../components/HeaderComponent'

const OwnScreen = () => {
  return (
    <View style={{flex:1}}>
      <HeaderComponent />
      <View style={{flex:1, backgroundColor:'#FAD7A0'}}></View>
      <View style={{flex:2, backgroundColor:'#FAD7A0',  flexDirection: 'row'}}>
        <Text>Mis cosas</Text>
      </View>
      <View style={{flex:1, backgroundColor:'#FAD7A0'}}></View>
    </View>
  )
}

export default OwnScreen

const styles = StyleSheet.create({})