import React, { Component } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import Auth0 from "react-native-auth0";

import RNRestart from "react-native-restart";
import { updateStack } from "../../Navigation";

import { AUTH0_DOMAIN, AUTH0_CLIENT_ID, AUTHO_SCOPE, AUTHO_AUDIENCE } from  '@env';


// import {
//   headerColorStyle,
//   headerTextColorStyle,
//   buttonStyle
// } from "../styles/colors";
// import styles from "../styles/Login";

const auth0 = new Auth0({
  domain: AUTH0_DOMAIN,
  clientId: AUTH0_CLIENT_ID
});

export default class Login extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Login",
      headerStyle: {
        backgroundColor: headerColorStyle
      },
      headerTitleStyle: {
        color: headerTextColorStyle
      }
    };
  };

  state = {
    hasInitialized: false
  };

  componentDidMount() {
    console.log("boom panes!");
    SInfo.getItem("accessToken", {}).then(accessToken => {
      if (accessToken) {
        auth0.auth
          .userInfo({ token: accessToken })
          .then(data => {
            this.gotoAccount(data);
          })
          .catch(err => {
            SInfo.getItem("refreshToken", {}).then(refreshToken => {
              auth0.auth
                .refreshToken({ refreshToken: refreshToken })
                .then(newAccessToken => {
                  SInfo.setItem("accessToken", newAccessToken);
                  RNRestart.Restart();
                })
                .catch(err2 => {
                  console.log("err getting new access token");
                  console.log(err2);
                });
            });
          });
      } else {
        this.setState({
          hasInitialized: true
        });
        console.log("no access token");
      }
    });
  }

  render() {
    return (
      <View >
        <ActivityIndicator
          size="large"
          color="#05a5d1"
          animating={!this.state.hasInitialized}
        />
        {this.state.hasInitialized && (
          <Button onPress={this.login} title="Login" color={buttonStyle} />
        )}
      </View>
    );
  }

  login = () => {
    auth0.webAuth
      .authorize({
        scope: AUTHO_SCOPE,
        audience: AUTH0_AUDIENCE,
        // device: DeviceInfo.getUniqueID(),
        prompt: "login"
      })
      .then(res => {
        auth0.auth
          .userInfo({ token: res.accessToken })
          .then(data => {
            this.gotoAccount(data);
          })
          .catch(err => {
            console.log("err: ");
            console.log(JSON.stringify(err));
          });

        SInfo.setItem("accessToken", res.accessToken, {});
        SInfo.setItem("refreshToken", res.refreshToken, {});
      })
      .catch(error => {
        console.log("error occurrdzz");
        console.log(error);
      });
  };

  gotoAccount = data => {
    this.setState({
      hasInitialized: true
    });

    const resetAction = updateStack(this.props.navigation, 0, "Home");

    this.props.navigation.dispatch(resetAction);
  };
}