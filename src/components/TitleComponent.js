import {Appbar} from 'react-native-paper';
import React from 'react';


const TitleComponent = ({title}) => {
  return (    
      <Appbar.Header style={{backgroundColor: '#A04000'}}>
        <Appbar.Content title={title} style={{ alignItems:'center'}}/>
        <Appbar.Action />
      </Appbar.Header>    
  )
}

export default TitleComponent