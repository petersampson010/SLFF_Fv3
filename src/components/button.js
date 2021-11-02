import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { buttonContainer, buttonText } from '../styles/button';


class Button extends Component {
    
    render() { 
        const { text, func, width } = this.props;
        return ( 
            <TouchableOpacity style={{...buttonContainer, width}} onPress={func}>
                <Text style={buttonText}>{text}</Text>
            </TouchableOpacity>
         );
    }
}
 
export default Button;