import React, { Component } from 'react';
import { View, Text, Switch, TouchableHighlightBase, TextInput } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { connect } from 'react-redux';
import { loginUser, loginAdminUser, resetTeamPlayers, addSpinner } from '../../actions';
import { getUserByEmail, getAdminUserByEmail, getAllPlayersByAdminUserId, getAllRecordsByUserId, getPlayersByUserIdGWIdSub, 
  getAllUsersByAdminUserId, getAllGamesByAdminUserId, getLeague, getAllGWsFromAdminUserId, getAllPGJsFromGameweekId, getUGJ, getUGJs, getPlayerById, getUserById, getAdminUserById, getAllPGJFromUserId } 
  from '../../functions/APIcalls'; 
import { screenContainer } from '../../styles/global';
import { loginHead, switchText, textLabel } from './style';
import { input, inputFieldLarge, inputFieldContainerCenter } from '../../styles/input';
import { updateStack } from '../../Navigation';
import { getLastAndAllGWs } from '../../functions/reusable';
import Button from '../../components/Button/button';
import { vw } from 'react-native-expo-viewport-units';


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
      let adminUser = await getAdminUserByEmail(this.state.userObj);
      this.handleAdminReturn(adminUser);
    } catch(e) {
      showMessage({
        message: "Login failed, please try again",
        type: "danger"
      })
      console.warn(e);
    }
  }
  
  handleUserSubmit = async() => {
    try {
      let user = await getUserByEmail(this.state.userObj);
      this.handleUserReturn(user);
    } catch(e) {
      showMessage({
        message: "Login failed, please try again",
        type: "danger"
      })
      console.warn(e);
    }
  }
    
  handleUserReturn = async(user) => {
    try {
      if (user !== undefined && user !== null) {
        const { admin_user_id, user_id } = user;
        let { lastGW } = await getLastAndAllGWs(admin_user_id);
        let clubPlayers = await getAllPlayersByAdminUserId(admin_user_id);
        let adminUser = await getAdminUserById(admin_user_id);
        let currentStarters = await getPlayersByUserIdGWIdSub(user_id, 0, false);
        let currentSubs = await getPlayersByUserIdGWIdSub(user_id, 0, true);
        let records = await getAllRecordsByUserId(user_id);
        let league = await getLeague(admin_user_id);
        if (lastGW) {
          const { gameweek_id } = lastGW;
          let lastGWStarters = await getPlayersByUserIdGWIdSub(user_id, gameweek_id, false);
          let lastGWSubs = await getPlayersByUserIdGWIdSub(user_id, gameweek_id, true);
          let lastPGJs = await getAllPGJsFromGameweekId(gameweek_id);
          if (lastPGJs.length<1) {
            await this.props.loginUser(user, adminUser, clubPlayers, currentStarters, currentSubs, lastGWStarters, lastGWSubs, records, league, lastGW, lastPGJs, [], [], null, null, []);
          } else {
            let allPGJs = await getAllPGJFromUserId(user_id);
            let allLastUGJs = await getUGJs(admin_user_id, gameweek_id);
            let lastUGJ = await getUGJ(user_id, gameweek_id);
            let pg = lastPGJs.sort((a,b)=>b.total_points-a.total_points);
            pg = pg[0];
            let topPlayer = pg ? {
              pg,
              player: await getPlayerById(pg.player_id)
            } : null;
            let ug = allLastUGJs.sort((a,b)=>b.total_points-a.total_points)[0];
            let topUser = ug ? {
              ug,
              user: await getUserById(ug.user_id)
            } : null;
            await this.props.loginUser(user, adminUser, clubPlayers, currentStarters, currentSubs, lastGWStarters, lastGWSubs, records, league, lastGW, lastUGJ, lastPGJs, allLastUGJs, topPlayer, topUser, allPGJs);
          }
        } else {
          await this.props.loginUser(user, adminUser, clubPlayers, currentStarters, currentSubs, [], [], records, league, null, null, [], [], null, null, []);
        }
        updateStack(this.props.navigation, 0, 'Home');
      } else {
        // this.setState({email: 'A',
        // password: 'A'});
        showMessage({
          message: "Login failed, please try again",
          type: "danger"
        })
      }
    } catch(e) {
      showMessage({
        message: "Login failed, please try again",
        type: "danger"
      })
      console.warn(e);
    }
  }

  handleAdminReturn = async(adminUser) => {
    try {
      if (adminUser !== undefined && adminUser !== null) {
        let clubPlayers = await getAllPlayersByAdminUserId(adminUser.admin_user_id);
        let allUsers = await getAllUsersByAdminUserId(adminUser.admin_user_id);
        let { lastGW, GWs } = await getLastAndAllGWs(adminUser.admin_user_id);
        this.props.loginAdminUser(adminUser, clubPlayers, allUsers, GWs, lastGW);
        updateStack(this.props.navigation, 0, 'AdminHome');
      } else {
        showMessage({
          message: "Login failed, please try again",
          type: "danger"
        })
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
      loginUser: (user, adminUser, clubPlayers, currentStarters, currentSubs, lastGWStarters, lastGWSubs, records, league, GW, lastPGJs, UGJs, lastUGJ, topPlayer, topUser, allPGJs) => dispatch(loginUser(user, adminUser, clubPlayers, currentStarters, currentSubs, lastGWStarters, lastGWSubs, records, league, GW, lastPGJs, UGJs, lastUGJ, topPlayer, topUser, allPGJs)),
      loginAdminUser: (adminUser, clubPlayers, allUsers, GWs, lastGW) => dispatch(loginAdminUser(adminUser, clubPlayers, allUsers, GWs, lastGW)),
      resetTeamPlayers: () => dispatch(resetTeamPlayers()),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);