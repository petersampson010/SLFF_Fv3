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
    },
    signedUp: false,
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

  getInfo = async() => {
    const { userObj } = this.state;
    try {
      let allUsers = await getAllUsers();
      let adminUser = await getAdminUserById(parseInt(userObj.clubId));
      let { lastGW } = await getLastAndAllGWs(adminUser.admin_user_id);
      if (validateUser([allUsers], adminUser, userObj)) {
        this.handleSubmit(adminUser, lastGW);
      }
    } catch(e) {
      console.warn(e);
      showMessage({
        message: "Login failed, please try again",
        description: "It is most likely, you have an incorrect club ID. Please check this and report the issue if it continues",
        type: "danger"
      })
    }
  }

  handleSubmit = async(adminUser, lastGW) => {
    const { userObj } = this.state;
    try {
        let userReturn = await postUser({...userObj, gw_start: lastGW ? lastGW.gameweek+1 : 1});
        let userData = userReturn;
          if (userData.transfers===0) {
            this.setState({signedUp: true});
            this.props.setUser(userData);
            this.props.setAdminUser(adminUser);
            getAllPlayersByAdminUserId(adminUser.admin_user_id)
            .then(players => this.props.setClubPlayersAndLastGW(players, lastGW))
            .then(() => updateStack(this.props.navigation, 0, 'nts2'));
          } else {
            console.warn("get return: ", userData);
          }
    } catch(e) {
      showMessage({
        message: "Fail: Network Issue, please try again later",
        type: "danger"
      });
      console.warn(e);
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
              <Button title="Sign Up" onPress={this.getInfo}/>
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