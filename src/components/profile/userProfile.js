import React from 'react';
import { View, Text } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';
import { $darkBlue } from '../../styles/global';
import { modalLabelText, standardText } from '../../styles/textStyle';
import { modalSplitContainer } from '../Modal/style';

export const userProfile = (user) => {

return <View style={{...modalSplitContainer, width: vw(34), paddingRight: vw(1), borderRightColor: $darkBlue, borderRightWidth: 2}}>
    <View style={{height: vh(18), paddingRight: vw(1)}}>
        <Text style={modalLabelText}>{user.team_name}</Text>
        <Text style={modalLabelText}>Started on GW: {user.gw_start}</Text>
    </View>
</View>;
}