
import React, { useState, useEffect } from 'react'
import { Button, TextInput, View, Image,StyleSheet, PermissionsAndroid, Alert} from 'react-native';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import HeaderComponent from '../../components/HeaderComponent'
import   {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Image200X200 from '../../components/Imgen';
import firestore from '@react-native-firebase/firestore';


const ProfileScreen = () => {

  const initValues = { name:'', lastName:'', numberPhone:''}
  let state = useSelector((state) => state)  
  
  const [fotobase64, setFotobase64] = useState();
  const [mensaje, setmensaje] = useState()
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    console.log('profile : ',JSON.stringify(state, null, 5))
    mensaje == undefined ? null : Alert.alert(`${mensaje}`)
  }, [])
  

  const handleSubmit =  async (values) => {
    
    try {
      firestore().collection('ProfileUsers').add({
        idUser:state.logger.user.id,
        name:values.name,
        lastName:values.lastName,
        avatar :fotobase64,
        numberPhone:values.numberPhone,
      })
    } catch (error) {
      console.log(error)
      Alert.alert('ocurrio un error')
    }finally{
      Alert.alert('cargado correctamente!')
      
    }    

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
// selecciona una imagen
const handleImagen = () =>{

  const options = {
    title:'Seleccione una imagen',
    storageOption:{
      skipBackup:true,
      path:'images',
    },
  };

  launchImageLibrary(options, response =>{
    console.log('response = ' + response);

      if(response.errorCode){
        console.log('response error= '+response.errorCode);
      }else if(response.didCancel){
        console.log('user cancel action ');
      }else{
        const path = response.assets[0].uri;
        setFotobase64(path);
        
      }

  });


};

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

        {
          fotobase64 === undefined ? <Image200X200/> : 
          <Image
                source={{
                  uri: fotobase64,
                }}
                style={{
                  height: 200,
                  width: 200,
                  resizeMode: 'cover',
                  alignSelf: 'center'
                }}
              />
        }
        
          <View style={{flexDirection:'row' ,justifyContent:'space-evenly', marginTop:8
          }}>
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
          <Button onPress={handleSubmit} title='Guardar cambios' color={'#873600'}/>
       </View>
     )}
   </Formik>
      
    </View>
      
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({})