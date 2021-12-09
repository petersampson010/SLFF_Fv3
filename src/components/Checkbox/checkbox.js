import React, { Component } from 'react';
import { TouchableOpacity, Text, Image, ImageBackground } from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';
import { getRecordsByGWIdAndUserId } from '../../functions/APIcalls';
import { $arylideYellow, $chocolateBlack, $col2, $inputBlue, $offWhite, $platinum, $sage } from '../../styles/global';
import { captainCheckbox } from '../Modal/style';
import { pitchImage } from '../Pitch/style';
// import { buttonContainer, buttonText } from './style';


class Checkbox extends Component {


    render() { 
        const { text, func, clickable, active } = this.props;
        return ( 
            <TouchableOpacity style={{...captainCheckbox, backgroundColor: active ? 'green' : 'white'}} onPress={clickable ? func : null}>
                    <Text style={{}}>{text}</Text>
            </TouchableOpacity>
         );
    }
}
 
export default Checkbox;