import React, { Component } from 'react';
import { TouchableOpacity, Text, Image, ImageBackground } from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';
import { getRecordsByGWIdAndUserId } from '../../functions/APIcalls';
import { $arylideYellow, $chocolateBlack, $col2, $darkBlue, $inputBlue, $offWhite, $platinum, $sage } from '../../styles/global';
import { captainCheckbox } from '../Modal/style';
import { pitchImage } from '../Pitch/style';
// import { buttonContainer, buttonText } from './style';


class Checkbox extends Component {


    render() { 
        const { text, func, clickable, active } = this.props;
        return ( 
            <TouchableOpacity style={{...captainCheckbox, backgroundColor: active ? $arylideYellow : $darkBlue, color: active ? $darkBlue : 'white'}} onPress={clickable ? func : null}>
                    <Text style={{color: active ? $darkBlue : 'white'}}>{text}</Text>
            </TouchableOpacity>
         );
    }
}
 
export default Checkbox;