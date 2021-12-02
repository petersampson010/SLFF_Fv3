import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { buttonContainer, buttonText } from './style';


class Button extends Component {
    
    render() { 
        const { text, func, width, clickable, comp } = this.props;
        return ( 
            <TouchableOpacity style={{...buttonContainer, width, backgroundColor: clickable ? null : 'black'}} onPress={clickable ? func : null}>
                {text ? 
                <Text style={buttonText}>{text}</Text>
                : comp}
            </TouchableOpacity>
         );
    }
}
 
export default Button;