import React, { Component } from 'react';
import { TouchableOpacity, Text, Image, ImageBackground } from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';
import { getRecordsByGWIdAndUserId } from '../../functions/APIcalls';
import { $arylideYellow, $chocolateBlack, $col2, $inputBlue, $offWhite, $platinum, $sage } from '../../styles/global';
import { pitchImage } from '../Pitch/style';
import { absoluteButton, buttonContainer, buttonText } from './style';


class Button extends Component {


    render() { 
        const { text, func, width, clickable, comp, modal, absolute } = this.props;
        return ( 
            <TouchableOpacity style={{...buttonContainer, width, borderColor: modal ? '#292929' : $platinum, ...(absolute ? absoluteButton : null)}} onPress={clickable ? func : null}>
                    {text ? 
                    <Text style={{...buttonText, color: modal ? '#292929' : $platinum}}>{text}</Text>
                    : comp}
            </TouchableOpacity>
         );
    }
}
 
export default Button;