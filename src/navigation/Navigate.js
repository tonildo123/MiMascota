import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import InitStack from './InitStack';
import AppStack from './AppStack';


const Navigation = () => {  

let {logged} = useSelector((state) => state.logger.user) 

  return (
    <NavigationContainer> 
       { logged ? <AppStack/> : <InitStack/> }
    </NavigationContainer>
  )
}

export default Navigation