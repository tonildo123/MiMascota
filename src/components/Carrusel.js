import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

const Carrusel = () => {

    const [counter, setCounter] = useState(0)
    const images = [
        require('../assets/images/sebusca.png'),
        require('../assets/images/adopto.png'),
        require('../assets/images/adopta.png'),
        require('../assets/images/veterinaria.png'),
        require('../assets/images/veterinaria2.png'),
      ];

    useEffect(() => {
        const interval = setInterval(() => {
          setCounter((prevCounter) => (prevCounter + 1) % images.length); 
        }, 2500);
        return () => clearInterval(interval);
      }, []);



  const ImageOneComponent = () => {
    return (
      <Animatable.View
        animation="slideInRight"
        style={{
          flex: 4,
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          paddingHorizontal: 20,
          paddingVertical: 30,
          backgroundColor: 'white',
        }}
      >
        <Image source={images[counter]} style={styles.image} />
      </Animatable.View>
    );
  };

 
  

  return (
    <View style={styles.wrapper}>
      <ImageOneComponent />
    </View>
  );
};

export default Carrusel;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    width: '100%',
  },
  slide: {
    flex: 1,    
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
