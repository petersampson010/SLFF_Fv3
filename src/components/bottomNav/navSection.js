import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { setTransferringBackToLatest } from '../../actions';
import { getNameOfNavPage } from '../../functions/reusable';
import { $electricBlue } from '../../styles/global';
import { navSectionBackground, navSectionContainer, navText } from './style';


class NavSection extends Component {
    state = {  }

    currentPage = page => {
        return getNameOfNavPage(this.props.navigation.getState())===page;
    }

    navigate = () => {
        this.props.setTransferringBackToLatest();
        this.props.navigation.navigate(this.props.page);
    }

    render() { 
        return (
            <TouchableOpacity onPress={()=>this.navigate()}>
                <View style={navSectionBackground}>
                    <View style={{...navSectionContainer, backgroundColor: this.currentPage(this.props.page) ? $electricBlue : null, borderWidth: this.currentPage(this.props.page) ? 1 : 0}}>
                        <Text style={navText}>{this.props.page}</Text>
                    </View>
                </View>
            </TouchableOpacity>
         );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setTransferringBackToLatest: () => dispatch(setTransferringBackToLatest())
    }
}
 
export default connect(null, mapDispatchToProps)(NavSection);