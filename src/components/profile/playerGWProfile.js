import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { View, Text } from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';
import { capitalize } from '../../functions/reusable';
import profileImg from '../../../images/profile.jpg';
import { centerHorizontally } from '../../styles/align';
import { standardText } from '../../styles/textStyle';
import { modalTextContainer } from '../Modal/style';
import { GWContainer, GWInfoContainer, infoScore, infoTitle, profile, profileContainer, title } from './style';
import GWScore from '../gwScore/gwScore';
import { $arylideYellow, $darkBlue } from '../../styles/global';

const playerGWProfile = pg => {


    renderPointsBreakdown = () => {
        return Object.keys(pg).map(score=>{
            let att = pg[score];
            score = score==="total_points" ? "Points" : score;
            score = score==="goals_conceded" ? "Condeded" : score;
            if (att==null || att=='0' || score=="pg_id" || score=="updated_at" || score=="created_at" || score=="player_id" || score=="gameweek_id" || score=="admin_user_id") {
                return;
            } else {
                return <View style={GWInfoContainer}>
                    <View style={infoTitle}>
                        <Text style={{color: 'white'}}>{capitalize(score)}</Text>
                    </View>
                    <View style={infoScore}>
                        <Text style={{color: $darkBlue}}>{att}</Text>
                    </View>
                </View>
            }
        });
    }

    return ( 
        <View>
            <GWScore width={vw(80)} backgroundColor={$darkBlue}/>
            <View style={GWContainer}>
                {this.renderPointsBreakdown()}
            </View>
        </View>
    );
}
 
export default playerGWProfile;
