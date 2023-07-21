import React ,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux'
import InitStack from './InitStack';
import AppStack from './AppStack';


const Navigation = () => {  

    let state = useSelector((state) => state) 

    useEffect(() => {
     console.log('state ',JSON.stringify(state, null, 5))
    }, [ state.logger.user.logged])
    
      
  return (
    <NavigationContainer> 
       { state.logger.user.logged ? <AppStack/> : <InitStack/> }
    </NavigationContainer>
  )
}

export default Navigation