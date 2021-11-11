import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { screenContainer } from '../../styles/global';
import { optionContainer, optionsContainer, optionText, optionHead, optionUsContainer } from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AdminHome from '../screens/AdminHome/adminHome';
import Home from '../screens/home/home';
import OpenerScreen from '../screens/opener/opener';



class ScreenDecide extends Component {

    screenDecide = async () => {
        if (await AsyncStorage.getItem('remember')) {
            if (await AsyncStorage.getItem('admin')) {
                return <AdminHome/>;
            } else {
                return <Home/>;
            }
        } else {
            return <OpenerScreen/>;
        }
    }

    render() {
        return this.screenDecide()
    }

}

export default ScreenDecide;
