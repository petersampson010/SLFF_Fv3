import React, { Component } from "react";
import { Modal } from "react-native";
import { ActivityIndicator, View, Text } from "react-native";
import { overlay, spinnerTitle } from "./style";


const SpinnerOverlay = () => {
  const profilePic = require('../../../images/profile.jpg');
  return (
      // <Modal transparent={true}>
          <View style={overlay}>
              <Text style={spinnerTitle}>SLFF</Text>
              <ActivityIndicator size="large" color="#00ff00"/>
          </View>
      // </Modal>
  );
}
export default SpinnerOverlay;