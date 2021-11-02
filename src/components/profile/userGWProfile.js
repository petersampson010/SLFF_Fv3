import React, { Component } from 'react';
import profileImg from '../../images/profile.jpg';
import { profile, profileContainer, title } from './style';
import { View, Text, TouchableOpacity } from 'react-native';
import { capitalize } from '../../functions/reusable';
import { Image } from 'react-native';
import { standardText } from '../../styles/textStyle';
import { centerHorizontally } from '../../styles/align';
import { modalTextContainer } from '../Modal/style';
import MyModal from '../Modal/myModal';
import { vh, vw } from 'react-native-expo-viewport-units';




class UserGWProfile extends Component {

    render() { 
        const { user } = this.props;
        return ( 
            <TouchableOpacity style={profileContainer}
            onPress={() => this.props.openModal('topUser')}>
                <Text style={title}>Club</Text>
                <Text style={standardText}>{user.user.teamname ? user.user.teamname : ''}</Text>
                <View style={centerHorizontally}>
                    <Image
                    style={profile}
                    source={profileImg}/>
                </View>
                <Text style={standardText}>Total Points: {user.ug.total_points}</Text>
                <MyModal 
                        visible={this.props.topUserModal}
                        height={vh(33)}
                        width={vw(80)}
                        closeModalFcn={()=>this.props.closeModal('topUser')}
                        modalType="userProfile"
                        entry={user}
                        buttonOptions={[]}
                        />
            </TouchableOpacity>
         );
    }
}
 
export default UserGWProfile;