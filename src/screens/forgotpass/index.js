import React, { useState, useEffect } from 'react';
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
import { useSelector } from 'react-redux';
import { LoginScreenStyle } from './style';

const ForgotPassword = () => {
    const [text, onChangeText] = useState("");
    const [number, onChangeNumber] = useState('');
    const [number2, onChangeNumber2] = useState('');
    // const [validateUser, setValidateUser] = useState(false)
    // const [validatePassword, setValidatePassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [loadingData, setLoadingData] = useState(false);
    const [hayInternet, setHayInternet] = useState(false);

    const  user  = useSelector(state => state)
    console.log('user', user)

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            setHayInternet(state.isConnected)
        });

        // Unsubscribe
        unsubscribe();
    }, [])


    const handleRegister = () => {

        if (number === number2) {

            setLoadingData(true)
            const body = {
                email: text,
                password: number
            }

            console.log('body', JSON.stringify(body, null, 4))

            axios.put(`https://be-production-3d6c.up.railway.app/api/update/${15}`, body)
                .then((resp) => {
                    console.log('datos', JSON.stringify(resp.data.data, null, 4))
                    setLoadingData(false)
                    Alert.alert('DATOS GUARDADOS')

                })
                .catch(
                    (err) => {
                        console.log('error en la solicitud', err)
                        setLoadingData(false)
                        Alert.alert('Error al registrar usuario')
                    }
                )

        } else {

            Alert.alert('Las contraseñas no coinciden')
        }

    }

    const handleCode = () => {
        console.log('codigo')
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
                            width: '80%'
                        }}
                    >
                        <Text style={LoginScreenStyle.text_header}>Recuperar</Text>
                        <Text style={LoginScreenStyle.text_header}>Contraseña</Text>
                    </View>
                    <View
                        style={{
                            width: '20%'
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
                        color: 'grey'
                    }]}>Ingresar su email</Text>
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
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                handleCode();
                            }}>
                            <Text style={{
                                color: 'red',
                                marginTop: 8
                            }}>
                                Obtener codigo
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={[LoginScreenStyle.text_footer, {
                        color: 'grey',
                        marginTop: 20
                    }]}>Contraseña</Text>
                    <View style={LoginScreenStyle.action}>
                        <Feather
                            name="lock"
                            color='grey'
                            size={20}
                        />
                        <TextInput
                            placeholder="Ingresar nueva contraseña"
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
                            onPress={() => { setShowPassword(!showPassword); }}
                        >

                            {showPassword
                                ? <Feather
                                    name="eye"
                                    color='grey'
                                    size={20}
                                />
                                : <Feather
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
                            placeholder="Repetir nueva contraseña"
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
                            onPress={() => { setShowPassword2(!showPassword2); }}
                        >

                            {showPassword2
                                ? <Feather
                                    name="eye"
                                    color='grey'
                                    size={20}
                                />
                                : <Feather
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
                                    <Text style={[LoginScreenStyle.textSign, { color: 'black' }]}>Guardar </Text>
                                }
                            </LinearGradient>

                        </TouchableOpacity>


                    </View>

                </ScrollView>
            </Animatable.View>


        </View>
    )
}

export default ForgotPassword