import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { headers } from '../../styles/textStyle';
import GWScore from '../gwScore/gwScore';

class NoScoreGW extends Component {
    state = {  }

    render() { 
        return ( 
            <View>
                {this.props.topPlayer ? 
                <View>
                    <GWScore/>
                    <Text style={headers}>No Points Were Scored For This Gameweek! Maybe someone else should take over the admin account..</Text>
                </View>
                :
                <Text style={headers}>No Games Played Yet!</Text>
                }
            </View>
         );
    }
}

export const mapStateToProps = state => {
    return {
        topPlayer: state.club.topPlayer
    }
}
 
export default NoScoreGW;