import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { buttonContainer, buttonText } from './style';


class Button extends Component {
    
    render() { 
        const { text, func, width, clickable } = this.props;
        return ( 
            <TouchableOpacity style={{...buttonContainer, width, backgroundColor: clickable ? null : 'black'}} onPress={clickable ? func : null}>
                <Text style={buttonText}>{text}</Text>
            </TouchableOpacity>
         );
    }
}
 
export default Button;