
import React, { useState } from 'react'
import { Button, TextInput, View, Image,StyleSheet, PermissionsAndroid} from 'react-native';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent'
import   {launchCamera, launchImageLibrary} from 'react-native-image-picker';

const ProfileScreen = () => {

  const initValues = { name:'', lastName:'', numberPhone:''}
  let state = useSelector((state) => state)  
  
  const [fotobase64, setFotobase64] = useState('https://via.placeholder.com/200');
  const [mensaje, setmensaje] = useState()

  const handleSubmit = (values) => {

    const body = {
     idUser:state.logger.user.id,
     name:values.name,
     lastName:values.lastName,
     numberPhone:values.numberPhone,
     avatar:fotobase64
    }

    console.log('body : ', JSON.stringify(body, null, 5))   

}


 
  
const handleFoto = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Permiso de cámara',
        message: 'Necesitamos permiso para acceder a la cámara',
        buttonNeutral: 'Preguntar después',
        buttonNegative: 'Cancelar',
        buttonPositive: 'Aceptar',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      const options = {
        title: 'Tomar una foto',
        storageOption: {
          skipBackup: true,
          path: 'images',
        },
        includeBase64: true,
      };
      launchCamera(options, response => {
        console.log('response = ', response);
        setmensaje('error inesperado');
        if (response.errorCode) {
          console.log('response error= ', response.errorCode);
          setmensaje('error inesperado');
        } else if (response.didCancel) {
          console.log('user cancel action ');
          setmensaje('error inesperado');
        } else {
          const uri = response.assets[0].uri;
          setFotobase64(uri);
        }
      });
    } else {
      console.log('Permiso de cámara denegado');
      setmensaje('Permiso de cámara denegado');
    }
  } catch (err) {
    console.warn(err);
    setmensaje('error inesperado');
  }
};
const handleChoosePhoto = ()=>{
  console.log('seleccionar foto') 
}
  return (
    <View style={{flex:1}}>
      <HeaderComponent />
      <View style={{flex:1}}>      
      <Formik
        initialValues={initValues}
        onSubmit={(values) => handleSubmit(values)}
      >
     {({ handleChange, handleBlur, handleSubmit, values }) => (
       <View>
        <Image
            source={require('../../assets/images/avatar.png')}
            style={{
            height: 90,
            width: 90,
            resizeMode: 'cover',
            borderRadius: 40,
            marginBottom: 10,
            marginTop:10,
            alignSelf:'center'
            }}
          />
          <View style={{flexDirection:'row' ,justifyContent:'space-evenly'
          }}>
          <Button onPress={handleFoto} title='Tomar foto' />
          <Button onPress={handleChoosePhoto} title='Elegir foto' />
          </View>
          
         <TextInput
           onChangeText={handleChange('name')}
           placeholder='ingrese su nombre'
           onBlur={handleBlur('name')}
           value={values.name}
         />
          <TextInput
           onChangeText={handleChange('lastName')}
           placeholder='ingresar su apellido'
           onBlur={handleBlur('lastName')}
           value={values.lastName}
         />
          <TextInput
           onChangeText={handleChange('numberPhone')}
           placeholder='ingrese numero telefonico'
           onBlur={handleBlur('numberPhone')}
           value={values.numberPhone}
         />          
          <Button onPress={handleSubmit} title='Guardar cambios' />
       </View>
     )}
   </Formik>
      
    </View>
      
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})