import React, { Component, useState } from 'react';
import { View, Text, Switch, TextInput } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { connect, useDispatch } from 'react-redux';
import { loginUser, loginAdminUser, resetTeamPlayers, addSpinner, removeSpinner } from '../../actions';
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
import { flashMyMessage } from '../../functions/flashMyMessage';


const LoginScreen = ({navigation}) => {

  // EVENTUALLY YOU NEED A CLEAR BREAK BETWEEN LOGGED IN AND NOT 
  // shouldnt be able to go back to login once logged in 
  // just have a log out button 
  // this will clear up the glitch where we had to reset team players as it was rendering double triple players

  const dispatch = useDispatch(), 
  [userObj, updateUserObj] = useState({
    email: '',
    password: ''
  }),
  [admin, updateAdmin] = useState(false);

  
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
      dispatch(addSpinner());
      const { admin_user, token } = await adminUserSignIn(userObj);
      await setStorage('session', JSON.stringify({token, admin_user_id: admin_user.admin_user_id}));
      handleAdminReturn(admin_user);
    } catch(e) {
      dispatch(removeSpinner());
      flashMyMessage(e[0], 'danger');
    }
  }
  
  const handleUserSubmit = async() => {
    try {
      dispatch(addSpinner());
      const { user, token } = await userSignIn(userObj);
      await setStorage('session', JSON.stringify({token, user_id: user.user_id}));
      handleUserReturn(user);
    } catch(e) {
      dispatch(removeSpinner());
      showMessage({
        message: e[0],
        type: "danger"
      })
    }
  }
    
  const handleUserReturn = async(user) => {
    try {
      if (user !== undefined && user !== null) {
        let ud = await userData(user);
        console.log(ud);
        console.log('abov');
        dispatch(await userData(user));
        console.log('hitting past dispatch await');
        dispatch(removeSpinner());
        updateStack(navigation, 0, 'Home');
      } else {
        dispatch(removeSpinner());
        showMessage({
          message: "Login failed, please try again",
          type: "danger"
        })
      }
    } catch(e) {
      console.log('hitting this error');
      dispatch(removeSpinner());
      flashMyMessage(e, 'danger');
    }
  }

  const handleAdminReturn = async(adminUser) => {
    try {
      if (adminUser !== undefined && adminUser !== null) {
        dispatch(await adminData(adminUser));
        dispatch(removeSpinner());
        updateStack(navigation, 0, 'AdminHome');
      } else {
        dispatch(removeSpinner());
        showMessage({
          message: "Login failed, please try again",
          type: "danger"
        })
      }
    } catch(e) {
      dispatch(removeSpinner());
      flashMyMessage(e, 'danger');
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