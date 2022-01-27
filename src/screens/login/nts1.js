import { connect } from 'react-redux';
import React, { Component } from 'react';
import { View, Text, Switch, Button, StyleSheet, TextInput, processColor } from 'react-native';
import { getAdminUserById, getAllAdminUsers, getAllPlayersByAdminUserId, getAllUsers, postUser } from '../../functions/APIcalls';
import { validateUser } from '../../functions/validity';
import Header from '../../components/header/header';
import { setAdminUser, setClubPlayersAndLastGW, setUser } from '../../actions';
import { showMessage } from 'react-native-flash-message';
import { screenContainer } from '../../styles/global';
import { inputField, inputFieldsContainer, loginHead, switchText, textLabel } from './style';
import { inputFieldContainerCenter, inputFieldLarge, input } from '../../styles/input';
import { updateStack } from '../../Navigation';
import globalConfig from '../../config/globalConfig.json';
import { getLastAndAllGWs } from '../../functions/reusable';
import { setStorage } from '../../functions/storage';



class ntsScreen1 extends Component {

  state = {
    userObj: {
      email: '',
      team_name: '',
      password: '',
      rePassword: '',
      clubId: '',
      terms: '',
      budget: globalConfig.startBudget
    }
  }

  formChange = (id, entry) => {
    switch(id) {
      case 'email': 
        this.setState({...this.state, userObj: {...this.state.userObj, email: entry}})
        break;
      case 'team_name': 
        this.setState({...this.state, userObj: {...this.state.userObj, team_name: entry}})
        break;
      case 'password': 
        this.setState({...this.state, userObj: {...this.state.userObj, password: entry}})
        break;
      case 'rePassword': 
        this.setState({...this.state, userObj: {...this.state.userObj, rePassword: entry}})
        break;
      case 'clubID':
        this.setState({...this.state, userObj: {...this.state.userObj, clubId: entry}})
    }
  }

  checkPassword = () => {
    if (this.state.userObj.password===this.state.userObj.rePassword) {
      return true;
    } else {
      showMessage({
        message: "Passwords do not match, please try again!",
        description: "If you need a sub-section of error",
        type: "warning"
      });
      return false;
    }
  }
        
    handleSubmit = async() => {
    const { userObj } = this.state;
    try {
      this.checkPassword();
      let userData = {admin_user_id: userObj.clubId, email: userObj.email, password: userObj.password, team_name: userObj.team_name, gw_start: null, budget: globalConfig.startBudget};
      const { token, user } = await postUser(userData);
      await setStorage('session', JSON.stringify({token, user_id: user.user_id}));
      let adminUser = await getAdminUserById(user.admin_user_id);
      let { lastGW } = await getLastAndAllGWs(user.admin_user_id)
      this.props.setUser(user);
      this.props.setAdminUser(adminUser);
      let allPlayers = await getAllPlayersByAdminUserId(adminUser.admin_user_id);
      this.props.setClubPlayersAndLastGW(allPlayers, lastGW);
      updateStack(this.props.navigation, 0, 'nts2');
    } catch(e) {
      showMessage({
        message: e.response.data,
        type: "danger"
      });
      console.warn(e.response.data);
    }
  }

  render() {
    return (
      <View style={screenContainer}>
            <View style={inputFieldContainerCenter}>
              <Text style={loginHead}>Create Account</Text>
              <Text style={textLabel}>Enter your email address</Text>
              <View style={inputFieldLarge}>
                <TextInput style={input}
                value={this.state.userObj.email} 
                onChangeText={value => this.formChange('email', value)}
                placeholder="email@address.com"
                placeholderTextColor='#d1d2d6'
                autoCapitalize="none"
                />
              </View>
              <Text style={textLabel}>Enter your team name</Text>
              <View style={inputFieldLarge}>
                <TextInput style={input}
                value={this.state.userObj.team_name} 
                onChangeText={value => this.formChange('team_name', value)}
                placeholder="Sunday Funday"
                placeholderTextColor='#d1d2d6'
                />
              </View>
              <Text style={textLabel}>Enter your password</Text>
              <View style={inputFieldLarge}>
                <TextInput style={input}
                value={this.state.userObj.password} 
                onChangeText={value => this.formChange('password', value)}
                placeholder="Password"
                placeholderTextColor='#d1d2d6'
                autoCapitalize="none"
                secureTextEntry
                />
              </View>
              <Text style={textLabel}>Re-enter your password</Text>
              <View style={inputFieldLarge}>
                <TextInput style={input}
                value={this.state.userObj.rePassword} 
                onChangeText={value => this.formChange('rePassword', value)}
                placeholder="Password"
                placeholderTextColor='#d1d2d6'
                autoCapitalize="none"
                secureTextEntry
                />
              </View>
              <Text style={textLabel}>Club ID</Text>
              <View style={inputFieldLarge}>
                <TextInput style={input}
                value={this.state.userObj.clubId} 
                onChangeText={value => this.formChange('clubID', value)}
                placeholder="24"
                placeholderTextColor='#d1d2d6'
                autoCapitalize="none"
                />
              </View>
              <Button clickable title="Sign Up" onPress={this.handleSubmit}/>
            </View>
          </View>
    );
  }
}

const mapStateToProps = state => {
  return {

  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: user => dispatch(setUser(user)),
    setAdminUser: adminUser => dispatch(setAdminUser(adminUser)),
    setClubPlayersAndLastGW: (players, lastGW) => dispatch(setClubPlayersAndLastGW(players, lastGW))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ntsScreen1);