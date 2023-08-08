import {
    Platform,
    StyleSheet,    
    Dimensions,
} from 'react-native';


const { width, height } = Dimensions.get("screen");
const height_logo = height * 0.12;
const width_logo = width * 0.8;

export const StyleAddress = StyleSheet.create({
    container:{flex:1, backgroundColor:'#FAD7A0'},
    image:{ height: 200,width: 200,resizeMode: 'cover',alignSelf: 'center'},
    handlefotos: {flexDirection:'row' ,justifyContent:'space-evenly', marginTop:8},


})