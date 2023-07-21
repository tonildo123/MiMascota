import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'


const ButtonComponent = ({ text, accion }) => {

    return (
        <View style={{alignItems: 'center',marginTop: 30,}}>
            <TouchableOpacity
                style={{width: '100%',backgroundColor:'#A04000',height: 50,justifyContent: 'center',alignItems: 'center',borderRadius: 10}}
                onPress={accion}>
               
                    <Text style={{fontSize: 18,fontWeight: 'bold',color:'white'
                        }}>{text}</Text>
                
            </TouchableOpacity>
        </View>
    )
}

export default ButtonComponent