import React, { Component } from 'react';
import profileImg from '../../../images/profile.jpg';
import { GWContainer, GWInfoContainer, infoScore, infoTitle, profile, profileContainer, title } from './style';
import { View, Text, TouchableOpacity } from 'react-native';
import { capitalize } from '../../functions/reusable';
import { Image } from 'react-native';
import { standardText } from '../../styles/textStyle';
import { centerHorizontally } from '../../styles/align';
import { modalTextContainer } from '../Modal/style';
import { vh, vw } from 'react-native-expo-viewport-units';
import GWScore from '../gwScore/gwScore';
import { $darkBlue } from '../../styles/global';




const userGWProfile = (ug) => {

        renderPointsBreakdown = () => {
            return Object.keys(ug).map(score=>{
                let att = ug[score];
                score = score==="total_points" ? "Points" : score;
                if (att==null || att=='0' || score=="ug_id" || score=="updated_at" || score=="created_at" || score=="user_id" || score=="gameweek_id" || score=="admin_user_id") {
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
            }
         );
    }

    return ( 
        <View>
            <GWScore width={vw(80)} backgroundColor={$darkBlue}/>
            <View style={GWContainer}>
                {this.renderPointsBreakdown()}
            </View>
        </View>
    )
}
 
export default userGWProfile;