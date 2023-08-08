
import React, { useEffect } from 'react'
import { Button, TextInput, View, Image, Alert} from 'react-native';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent'
import Image200X200 from '../../components/Imgen';
import firestore from '@react-native-firebase/firestore';
import { profileClean, profileSuccess } from '../../state/Profileslice';
import usePhotos from '../../hooks/usePhotos';
import { StyleProfile } from './style';



const ProfileScreen = () => {

 
  let {name, lastName, avatar, numberPhone, status} = useSelector((state) => state.profileuser.profile)  
  let {id} = useSelector((state) => state.logger.user)  
  const distpach = useDispatch()
  
  const {mensaje, fotobase64, handleFoto, handleImagen} = usePhotos()

  const initValues = { 
    name:name ?? '',
    lastName:lastName ?? '', 
    numberPhone:numberPhone ??''}

  useEffect(() => {
    mensaje == undefined ? null : Alert.alert(`${mensaje}`)
  }, [])  

  const handleSubmit =  async (values) => {
    
    try {
      firestore().collection('ProfileUsers').add({
        idUser:id,
        name:values.name,
        lastName:values.lastName,
        avatar :fotobase64,
        numberPhone:values.numberPhone,
      })
    } catch (error) {
      console.log(error)
      Alert.alert('ocurrio un error')
    }finally{      
      const profile = {
        idUser:id,
        name:values.name,
        lastName:values.lastName,
        avatar :fotobase64,
        numberPhone:values.numberPhone,
      }
      distpach(profileSuccess(profile))
      Alert.alert('Cargado correctamente!')
    }    

}


const handleUpdate =async (values) =>{

  try {
    firestore().collection('ProfileUsers').doc(id).update({
      idUser:id,
      name:values.name,
      lastName:values.lastName,
      avatar :fotobase64,
      numberPhone:values.numberPhone,
    })
  } catch (error) {
    console.log(error)
    Alert.alert('Error al actualizar!')
  }finally{
    distpach(profileClean())
    const profile = {
      idUser:id,
      name:values.name,
      lastName:values.lastName,
      avatar :fotobase64,
      numberPhone:values.numberPhone,
    }
    distpach(profileSuccess(profile))
    Alert.alert('Actualizado correctamente!')

  }

}

  return (
    <View style={StyleProfile.container}>
      <HeaderComponent />
      <View style={{flex:1}}>      
      <Formik initialValues={initValues} onSubmit={(values) => handleSubmit(values)}>
        {({ handleChange, handleBlur, handleSubmit, values }) => (
        <View>
        { !status || status === null ? <Image200X200/> : 
          <Image source={{ uri: avatar}} style={StyleProfile.image}/>
        }
        
          <View style={StyleProfile.handlefotos}>
          <Button onPress={handleFoto} title='Tomar foto' color={'#873600'}/>
          <Button onPress={handleImagen} title='Elegir foto' color={'#873600'} />
          </View>
          
         <TextInput
           onChangeText={handleChange('name')}
           placeholder='ingrese su nombre'
           placeholderTextColor={'#566573'}
           onBlur={handleBlur('name')}
           value={values.name}
           color={'black'}
         />
          <TextInput
           onChangeText={handleChange('lastName')}
           placeholder='ingresar su apellido'
           placeholderTextColor={'#566573'}
           onBlur={handleBlur('lastName')}
           value={values.lastName}
           color={'black'}
         />
          <TextInput
           onChangeText={handleChange('numberPhone')}
           placeholder='ingrese numero telefonico'
           placeholderTextColor={'#566573'}
           onBlur={handleBlur('numberPhone')}
           value={values.numberPhone}
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

export default ProfileScreen

