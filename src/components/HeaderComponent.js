import React from 'react';
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import LogoTitle from './presentation';

const HeaderComponent = () => {
    
    const navigation = useNavigation();
    
    return (
        <Appbar.Header
            style={{ backgroundColor: 'white', alignSelf: 'center' }}>
            <View style={{ marginRight: 15, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginLeft: 0 }}>
                    <MaterialCommunityIcons
                        name="forwardburger"
                        color={'#873600'}
                        size={26}
                        onPress={() => navigation.openDrawer()}
                    />
                </View>
                <LogoTitle />
                <View style={{ marginLeft: 20 }}>
                    <FontAwesome
                        name="bell-o"
                        color={'#873600'}
                        size={20}
                        onPress={() => {
                            navigation.navigate('Notification');
                        }}
                    />
                </View>
            </View>
        </Appbar.Header>
    )
}

export default HeaderComponent