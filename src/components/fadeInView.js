import React, { Component } from 'react';
import {vw, vh} from 'react-native-expo-viewport-units';
import { Animated, Text, View,Dimensions,Button } from 'react-native';

class FadeInView extends Component {
    state = {
        active: {
            height: vh(90),
            width: vw(60)
        },
        inActive: {
            height: new Animated.Value(vh(20)),
            width: new Animated.Value(vw(2))
        }
     }

     animateButton = () => {
         Animated.timing(this.state.inActive.height,
            {
                toValue: this.state.active.height,
                duration: 10000
            }).start();
        Animated.timing(this.state.inActive.width,
            {
                toValue: this.state.active.width,
                duration: 10000
            }).start();
     }
    render() { 
        return ( 
            <Animated.View
            style={{
                ...this.props.style,
                height: this.state.inActive.height,
                width: this.state.inActive.width
            }}>
                {this.props.children}
            </Animated.View>
         );
    }
}
 
export default FadeInView;