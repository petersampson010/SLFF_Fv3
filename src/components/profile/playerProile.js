import React, { Component } from 'react';
import { Button, Image, View, Text } from 'react-native';
import { buttons, playerBio, playerImg, playerInfo, playerStats, profile, profileContainer, profileFlexContainer } from './style';

class PlayerProfile extends Component {
    state = {  }
    render() { 
        return ( 
            <View style={profileContainer}>
                <View syle={profileFlexContainer}></View>
                <Text>SHOWING</Text>
                <View style={playerInfo}>
                    <Image style={playerImg}/>
                    <View syle={playerBio}>
                        <Text>Defender</Text>
                        <Text>Peter Sampson</Text>
                    </View>
                </View>
                <View style={playerStats}>
                    <Text>STATS</Text>
                </View>
                <View style={buttons}>
                    <Button title="Remove/Sub"/>
                    <Button title="Close"/>
                </View>
            </View>
         );
    }
}
 
export default PlayerProfile;