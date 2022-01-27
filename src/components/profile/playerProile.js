import React, { Component } from 'react';
import { Button, Image, View, Text } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';
import { fullName, positionString } from '../../functions/reusable';
import { $darkBlue } from '../../styles/global';
import { modalLabelText, standardText } from '../../styles/textStyle';
import { modalSplitContainer } from '../Modal/style';
import { buttons, playerBio, playerImg, playerInfo, playerStats, profile, profileContainer, profileFlexContainer } from './style';

export const playerProfile = (player) => 
<View style={{...modalSplitContainer, width: vw(34), borderRightColor: $darkBlue, borderRightWidth: 2}}>
    <View style={{height: vh(18)}}>
        <Text style={modalLabelText}>{fullName(player)}</Text>
        <Text style={modalLabelText}>{positionString(player.position)}</Text>
        <Text style={modalLabelText}>£{player.price}</Text>
        <Text style={modalLabelText}></Text>
    </View>
</View>;