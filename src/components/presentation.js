import { Image } from 'react-native'
import React from 'react'

const LogoTitle = () => {
    let url = '../assets/images/mimascota.png';

  return (
    <Image
    style={{
      flex: 1,
      resizeMode: "contain",
      paddingRight: 30,
      width: 200,
      alignItems: 'center'
    }}
    source={require(url)}
  />
  )
}

export default LogoTitle