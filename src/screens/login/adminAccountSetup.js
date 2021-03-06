import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text, Switch, Keyboard, ScrollView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { connect, useDispatch } from 'react-redux';
import { closeModal, setAdminUser, setModal } from '../../actions';
import { getAllAdminUsers, getAllUsers, postAdminUser, getAllUsersByAdminUserId, getAdminUserById } from '../../functions/APIcalls'; 
import { showMessage } from "react-native-flash-message";
import { screenContainer } from '../../styles/global';
import { loginHead, switchText, textLabel } from './style';
import { inputFieldContainerCenter, inputFieldLarge, input } from '../../styles/input';
import { updateStack } from '../../Navigation';
import { getStorage, setStorage } from '../../functions/storage';
import { vh, vw } from 'react-native-expo-viewport-units';
import Button from '../../components/Button/button';
import { flashMyMessage } from '../../functions/flashMyMessage';
import globalConfig from '../../config/globalConfig.json';

const AdminAccountSetupScreen = ({navigation}) => {

  const dispatch = useDispatch(),  
  scrollRef = useRef(),
  [adminUserObj, updateAdminUserObj] = useState({
    email: '',
    password: '',
    rePassword: '',
    clubName: '',
    terms: false
  }),
  [verified, updateVerified] = useState(false);

  useEffect(() => {
    const checkVerified = () => {
      if (verified) {
        updateStack(navigation, 0, 'ClubSetup');
      }
    };
    checkVerified();
  }, [verified])

  Keyboard.addListener('keyboardDidHide', () => scrollRef.current?.scrollTo({y: 0, animated: true}));
  
  const formChange = (id, entry) => {
    if (id==='email') {
      updateAdminUserObj({...adminUserObj, email: entry})
    } else if (id==='password') {
      updateAdminUserObj({...adminUserObj, password: entry})
    } else if (id==='clubName') {
      updateAdminUserObj({...adminUserObj, clubName: entry})
    } else {
      updateAdminUserObj({...adminUserObj, rePassword: entry})
    }
  }
  
  const toggleSwitch = () => {
    updateAdminUserObj({
        ...adminUserObj, 
        terms: !adminUserObj.terms
    })
  }

  const checkPassword = () => {
    if (adminUserObj.password===adminUserObj.rePassword) {
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
      let { token, admin_user } = await postAdminUser(adminUserObj);
      if (globalConfig.RN_SET_MAIL) {
        dispatch(setModal({modalSet: 'set6', width: vw(80), height: vh(50), btnClick: checkEmailConfirm}));
      } else {
        updateVerified(true);
        flashMyMessage('Skipping Email confirmation', 'success');
      }
      await setStorage('session', JSON.stringify({token, admin_user_id: admin_user.admin_user_id}));
      dispatch(setAdminUser(admin_user));
    } catch(e) {
      flashMyMessage(e, 'danger');
    }
    return;
  }

  const checkEmailConfirm = async() => {
    try {
      const { admin_user_id } = await getStorage('session');
      const res = await getAdminUserById(admin_user_id);
      if (res.confirm_email) {
        dispatch(closeModal());
        updateVerified(true);
        flashMyMessage('Email confirmed successfully', 'success');
      } else {
        flashMyMessage('Email not confirmed yet', 'warning');
      }
    } catch(e) {
      flashMyMessage(e, 'danger');
    }
  }

    return (
      <View style={screenContainer}>
            <View style={inputFieldContainerCenter}>
              <Text style={loginHead}>Admin Account Setup</Text>
              <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              ref={scrollRef}>
              <View style={{height: vh(90)}}>
              <Text style={textLabel}>Enter your email address</Text>
              <View style={inputFieldLarge}>
                <TextInput style={input}
                onFocus={()=>scrollRef.current?.scrollTo({y: 0, animated: true})}  
                value={adminUserObj.email} 
                onChangeText={value => formChange('email', value)}
                placeholder="email@address.com"
                placeholderTextColor='#d1d2d6'
                autoCapitalize="none"
                />
              </View>
              <Text style={textLabel}>Enter your club name</Text>
              <View style={inputFieldLarge}>
                <TextInput style={input}
                onFocus={()=>scrollRef.current?.scrollTo({y: 0, animated: true})}
                value={adminUserObj.team_name} 
                onChangeText={value => formChange('clubName', value)}
                placeholder="Club de sunday futbol"
                placeholderTextColor='#d1d2d6'
                />
              </View>
              <Text style={textLabel}>Enter your password</Text>
              <View style={inputFieldLarge}>
                <TextInput style={input}
                onFocus={()=>scrollRef.current?.scrollTo({y: 100, animated: true})}
                value={adminUserObj.password} 
                onChangeText={value => formChange('password', value)}
                placeholder="Password"
                placeholderTextColor='#d1d2d6'
                autoCapitalize="none"
                secureTextEntry={true}
                />
              </View>
              <Text style={textLabel}>Re-enter your password</Text>
              <View style={inputFieldLarge}>
                <TextInput style={input}
                onFocus={()=>scrollRef.current?.scrollTo({y: 200, animated: true})}
                value={adminUserObj.rePassword} 
                onChangeText={value => formChange('rePassword', value)}
                placeholder="Password"
                placeholderTextColor='#d1d2d6'
                autoCapitalize="none"
                secureTextEntry={true}
                />
              </View>
              <View style={{width: '100%', alignItems: 'center', marginBottom: vh(3)}}>
                <Text style={textLabel}>I agree to terms and conditions...</Text>
                <Switch 
                value={adminUserObj.terms} 
                onValueChange={toggleSwitch}/>
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

export default AdminAccountSetupScreen;