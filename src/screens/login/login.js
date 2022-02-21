import React, { Component, useState } from 'react';
import { View, Text, Switch, TextInput } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { connect, useDispatch } from 'react-redux';
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


const LoginScreen = ({navigation}) => {

  // EVENTUALLY YOU NEED A CLEAR BREAK BETWEEN LOGGED IN AND NOT 
  // shouldnt be able to go back to login once logged in 
  // just have a log out button 
  // this will clear up the glitch where we had to reset team players as it was rendering double triple players

  const [useObj, updateUserObj] = useState({
    email: '',
    password: ''
  }),
  [admin, updateAdmin] = useState(false),
  loginUser = useDispatch(obj => obj),
  loginAdminUser = useDispatch(obj => obj),
  resetTeamPlayersFUNC = useDispatch(() =>  resetTeamPlayers());

  
  const formChange = (id, entry) => {
    updateUserObj({...userObj,
        [id]: entry
    })
  }
  
  const toggleSwitch = () => {
    updateUserObj({...userObj, terms: !userObj.terms})
  }

  const toggleAdmin = () => {
    updateAdmin(!admin)
  }

  const handleSubmit = () => {
    if (admin) {
      handleAdminSubmit();
    } else {
      handleUserSubmit();
    }
  }

  const handleAdminSubmit = async() => {
    try {
      const { admin_user, token } = await adminUserSignIn(userObj);
      await setStorage('session', JSON.stringify({token, admin_user_id: admin_user.admin_user_id}));
      handleAdminReturn(admin_user);
    } catch(e) {
      showMessage({
        message: e.response.data,
        type: "danger"
      })
      console.warn(e.response.data);
    }
  }
  
  const handleUserSubmit = async() => {
    try {
      const { user, token } = await userSignIn(userObj);
      await setStorage('session', JSON.stringify({token, user_id: user.user_id}));
      handleUserReturn(user);
    } catch(e) {
      showMessage({
        message: e.response.data,
        type: "danger"
      })
      console.warn(e.response.data);
    }
  }
    
  const handleUserReturn = async(user) => {
    try {
      if (user !== undefined && user !== null) {
        loginUser(await userData(user));
        updateStack(navigation, 0, 'Home');
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

  const handleAdminReturn = async(adminUser) => {
    try {
      if (adminUser !== undefined && adminUser !== null) {
        loginAdminUser(await adminData(adminUser));
        updateStack(navigation, 0, 'AdminHome');
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

        return (
          <View style={screenContainer}>
            <View style={inputFieldContainerCenter}>
              <Text style={loginHead}>{admin ? 'Admin Account Login' : 'User Account Login'}</Text>
              <Switch value={admin} onValueChange={toggleAdmin} />
              <Text style={switchText}>Switch Admin/User Login</Text>
              <Text style={textLabel}>Enter your email address</Text>
              <View style={inputFieldLarge}>
                <TextInput style={input}
                value={userObj.email} 
                onChangeText={value => formChange('email', value)}
                placeholder="email@address.com"
                placeholderTextColor='#d1d2d6'
                autoCapitalize="none"
                />
              </View>
              <Text style={textLabel}>Enter your password</Text>
              <View style={inputFieldLarge}>
                <TextInput style={input}
                value={userObj.password} 
                onChangeText={value => formChange('password', value)}
                placeholder="Password"
                placeholderTextColor='#d1d2d6'
                autoCapitalize="none"
                secureTextEntry
                />
              </View>
              <Button clickable width={vw(35)} text="Sign in" func={handleSubmit}/>
            </View>
          </View>
        );
  }

export default LoginScreen;