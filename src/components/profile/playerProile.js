import React, { Component } from 'react';
import { Button, Image, View, Text } from 'react-native';
import { vw, vh } from 'react-native-expo-viewport-units';
import { fullName, positionString } from '../../functions/reusable';
import { standardText } from '../../styles/textStyle';
import { modalSplitContainer } from '../Modal/style';
import { buttons, playerBio, playerImg, playerInfo, playerStats, profile, profileContainer, profileFlexContainer } from './style';

export const playerProfile = player => 
<View style={{...modalSplitContainer, width: vw(30)}}>
    <View style={{padding: vh(1)}}>
        <Text style={standardText}>{fullName(player)}</Text>
        <Text style={standardText}>{positionString(player.position)}</Text>
        <Text style={standardText}>£{player.price}</Text>
        <Text style={standardText}></Text>
    </View>
</View>;