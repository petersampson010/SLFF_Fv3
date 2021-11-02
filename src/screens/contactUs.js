import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image } from 'react-native';
import { screenContainer } from '../styles/global';
import { input, inputFieldContainerCenter, inputFieldLarge, inputFieldVeryLarge } from '../styles/input';
import { textLabel } from './login/style';
import { vh, vw } from "react-native-expo-viewport-units"
import { labelText, standardText } from '../styles/textStyle';
import { TouchableOpacity } from 'react-native';
import { postMessage } from '../functions/APIcalls';
import { showMessage } from 'react-native-flash-message';

export default function ContactUsScreen() {

  const [complete, setComplete] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');

  const twitterIcon = require('../images/twitterIcon.jpeg');

  const submitMessage = async() => {
    try {
      let message = await postMessage(name, email, msg);
      if (message.message_id) {
        setComplete(true);
      }
    } catch(e) {
      showMessage({
        message: "Fail: Network Issue, please try again later",
        type: "danger"
      });
    }
  }

    return (
      <View style={screenContainer}>
        <View style={inputFieldContainerCenter}>
          {complete ? 
          <View style={{height: vh(70)}}>
            <Text style={{...labelText, padding: vw(4)}}>Thanks for the feedback, please allow some time to respond to any questions/problems.</Text>
          </View>
          :
          <View style={{height: vh(70)}}>
            <Text style={textLabel}>Name</Text>
            <View style={inputFieldLarge}>
              <TextInput style={input}
                value={name} 
                onChangeText={value => setName(value)}
              />
            </View>       
            <Text style={textLabel}>Email address</Text>
            <View style={inputFieldLarge}>
              <TextInput style={input}
                value={email} 
                onChangeText={value => setEmail(value)}
                autoCapitalize="none"
              />
            </View>      
            <Text style={textLabel}>Message</Text>
            <View style={inputFieldVeryLarge}>
              <TextInput style={{...input, height: vh(35)}}
                value={msg} 
                onChangeText={value => setMsg(value)}
                multiline
              />
            </View>
            <Button title="Submit" onPress={()=>submitMessage()}/>
          </View>
          }
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity style={{marginTop: vh(2)}}>
              <Image source={twitterIcon} imageStyle={{resizeMode: 'cover'}} style={{height: vh(7), width: vh(7), borderRadius: 20}}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }