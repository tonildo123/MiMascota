
import React,  { useState} from 'react'
import { Button, TextInput, View, Alert, Text, TouchableOpacity, PermissionsAndroid} from 'react-native';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent'
import firestore from '@react-native-firebase/firestore';
import { StyleAddress } from './style';
import { addressClean, addressSuccess } from '../../state/AddressSlice';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ModalComponent from '../../components/ModalComponent';
import MapScreen from '../../components/mapComponent';


const AddressScreen = () => {

 
  let state = useSelector((state) => state)  
  const distpach = useDispatch()
  

  const initValues = { 
    street:state?.addressuser?.address?.street ?? '',
    number:state?.addressuser?.address?.number ?? '',
    department:state?.addressuser?.address?.department ?? '',
    floor:state?.addressuser?.address?.floor ?? '',
    locality:state?.addressuser?.address?.locality ?? '',
    province:state?.addressuser?.address?.province ?? '',
    country:state?.addressuser?.address?.country ?? '',
    latitude:state?.addressuser?.address?.latitude ?? '',
    longitude:state?.addressuser?.address?.longitude?? ''}

    const [modalVisible, setModalVisible] = useState(false);

    const handleOpenModal = () => {
      setModalVisible(true);
    };
  
    const handleCloseModal = () => {
      setModalVisible(false);
    };
 

  const handleSubmit =  async (values) => {
    
    try {
      firestore().collection('address').add({
        idUser:state.logger.user.id,
        street:values.street,
        number:values.number,
        department:values.department,
        floor:values.floor,
        locality:values.locality,
        province:values.province,
        country:values.country,
        latitude:values.latitude,
        longitude:values.longitude
      })
    } catch (error) {
      console.log(error)
      Alert.alert('ocurrio un error')
    }finally{      
      const address = {
        idUser:state.logger.user.id,
        street:values.street,
        number:values.number,
        department:values.department,
        floor:values.floor,
        locality:values.locality,
        province:values.province,
        country:values.country,
        latitude:values.latitude,
        longitude:values.longitude
      }
      distpach(addressSuccess(address))
      Alert.alert('Cargado correctamente!')
    }    

}


const handleUpdate =async (values) =>{

  try {
    firestore().collection('address').doc(state.addressuser.address.id).update({
      idUser:state.logger.user.id,
      street:values.street,
      number:values.number,
      department:values.department,
      floor:values.floor,
      locality:values.locality,
      province:values.province,
      country:values.country,
      latitude:values.latitude,
      longitude:values.longitude
    })
  } catch (error) {
    console.log(error)
    Alert.alert('Error al actualizar!')
  }finally{
    distpach(addressClean())
    const address = {
      idUser:state.logger.user.id,
      street:values.street,
      number:values.number,
      department:values.department,
      floor:values.floor,
      locality:values.locality,
      province:values.province,
      country:values.country,
      latitude:values.latitude,
      longitude:values.longitude
    }
    distpach(addressSuccess(address))
    Alert.alert('Actualizado correctamente!')

  }

  

}

const miUbicacion = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Cool Access fine location Permission",
          message:
            "Cool Maps App needs access to your location " +
            "so you can get location.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the Location");

       
        handleOpenModal();
        
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };



  return (
    <View style={StyleAddress.container}>
      <HeaderComponent />
      <View style={{flex:1}}>      
      <Formik initialValues={initValues} onSubmit={(values) => handleSubmit(values)}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View> 
         <TextInput
           onChangeText={handleChange('street')}
           placeholder='Calle: ej = Av America'
           placeholderTextColor={'#566573'}
           onBlur={handleBlur('street')}
           value={values.street}
           color={'black'}
         />
          <TextInput
           onChangeText={handleChange('number')}
           placeholder='Altura/numero : ej = 154'
           placeholderTextColor={'#566573'}
           onBlur={handleBlur('number')}
           value={values.number}
           color={'black'}
         />
          <TextInput
           onChangeText={handleChange('department')}
           placeholder='Departamento (opcional)'
           placeholderTextColor={'#566573'}
           onBlur={handleBlur('department')}
           value={values.department}
           color={'black'}
         />          
         <TextInput
           onChangeText={handleChange('floor')}
           placeholder='Piso (Opcional)'
           placeholderTextColor={'#566573'}
           onBlur={handleBlur('floor')}
           value={values.floor}
           color={'black'}
         />
          <TextInput
           onChangeText={handleChange('locality')}
           placeholder='Localidad ejemplo = San Miguel de Tucumán '
           placeholderTextColor={'#566573'}
           onBlur={handleBlur('locality')}
           value={values.locality}
           color={'black'}
         />
          <TextInput
           onChangeText={handleChange('province')}
           placeholder='Provincia'
           placeholderTextColor={'#566573'}
           onBlur={handleBlur('province')}
           value={values.province}
           color={'black'}
         />  
          <TextInput
           onChangeText={handleChange('country')}
           placeholder='Pais'
           placeholderTextColor={'#566573'}
           onBlur={handleBlur('country')}
           value={values.country}
           color={'black'}
         />
          <TouchableOpacity onPress={miUbicacion}
           style={
            { backgroundColor: '#D35400', padding: 10, flexDirection: 'row', justifyContent: 'center', margin:1 }}>
            <Text 
            style={{ color: '#fff', fontSize: 18, fontFamily: 'Roboto-Medium', fontWeight: 'bold', marginRight: 10, alignSelf:'center' }}>
                Obtener mi ubicación
            </Text>
            <FontAwesome name="map-marker" color='black' size={20} />
            </TouchableOpacity> 
          <Button onPress={state.addressuser.address.status ? handleUpdate : handleSubmit} title='Guardar cambios' color={'#873600'}/>
       </View>
     )}
   </Formik>
      
    </View>
     <ModalComponent visible={modalVisible} onClose={handleCloseModal}>
        <MapScreen/>
        <Button title="Cerrar" onPress={handleCloseModal} color={'#873600'} />
      </ModalComponent>
      
    </View>
  )
}

export default AddressScreen

