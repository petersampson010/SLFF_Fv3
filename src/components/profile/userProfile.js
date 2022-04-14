import React from 'react';
import { View, Text } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';
import { useSelector } from 'react-redux';
import { $darkBlue } from '../../styles/global';
import { modalLabelText, standardText } from '../../styles/textStyle';
import { modalSplitContainer } from '../Modal/style';

export const userProfile = (user) => {

    const league = useSelector(state => state.club.league);

    return <View style={{...modalSplitContainer, width: vw(34), paddingRight: vw(1), borderRightColor: $darkBlue, borderRightWidth: 2}}>
        <View style={{height: vh(18), paddingRight: vw(1)}}>
            <Text style={modalLabelText}>{user.team_name}</Text>
            <Text style={modalLabelText}>League Position: {league.findIndex(u => u.user_id===user.user_id)+1}</Text>
        </View>
    </View>;
}