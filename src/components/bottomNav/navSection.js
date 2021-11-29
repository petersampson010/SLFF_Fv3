import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { connect } from 'react-redux';
import { setTransferringBackToLatest } from '../../actions';
import { getNameOfNavPage } from '../../functions/reusable';
import { hasUserPlayedAGW } from '../../functions/userQuestions';
import { $electricBlue } from '../../styles/global';
import { navSectionBackground, navSectionContainer, navText } from './style';


class NavSection extends Component {
    state = {  }

    currentPage = page => {
        return getNameOfNavPage(this.props.navigation.getState())===page;
    }

    navigate = () => {
        const { page, setTransferringBackToLatest, navigation, lastStarters } = this.props;
        if (page==='Points' && lastStarters.length<1) {
            showMessage({
                message: "There are no points available as no games have been played",
                type: 'warning'
            }) 
        } else {
            setTransferringBackToLatest();
            navigation.navigate(page);
        }
    }

    render() { 
        return (
            <TouchableOpacity onPress={()=>this.navigate()}>
                <View style={navSectionBackground}>
                    <View style={{...navSectionContainer, backgroundColor: this.currentPage(this.props.page) ? $electricBlue : null, borderWidth: this.currentPage(this.props.page) ? 1 : 0, opacity: (this.props.page==='Points' && !this.props.lastStarters) ? 0.4 : 1}}>
                        <Text style={navText}>{this.props.page}</Text>
                    </View>
                </View>
            </TouchableOpacity>
         );
    }
}

const mapStateToProps = state => {
    return {
        lastGW: state.club.lastGW,
        lastStarters: state.user.focusedGWTeam.starters
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTransferringBackToLatest: () => dispatch(setTransferringBackToLatest())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(NavSection);