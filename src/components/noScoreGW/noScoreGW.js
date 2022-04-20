import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { headers } from '../../styles/textStyle';
import GWScore from '../gwScore/gwScore';
import { paddedHeader } from './style';

const NoScoreGW = () => {

    const topPlayer = useSelector(state => state.club.topPlayer);

        return ( 
            <View>
                {topPlayer ? 
                <View>
                    <GWScore/>
                    <Text style={paddedHeader}>No Points Were Scored For This Gameweek! Maybe someone else should take over the admin account..</Text>
                </View>
                :
                <Text style={paddedHeader}>No Games Played Yet!</Text>
                }
            </View>
         );
}
 
export default NoScoreGW;