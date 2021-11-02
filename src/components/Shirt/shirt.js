import React, { Component } from "react";
import { TouchableWithoutFeedback, Image, ImageBackground } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import { TouchableHighlight } from "react-native-gesture-handler";
import Svg, { Ellipse } from "react-native-svg";
import { $pitchGreen } from "../../styles/global";
import { profileImage, profileContainer } from "./style";

function Shirt(props) {
  const profilePic = require('../../images/profile.jpg');
  return (
    // <TouchableWithoutFeedback onPress={()=>props.openModal(props.player)}>
      <View style={profileContainer}>
        {/* <ImageBackground source={profilePic} imageStyle={{resizeMode: 'stretch'}} style={profileImage}>
          <View><Text>HI</Text></View>
        </ImageBackground> */}
  
        {/* <Image source={profilePic} imageStyle={{resizeMode: 'stretch'}} style={{width: '100%', height: '100%'}}/> */}

      </View>
    // {/* </TouchableWithoutFeedback> */}
  );
}
export default Shirt;