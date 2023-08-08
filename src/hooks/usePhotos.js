import { useState } from 'react'
import { PermissionsAndroid} from 'react-native';
import { launchCamera, launchImageLibrary} from 'react-native-image-picker';


const usePhotos = () => { 
  const [fotobase64, setFotobase64] = useState();
  const [mensaje, setmensaje] = useState()

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
          console.log('elegi imagen', response);
      
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
  return {
    handleFoto,
    handleImagen, 
    fotobase64, 
    mensaje
  }
}

export default usePhotos