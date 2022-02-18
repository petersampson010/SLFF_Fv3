import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { header, headerText } from './style';

const Header = () => {

        return ( 
            <View style={header}>
                <Text style={headerText}>Gurpreets Sunday League</Text>
            </View>
         );
}
 
export default Header;
