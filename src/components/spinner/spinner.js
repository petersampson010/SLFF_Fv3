import React, { Component } from "react";
import { Modal } from "react-native";
import { ActivityIndicator, View, Text } from "react-native";
import { useSelector } from "react-redux";
import { overlay, spinnerTitle } from "./style";


const SpinnerOverlay = () => {

  return <View style={overlay}>
              <ActivityIndicator size="large" color="#00ff00"/>
          </View>
}
export default SpinnerOverlay;