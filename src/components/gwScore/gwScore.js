import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { headers } from '../../styles/textStyle';
import { headerText } from '../header/style';

class GWScore extends Component {
    state = {  }

    render() { 
        const { adminUser, gwLatest } = this.props;
        return (
            <View>
                {/* <Text style={headerText}>{adminUser.club_name} {gwLatest.score} {gwLatest.opponent}</Text> */}
            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        adminUser: state.club.adminUser,
        lastGW: state.club.lastGW
    }
}
 
export default connect(mapStateToProps)(GWScore);