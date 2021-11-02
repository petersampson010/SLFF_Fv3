import React, { Component } from 'react';
import { View, Text, Button, Switch, TouchableHighlightBase, TextInput } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { connect } from 'react-redux';
import { loginUser, loginAdminUser, resetTeamPlayers, addSpinner } from '../../actions';
import { fetchUserByEmail, fetchAdminUserByEmail, fetchAllPlayersByAdminUserId, 
  fetchLatestStartersByUserId, fetchLatestSubsByUserId, fetchGwStartersByUserId, fetchGwSubsByUserId, fetchAllRecordsByUserId, 
  fetchAllUsersByAdminUserId, fetchAllGamesByAdminUserId, fetchLeague, fetchLatestGameweekFromAdminUserId, fetchAllPGJoinersFromGameweekId, fetchUGJoiner, fetchUGJoiners, fetchPlayerById, fetchUserById, fetchAdminUserById, fetchAllPGJFromUserId } 
  from '../../functions/APIcalls'; 
import { screenContainer } from '../../styles/global';
import { loginHead, switchText, textLabel } from './style';
import { input, inputFieldLarge, inputFieldContainerCenter } from '../../styles/input';
import { updateStack } from '../../Navigation';


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
      let aUser = await fetchAdminUserByEmail(this.state.userObj);
      this.handleAdminReturn(aUser);
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
      let user = await fetchUserByEmail(this.state.userObj);
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
        let gameweek = await fetchLatestGameweekFromAdminUserId(admin_user_id);
        let clubPlayers = await fetchAllPlayersByAdminUserId(admin_user_id);
        let aUser = await fetchAdminUserById(admin_user_id);
        let latestStarters = await fetchLatestStartersByUserId(user_id);
        let latestSubs = await fetchLatestSubsByUserId(user_id);
        let records = await fetchAllRecordsByUserId(user_id);
        let league = await fetchLeague(admin_user_id);
        if (gameweek) {
          const { gameweek_id } = gameweek;
          let lastGwStarters = await fetchGwStartersByUserId(user_id, gameweek_id);
          let lastGwSubs = await fetchGwSubsByUserId(user_id, gameweek_id);
          let pgJoiners = await fetchAllPGJoinersFromGameweekId(gameweek_id);
          let allPGJoiners = await fetchAllPGJFromUserId(user_id);
          if (pgJoiners.length<1) {
            await this.props.loginUser(user, aUser, clubPlayers, latestStarters, latestSubs, lastGwStarters, lastGwSubs, records, league, gameweek, [], [], null, null, null);
          } else {
            let ugJoiners = await fetchUGJoiners(admin_user_id, gameweek_id);
            let latestUG = await fetchUGJoiner(user_id, gameweek_id);
            let pg = pgJoiners.sort((a,b)=>b.total_points-a.total_points);
            pg = pg[0];
            let topPlayer = pg ? {
              pg,
              player: await fetchPlayerById(pg.player_id)
            } : null;
            let ug = ugJoiners.sort((a,b)=>b.total_points-a.total_points)[0];
            let topUser = ug ? {
              ug,
              user: await fetchUserById(ug.user_id)
            } : null;
            await this.props.loginUser(user, aUser, clubPlayers, latestStarters, latestSubs, lastGwStarters, lastGwSubs, records, league, gameweek, pgJoiners, ugJoiners, latestUG, topPlayer, topUser, allPGJoiners);
          }
        } else {
          await this.props.loginUser(user, aUser, clubPlayers, latestStarters, latestSubs, null, null, records, league, null, [], [], null, null, null, null);
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

  handleAdminReturn = async(aUser) => {
    try {
      if (aUser !== undefined && aUser !== null) {
        let clubPlayers = await fetchAllPlayersByAdminUserId(aUser.admin_user_id);
        let allUsers = await fetchAllUsersByAdminUserId(aUser.admin_user_id);
        let games = await fetchAllGamesByAdminUserId(aUser.admin_user_id);
        await this.props.loginAdminUser(aUser, clubPlayers, allUsers, games);
        updateStack(this.props.navigation, 0, 'AdminHome');
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
              
              <Button title="Sign in" onPress={this.handleSubmit}/>
            </View>
          </View>
        );
    }
  }

  const mapStateToProps = state => {
    return {
      loginComplete: state.loginComplete
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      loginUser: (user, aUser, clubPlayers, latestStarters, latestSubs, lastGwStarters, lastGwSubs, records, league, gameweek, pgJoiners, ugJoiners, latestUG, topPlayer, topUser, allPGJoiners) => dispatch(loginUser(user, aUser, clubPlayers, latestStarters, latestSubs, lastGwStarters, lastGwSubs, records, league, gameweek, pgJoiners, ugJoiners, latestUG, topPlayer, topUser, allPGJoiners)),
      loginAdminUser: (aUser, clubPlayers, allUsers, games) => dispatch(loginAdminUser(aUser, clubPlayers, allUsers, games)),
      resetTeamPlayers: () => dispatch(resetTeamPlayers()),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);