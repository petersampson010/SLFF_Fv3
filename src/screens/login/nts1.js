import { connect, useDispatch } from 'react-redux';
import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text, Switch, StyleSheet, TextInput, processColor, ScrollView, Keyboard } from 'react-native';
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
import { vh, vw } from 'react-native-expo-viewport-units';
import Button from '../../components/Button/button';



const ntsScreen1 = ({navigation}) => {

  const dispatch = useDispatch(),
  scrollRef = useRef(),
  [userObj, updateUserObj] = useState({
    email: '',
    team_name: '',
    password: '',
    rePassword: '',
    clubId: '',
    terms: '',
    budget: globalConfig.startBudget
  }),
  [verified, updateVerified] = useState(false);

  Keyboard.addListener('keyboardDidHide', () => scrollRef.current?.scrollTo({y: 0, animated: true}));

  const formChange = (id, entry) => {
    switch(id) {
      case 'email': 
        updateUserObj({...userObj, email: entry})
        break;
      case 'team_name': 
        updateUserObj({...userObj, team_name: entry})
        break;
      case 'password': 
        updateUserObj({...userObj, password: entry})
        break;
      case 'rePassword': 
        updateUserObj({...userObj, rePassword: entry})
        break;
      case 'clubID':
        updateUserObj({...userObj, clubId: entry})
    }
  }

  const checkPassword = () => {
    if (userObj.password===userObj.rePassword) {
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
        
    const handleSubmit = async() => {
    try {
      checkPassword();
      let userData = {admin_user_id: userObj.clubId, email: userObj.email, password: userObj.password, team_name: userObj.team_name, gw_start: null, budget: globalConfig.startBudget};
      const { token, user } = await postUser(userData);
      console.log(token);
      console.log(user);
      await setStorage('session', JSON.stringify({token, user_id: user.user_id}));
      console.log('test2');

      let adminUser = await getAdminUserById(user.admin_user_id);
      console.log(adminUser);
      console.log('teest3');

      let { lastGW } = await getLastAndAllGWs(user.admin_user_id);
      console.log('test4');
      console.log(lastGW);

      dispatch(setUser(user));
      dispatch(setAdminUser(adminUser));
      console.log('6');

      let allPlayers = await getAllPlayersByAdminUserId(adminUser.admin_user_id);
      dispatch(setClubPlayersAndLastGW(allPlayers, lastGW));
      updateStack(navigation, 0, 'nts2');
    } catch(e) {
      showMessage({
        message: e,
        type: "danger"
      });
      console.warn(e);
    }
  }

    return (
      <View style={screenContainer}>
            <View style={inputFieldContainerCenter}>
              <Text style={loginHead}>Create Account</Text>
              <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              ref={scrollRef}>
                <View style={{height: vh(90)}}>
                <Text style={textLabel}>Enter your email address</Text>
                <View style={inputFieldLarge}>
                  <TextInput style={input}
                  onFocus={()=>scrollRef.current?.scrollTo({y: 0, animated: true})}
                  value={userObj.email} 
                  onChangeText={value => formChange('email', value)}
                  placeholder="email@address.com"
                  placeholderTextColor='#d1d2d6'
                  autoCapitalize="none"
                  />
                </View>
                <Text style={textLabel}>Enter your team name</Text>
                <View style={inputFieldLarge}>
                  <TextInput style={input}
                  onFocus={()=>scrollRef.current?.scrollTo({y: 0, animated: true})}
                  value={userObj.team_name} 
                  onChangeText={value => formChange('team_name', value)}
                  placeholder="Sunday Funday"
                  placeholderTextColor='#d1d2d6'
                  />
                </View>
                <Text style={textLabel}>Enter your password</Text>
                <View style={inputFieldLarge}>
                  <TextInput style={input}
                  onFocus={()=>scrollRef.current?.scrollTo({y: 45, animated: true})}
                  value={userObj.password} 
                  onChangeText={value => formChange('password', value)}
                  placeholder="Password"
                  placeholderTextColor='#d1d2d6'
                  autoCapitalize="none"
                  secureTextEntry
                  />
                </View>
                <Text style={textLabel}>Re-enter your password</Text>
                <View style={inputFieldLarge}>
                  <TextInput style={input}
                  onFocus={()=>scrollRef.current?.scrollTo({y: 140, animated: true})}
                  value={userObj.rePassword} 
                  onChangeText={value => formChange('rePassword', value)}
                  placeholder="Password"
                  placeholderTextColor='#d1d2d6'
                  autoCapitalize="none"
                  secureTextEntry
                  />
                </View>
                <Text style={textLabel}>Club ID</Text>
                <View style={inputFieldLarge}>
                  <TextInput style={input}
                  onFocus={()=>scrollRef.current?.scrollTo({y: 200, animated: true})}
                  value={userObj.clubId} 
                  onChangeText={value => formChange('clubID', value)}
                  placeholder="Club ID"
                  placeholderTextColor='#d1d2d6'
                  autoCapitalize="none"
                  keyboardType='numeric'
                  />
                </View>
                <View style={{width: '100%', alignItems: 'center'}}>
                  <Button text="Sign Up" func={handleSubmit} clickable width={vw(35)}/>
                </View>
                </View>
              </ScrollView>
            </View>
          </View>
    );
}


export default ntsScreen1;