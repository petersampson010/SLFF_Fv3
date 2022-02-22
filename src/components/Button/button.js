import React from 'react';
import { TouchableOpacity, Text, Image, ImageBackground } from 'react-native'
import { $platinum, $sage } from '../../styles/global';
import { pitchImage } from '../Pitch/style';
import { absoluteButton, buttonContainer, buttonText } from './style';


const Button = ({ text, func, width, clickable, comp, modal, absolute }) => {

        return ( 
            <TouchableOpacity style={{...buttonContainer, width, borderColor: modal ? '#292929' : '#007AFF', ...(absolute ? absoluteButton : null)}} onPress={clickable ? func : null}>
                    {text ? 
                    <Text style={{...buttonText, color: modal ? '#292929' : $platinum}}>{text}</Text>
                    : comp}
            </TouchableOpacity>
         );
}
 
export default Button;