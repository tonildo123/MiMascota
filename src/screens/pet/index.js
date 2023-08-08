
import React, { useEffect } from 'react'
import { Button, TextInput, View, Image, Alert} from 'react-native';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent'
import Image200X200 from '../../components/Imgen';
import firestore from '@react-native-firebase/firestore';
import usePhotos from '../../hooks/usePhotos';
import {  StylePet } from './style';
import { petClean, petSuccess } from '../../state/PetSlice';

const PetScreen = () => {

 
  let {pickname,status, photo} = useSelector((state) => state.petuser.pet)  
  let {id} = useSelector((state) => state.logger.user)  
  const distpach = useDispatch()
  
  const {mensaje, fotobase64, handleFoto, handleImagen} = usePhotos()

  const initValues = { 
    
    pickname:pickname ?? ''}

  useEffect(() => {
    mensaje == undefined ? null : Alert.alert(`${mensaje}`)
  }, [])  

  const handleSubmit =  async (values) => {
    
    try {
      firestore().collection('Pet').add({
        idUser:id,
        photo :fotobase64,
        pickname:values.pickname,
      })
    } catch (error) {
      console.log(error)
      Alert.alert('ocurrio un error')
    }finally{      
      const pet = {
        idUser:id,
        photo :fotobase64,
        pickname:values.pickname,
      }
      distpach(petSuccess(pet))
      Alert.alert('Cargado correctamente!')
    }    

}


const handleUpdate =async (values) =>{

  try {
    firestore().collection('Pet').doc(id).update({
        idUser:id,
        photo :fotobase64,
        pickname:values.pickname,
    })
  } catch (error) {
    console.log(error)
    Alert.alert('Error al actualizar!')
  }finally{
    distpach(petClean())
    const pet = {
      idUser:id,
        photo :fotobase64,
        pickname:values.pickname,
    }
    distpach(petSuccess(pet))
    Alert.alert('Actualizado correctamente!')

  }

}

  return (
    <View style={StylePet.container}>
      <HeaderComponent />
      <View style={{flex:1}}>      
      <Formik initialValues={initValues} onSubmit={(values) => handleSubmit(values)}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
        { !status || status === null ? <Image200X200/> : 
          <Image source={{ uri: fotobase64}} style={StylePet.image}/>
        }
        
          <View style={StylePet.handlefotos}>
          <Button onPress={handleFoto} title='Tomar foto' color={'#873600'}/>
          <Button onPress={handleImagen} title='Elegir foto' color={'#873600'} />
          </View>
          
         <TextInput
           onChangeText={handleChange('pickname')}
           placeholder='Nombre de su mascota'
           placeholderTextColor={'#566573'}
           onBlur={handleBlur('pickname')}
           value={values.pickname}
           color={'black'}
         />
          <Button onPress={status ? handleUpdate : handleSubmit} title='Guardar cambios' color={'#873600'}/>
       </View>
     )}
   </Formik>
      
    </View>
      
    </View>
  )
}

export default PetScreen

