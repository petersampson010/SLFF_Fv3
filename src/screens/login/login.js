import React, { Component } from 'react';
import { View, Text, Switch, TouchableHighlightBase, TextInput } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { connect } from 'react-redux';
import { loginUser, loginAdminUser, resetTeamPlayers, addSpinner } from '../../actions';
import { getUserByEmail, getAdminUserByEmail, getAllPlayersByAdminUserId, getAllRecordsByUserId, getPlayersByUserIdGWIdSub, 
  getAllUsersByAdminUserId, getAllGamesByAdminUserId, getLeague, getAllGWsFromAdminUserId, getAllPGJsFromGameweekId, getUGJ, getUGJs, getPlayerById, getUserById, getAdminUserById, getAllPGJFromUserId, adminUserSignIn, userSignIn } 
  from '../../functions/APIcalls'; 
import { screenContainer } from '../../styles/global';
import { loginHead, switchText, textLabel } from './style';
import { input, inputFieldLarge, inputFieldContainerCenter } from '../../styles/input';
import { updateStack } from '../../Navigation';
import { getLastAndAllGWs } from '../../functions/reusable';
import Button from '../../components/Button/button';
import { vw } from 'react-native-expo-viewport-units';
import { getStorage, setStorage } from '../../functions/storage';
import userData from '../../functions/GetAndSet/userData';
import adminData from '../../functions/GetAndSet/adminData';


class LoginScreen extends Component {

  // EVENTUALLY YOU NEED A CLEAR BREAK BETWEEN LOGGED IN AND NOT 
  // shouldnt be able to go back to login once logged in 
  // just have a log out button 
  // this will clear up the glitch where we had to reset team players as it was rendering double triple players
  
  state = {
    userObj: {
      email: '',
      password: ''
    },
    admin: false,
    loginComplete: false
  }
  
  formChange = (id, entry) => {
    this.setState({...this.state, 
      userObj: {...this.state.userObj,
        [id]: entry
      }
    })
  }
  
  toggleSwitch = () => {
    this.setState({
      ...this.state, userObj: {...this.state.userObj, terms: !this.state.userObj.terms}
    })
  }

  toggleAdmin = () => {
    this.setState({
      ...this.state, admin: !this.state.admin
    })
  }

  handleSubmit = () => {
    if (this.state.admin) {
      this.handleAdminSubmit();
    } else {
      this.handleUserSubmit();
    }
  }

  handleAdminSubmit = async() => {
    try {
      const { admin_user, token } = await adminUserSignIn(this.state.userObj);
      await setStorage('session', JSON.stringify({token, admin_user_id: admin_user.admin_user_id}));
      console.log('set Admin Token');
      this.handleAdminReturn(admin_user);
    } catch(e) {
      showMessage({
        message: e.response.data,
        type: "danger"
      })
      console.warn(e.response.data);
    }
  }
  
  handleUserSubmit = async() => {
    try {
      const { user, token } = await userSignIn(this.state.userObj);
      await setStorage('session', JSON.stringify({token, user_id: user.user_id}));
      console.log('set User Token');
      this.handleUserReturn(user);
    } catch(e) {
      showMessage({
        message: e.response.data,
        type: "danger"
      })
      console.warn(e.response.data);
    }
  }
    
  handleUserReturn = async(user) => {
    try {
      if (user !== undefined && user !== null) {
        console.log('**** ATTEMPTING TO SET USER DATA ****')
        this.props.loginUser(await userData(user));
        updateStack(this.props.navigation, 0, 'Home');
      } else {
        showMessage({
          message: "Login failed, please try again",
          type: "danger"
        })
      }
    } catch(e) {
      showMessage({
        message: e.response.data,
        type: "danger"
      })
      console.warn(e.response.data);
    }
  }

  handleAdminReturn = async(adminUser) => {
    try {
      if (adminUser !== undefined && adminUser !== null) {
        this.props.loginAdminUser(await adminData(adminUser));
        updateStack(this.props.navigation, 0, 'AdminHome');
      } else {
        showMessage({
          message: "Login failed, please try again",
          type: "danger"
        })
      }
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
              <Text style={loginHead}>{this.state.admin ? 'Admin Account Login' : 'User Account Login'}</Text>
              <Switch value={this.state.admin} onValueChange={this.toggleAdmin} />
              <Text style={switchText}>Switch Admin/User Login</Text>
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
              <Button clickable width={vw(35)} text="Sign in" func={this.handleSubmit}/>
            </View>
          </View>
        );
    }
  }

  const mapStateToProps = state => {
    return {
      loginComplete: state.boolDeciders.loginComplete
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      loginUser: obj => dispatch(obj),
      loginAdminUser: obj => dispatch(obj),
      resetTeamPlayers: () => dispatch(resetTeamPlayers()),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);