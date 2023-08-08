// In App.js in a new project

import React ,{useEffect} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/login';
import RegisterScreen from '../screens/register';
import ForgotPassword from '../screens/forgotpass';
import { useDispatch } from 'react-redux';
import { profileClean } from '../state/Profileslice';
import { petClean } from '../state/PetSlice';
import { addressClean } from '../state/AddressSlice';
import { ownClean } from '../state/OwnSlice';
import { hcClean } from '../state/ClinicalSlice';


const Stack = createNativeStackNavigator();

function InitStack() {

    const distpach = useDispatch()

    useEffect(() => {
        cleanStates()      
    }, [])

    const cleanStates = ()=>{

        distpach(profileClean())
        distpach(petClean())
        distpach(addressClean())
        distpach(ownClean())
        distpach(hcClean())

    }
    

return (
    
    <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{
            headerTitle: '',
            headerStyle: { backgroundColor: '#BA4A00',},
        }}/>
         <Stack.Screen name="Register" component={RegisterScreen} options={{
            headerTitle: '',
            headerStyle: { backgroundColor: '#BA4A00',},
        }}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{
            headerTitle: '',
            headerStyle: { backgroundColor: '#BA4A00',},
        }}/>
    </Stack.Navigator>
    
);
}

export default InitStack;