import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { View, Text } from 'react-native';
import { vh, vw } from 'react-native-expo-viewport-units';
import { capitalize, getPointsFromAttr } from '../../functions/reusable';
import profileImg from '../../../images/profile.jpg';
import { centerHorizontally } from '../../styles/align';
import { labelText, standardText } from '../../styles/textStyle';
import { modalTextContainer } from '../Modal/style';
import { GWContainer, GWInfoContainer, infoScore, infoTitle, profile, profileContainer, title } from './style';
import GWScore from '../gwScore/gwScore';
import { $arylideYellow, $darkBlue } from '../../styles/global';
import { banner, bannerText } from '../../screens/PitchScreens/style';
import { tableElement1, tableElement4, tableRow } from '../../styles/table';

const playerGWProfile = (pg, player) => {

    console.log(pg);
    console.log(pg.minutes);


    const renderPointsBreakdown = () => {
        return Object.keys(pg).map(attr=>{
            let score = pg[attr];
            if (attr!=='goals_conceded' || player.position==3 || player.position==4) {
                if (score==null || score=='0' || attr=="pg_id" || attr=="updated_at" || attr=="created_at" || attr=="player_id" || attr=="gameweek_id" || attr=="admin_user_id" || attr=="total_points") {
                    return;
                }
            } else {
                attr = "Conceded";
            }
            return <View style={tableRow}>
                <Text style={{...tableElement1}}>{capitalize(attr)}</Text>
                <Text style={{...tableElement1}}>{score}</Text>
                <Text style={{...tableElement4}}>{getPointsFromAttr(player.position, attr, score)}</Text>
            </View>
        });
    }

    return ( 
        <View style={{width: vw(80)}}>
            <GWScore  backgroundColor={$darkBlue}/>
            {pg.minutes==0 ? null : 
            <View>
                <View style={banner}>
                    <Text style={bannerText}>Points Breakdown</Text>
                </View>
                <View style={tableRow}>
                    <Text style={{...tableElement1}}></Text>
                    <Text style={{...tableElement1}}>Tally</Text>
                    <Text style={{...tableElement4}}>Points</Text>
                </View>
                {renderPointsBreakdown()}
            </View>}
            <View style={{...banner, marginTop: vw(2)}}>
                <Text style={bannerText}>Total Points: {pg.total_points}</Text>
            </View>
        </View>
    );
}
 
export default playerGWProfile;
