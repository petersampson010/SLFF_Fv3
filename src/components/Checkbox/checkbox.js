import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { $arylideYellow, $darkBlue } from '../../styles/global';
import { captainCheckbox } from '../Modal/style';


const Checkbox = ({ text, func, clickable, active }) => {

        return ( 
            <TouchableOpacity style={{...captainCheckbox, backgroundColor: active ? $arylideYellow : $darkBlue, color: active ? $darkBlue : 'white'}} onPress={clickable ? func : null}>
                    <Text style={{color: active ? $darkBlue : 'white'}}>{text}</Text>
            </TouchableOpacity>
         );
}
 
export default Checkbox;