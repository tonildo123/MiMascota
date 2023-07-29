import React, {useState, useEffect} from 'react';
import {
  View, Text
  , StatusBar
  , ScrollView
  , TextInput
  , TouchableOpacity,
  Alert, 
  ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NetInfo from "@react-native-community/netinfo";
import axios from 'axios';
import { LoginScreenStyle } from './style';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';



const RegisterScreen = ({ navigation }) => {

  const [text, onChangeText] = useState("");
  const [number, onChangeNumber] = useState('');
  const [number2, onChangeNumber2] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loadingData, setLoadingData] = useState(false);
  const [hayInternet, setHayInternet] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
        setHayInternet(state.isConnected)
      });
      
      // Unsubscribe
      unsubscribe();
  }, [])
  

  const handleRegister = () =>{

    if( number === number2){

      setLoadingData(true)
      const body = {
        email: text,
        password: number
    }

    console.log('body',JSON.stringify(body, null, 4))
    
    auth()
      .createUserWithEmailAndPassword(text, number)
      .then(resp => {
        console.log('resp : ', JSON.stringify(resp.user.uid, null, 3));
        console.log('User account created & signed in!');
        const idUser = resp.user.uid;
        cargarDataUser(idUser);
      })
      .catch(error => {
        console.error(error);
        setLoadingData(false)
        Alert.alert(`${error}`)
      });   

}}

const cargarDataUser = async(idUserId)=>{

    const idUser = idUserId;
    const email = text;
    const password = number;
    

try {
  firestore().collection('Users').add({
    idUser:idUser,
    email:email, 
    password:password
  })
} catch (error) {
  console.log('error al subir datos', error)
  setLoadingData(false)
  Alert.alert('Hubo un error al guardar datos')
}finally{
  setLoadingData(false)
  Alert.alert(
    "Exito!",
    "Datos guardados correctamente!",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => navigation.navigate('Login')}
    ]
  );
}
}
  return (
    <View style={LoginScreenStyle.container}>
        
        <StatusBar backgroundColor='#BA4A00' barStyle="light-content" />
        <View style={LoginScreenStyle.header}>
        <View
        style={{
            flexDirection: 'row',
        }}
        >
            <View
            style={{
                width:'80%'
            }}
            >
                <Text style={LoginScreenStyle.text_header}>Registrarse</Text>         
                <Text style={LoginScreenStyle.text_header}>a TuMascota</Text>
            </View>
            <View
            style={{
                width:'20%'
            }}
            >
              
            <MaterialIcons
                name="pets"
                color='white'
                size={80}
                />
            </View>
        </View>
        
        </View>
        
        <Animatable.View
            animation="fadeInUpBig"
            style={[LoginScreenStyle.footer, {
                backgroundColor: 'white',
                    }]}
        >
        <ScrollView>
        <Text style={[LoginScreenStyle.text_footer, {
                    color:'grey'
                }]}>Crear cuenta</Text>
                <View style={LoginScreenStyle.action}>
                    <FontAwesome
                        name="user-o"
                        color='grey'
                        size={20}
                     />
                 <TextInput
                    placeholder="Email"
                    placeholderTextColor="#666666"
                          style={[LoginScreenStyle.textInput, {
                              color: 'black'
                          }]}
                    autoCapitalize="none"
                    onChangeText={onChangeText}
                    value={text}
                  />
    
            </View>
           <Text style={[LoginScreenStyle.text_footer, {
              color: 'grey',
              marginTop: 35
          }]}>Contraseña</Text>
          <View style={LoginScreenStyle.action}>
              <Feather
                  name="lock"
                  color='grey'
                  size={20}
              />
        <TextInput
            placeholder="Ingresar contraseña"
            placeholderTextColor="#666666"
            onChangeText={onChangeNumber}
            value={number}
            secureTextEntry={showPassword ? false : true}
            style={[LoginScreenStyle.textInput, {
                color: 'black'
            }]}
            autoCapitalize="none"
           
        />
        
    <TouchableOpacity
         onPress={()=>{setShowPassword(!showPassword);}}
    >
       
        {showPassword 
            ?<Feather
            name="eye"
            color='grey'
            size={20}
            />
            :<Feather
            name="eye-off"
            color="gray"
            size={20}
            />  
                      
        }
        
    </TouchableOpacity>
</View>
<Text style={[LoginScreenStyle.text_footer, {
              color: 'grey',
              marginTop: 35
          }]}>Repetir contraseña</Text>
          <View style={LoginScreenStyle.action}>
              <Feather
                  name="lock"
                  color='grey'
                  size={20}
              />
        <TextInput
            placeholder="Ingresar contraseña"
            placeholderTextColor="#666666"
            onChangeText={onChangeNumber2}
            value={number2}
            secureTextEntry={showPassword2 ? false : true}
            style={[LoginScreenStyle.textInput, {
                color: 'black'
            }]}
            autoCapitalize="none"
           
        />
        
    <TouchableOpacity
         onPress={()=>{setShowPassword2(!showPassword2);}}
    >
       
        {showPassword2
            ?<Feather
            name="eye"
            color='grey'
            size={20}
            />
            :<Feather
            name="eye-off"
            color="gray"
            size={20}
            />  
                      
        }
        
    </TouchableOpacity>
</View>
<View style={LoginScreenStyle.button}>
    <TouchableOpacity
        style={LoginScreenStyle.signIn}
        onPress={() => {
          hayInternet 
          ? handleRegister()
          : Alert.alert('Sin conexion a intenet')
          }}
        
    >
        <LinearGradient
            colors={['#BA4A00', '#E67E22']}
            style={LoginScreenStyle.signIn}
        >
            {loadingData
                ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color='white' />
                  </View> 
                : 
                <Text style={[LoginScreenStyle.textSign, { color: 'black'}]}>Registrarme</Text>
                }
        </LinearGradient>

    </TouchableOpacity>
    

    </View>
    
    </ScrollView>
    </Animatable.View>

        
</View>
  )
}

export default RegisterScreen