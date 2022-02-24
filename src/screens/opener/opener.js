import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { getStorage } from '../../functions/storage';
import { screenContainer } from '../../styles/global';
import { optionContainer, optionsContainer, optionText, optionHead, optionUsContainer } from './style';

const OpenerScreen = ({navigation}) => {

        return (
          <View style={screenContainer}>
            <View style={optionsContainer}>
                <TouchableOpacity style={optionContainer} onPress={()=>navigation.navigate('Login')}>
                    <Text style={optionHead}>Sign In</Text>
                    <Text style={optionText}>Sign in to your account here</Text>
                </TouchableOpacity>
                <TouchableOpacity style={optionContainer} onPress={()=>navigation.navigate('AdminAccountSetup')}>
                    <Text style={optionHead}>Account Setup</Text>
                    <Text style={optionText}>Dont have an account for your club, set up a new admin account and team for your fans/players to join</Text>
                </TouchableOpacity>
                <TouchableOpacity style={optionContainer} onPress={()=>navigation.navigate('nts1')}>
                    <Text style={optionHead}>New Fantasy Team</Text>
                    <Text style={optionText}>Does your club already have an account with us, but you dont have a team. Set one up here</Text>
                </TouchableOpacity>
                <TouchableOpacity style={optionUsContainer} onPress={()=>navigation.navigate('ContactUs')}>
                    <Text style={optionHead}>Contact Us</Text>
                    <Text style={optionText}>Please get in touch, we want to here from you</Text>
                </TouchableOpacity>
            </View>
          </View>
        );
}

export default OpenerScreen;
