import {Image } from 'react-native'
import React from 'react'

const Image200X200 = () => {
    const fotobase64 = 'https://via.placeholder.com/200';
  return (
    <Image 
    style={{ alignSelf: 'center', height: 200, width: 200, }}
    source={{ uri: fotobase64 }}
  />
  )
}

export default Image200X200