import React, { useState} from 'react';
import {View,  StyleSheet, Alert} from 'react-native';
import { enableLatestRenderer } from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from "react-native-maps";

enableLatestRenderer();

const MapScreen = ({navigation}) => {

  const [ciudad, setCiudad] = useState({
    coordenadas:{
      latitud:null,
      longitud:null,
    },
  });
  const [markerd, setMarkerd] = useState({
    region: {
    latitude: 'LATITUDE', 
    longitude: 'LONGITUDE',
    latitudeDelta: 'LATITUDE_DELTA',
    longitudeDelta: 'LONGITUDE_DELTA',
  },
  
  markers: []  });


  const tony = {
    
   latitude: -26.831811744893336, 
   longitude: -65.22590668871999,
   latitudeDelta: 0.019046017524171788,
   longitudeDelta: 0.012100450694561005,

  };

  
  const pinColors = {
    RED: '#ff3b30',
    GREEN: '#4cd964',
    PURPLE: '#c969e0',
    YELLOW:'#FFFF00',
    AQUA:'#00FFFF',
  };


  const handleAlert = (arg1, arg2) => {

    console.log(arg1, arg2);

    setCiudad({coordenadas:{
      latitud:arg1,
      longitud:arg2}})

    console.log('clicked');

    Alert.alert(
      'Ciudad elegida',
      'Ver clima de ciudad',
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed!')},
        {text: 'Ver Clima', onPress: () => console.log('ver clima Pressed!')},
      ],
      { cancelable: false }
    )
    
  };


  const handleVistaResultado = () =>{

    (ciudad.coordenadas.latitud)
    ? navigation.navigate('Success', {ciudad})
    : Alert.alert(
      'Lo sentimos!',
      'Seleccione una vez más la ciudad MARCADA.',
      [
        {text: 'Cancelar', onPress: () => console.log('Cancel Pressed!')},
        {text: 'Aceptar', onPress: () => console.log('OK Pressed!')},
      ],
      { cancelable: false }
    )
    
  }

  return (
    

      <View style={styles.containerMap}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            showsUserLocation={true}  
            zoomEnabled={true}  
            zoomControlEnabled={true}  
            // region={tony}
            initialRegion={tony}
            // onRegionChangeComplete={(region) => console.log('REGION : ', JSON.stringify(region, null, 3))}
            showsTraffic={true}
            onPress={(e) => setMarkerd({ markers: [...markerd.markers, { latlng: e.nativeEvent.coordinate }] })}
          >
            {
                // loop through markers array & render all markers
                markerd.markers.map((marker, i) => (
                    <MapView.Marker coordinate={marker.latlng} key={i} 
                    pinColor={pinColors.AQUA}
                    onPress={() => {setCiudad({coordenadas:{
                      latitud:marker.latlng.latitude,
                      longitud:marker.latlng.longitude}})
                      // console.log(ciudad);
                      handleAlert(marker.latlng.latitude,marker.latlng.longitude);}}/>
                ))
            }
          <Marker coordinate={tony} 
                  pinColor={pinColors.RED}
                  title="Tucuman"
                  onPress={() => {
                    setCiudad({coordenadas:{
                      latitud:tony.latitude,
                      longitud:tony.longitude}})
                      console.log(ciudad);
                      handleAlert();    
                    }
                  }
                  />                                                              
          
        </MapView>
      </View>
   
  );
};

const styles = StyleSheet.create({
  container: {

    flex:1,

  },
  containerMap:{
    height:'93%',
    width:'100%',

  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },


 });

export default MapScreen;