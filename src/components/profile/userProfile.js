import React from 'react';
import { View, Text } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';
import { modalLabelText, standardText } from '../../styles/textStyle';
import { modalSplitContainer } from '../Modal/style';

export const userProfile = (user) => {
    console.log('below is user');
    console.log(user);
return <View style={{...modalSplitContainer, width: vw(30)}}>
    <Text>PLEASER RENDER</Text>
    {/* <View style={{padding: vh(1)}}>
        <Text style={modalLabelText}>is this?{user.team_name}</Text>
        <Text style={modalLabelText}>Started on GW: {user.gw_start}</Text>
    </View> */}
</View>;
}