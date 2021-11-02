import React, { Component } from "react";
import { Modal } from "react-native";
import { ActivityIndicator, View } from "react-native";
import { overlay } from "./style";


function SpinnerOverlay(props) {
  const profilePic = require('../../images/profile.jpg');
  return (
      <Modal transparent={true}>
          <View style={overlay}>
            <ActivityIndicator size="large" color="#00ff00"/>

          </View>
      </Modal>
  );
}
export default SpinnerOverlay;