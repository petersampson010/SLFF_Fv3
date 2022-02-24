import React, { useRef, useState } from 'react';
import { View, Text, TextInput, Image, ScrollView, Keyboard } from 'react-native';
import { screenContainer } from '../styles/global';
import { input, inputFieldContainerCenter, inputFieldLarge, inputFieldVeryLarge } from '../styles/input';
import { textLabel } from './login/style';
import { vh, vw } from "react-native-expo-viewport-units"
import { labelText } from '../styles/textStyle';
import { TouchableOpacity } from 'react-native';
import { postMessage } from '../functions/APIcalls';
import Button from '../components/Button/button';
import { flashMyMessage } from '../functions/flashMyMessage';

export default function ContactUsScreen() {

  const scrollRef = useRef(),
  [complete, setComplete] = useState(false),
  [name, setName] = useState(''),
  [email, setEmail] = useState(''),
  [msg, setMsg] = useState(''),
  twitterIcon = require('../../images/twitterIcon.jpeg');

  Keyboard.addListener('keyboardDidHide', () => scrollRef.current?.scrollTo({y: 0, animated: true})); 

  const submitMessage = async() => {
    try {
      let message = await postMessage(name, email, msg);
      if (message.message_id) {
        setComplete(true);
      }
    } catch(e) {
      flashMyMessage(e, 'danger');
    }
  }

    return (
      <View style={screenContainer}>
        <View style={inputFieldContainerCenter}>
        <ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              ref={scrollRef}>
          <View style={{height: vh(90)}}>
          {complete ? 
          <View style={{height: vh(70)}}>
            <Text style={{...labelText, padding: vw(4)}}>Thanks for the feedback, please allow some time to respond to any questions/problems.</Text>
          </View>
          :
          <View style={{height: vh(65)}}>
            <Text style={textLabel}>Name</Text>
            <View style={inputFieldLarge}>
              <TextInput style={input}
                  onFocus={()=>scrollRef.current?.scrollTo({y: 0, animated: true})}
                value={name} 
                onChangeText={value => setName(value)}
              />
            </View>       
            <Text style={textLabel}>Email address</Text>
            <View style={inputFieldLarge}>
              <TextInput style={input}
                  onFocus={()=>scrollRef.current?.scrollTo({y: 0, animated: true})}
                value={email} 
                onChangeText={value => setEmail(value)}
                autoCapitalize="none"
              />
            </View>      
            <Text style={textLabel}>Message</Text>
            <View style={inputFieldVeryLarge}>
              <TextInput style={{...input, height: vh(30)}}
                onFocus={()=>scrollRef.current?.scrollTo({y: 170, animated: true})}
                value={msg} 
                onChangeText={value => setMsg(value)}
                multiline
              />
            </View>
            <View style={{width: '100%', alignItems: 'center'}}>
              <Button clickable text="Submit" func={submitMessage} width={vw(35)}/>
            </View>
          </View>
          }
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <TouchableOpacity style={{marginTop: vh(2)}}>
              <Image source={twitterIcon} imageStyle={{resizeMode: 'cover'}} style={{height: vh(7), width: vh(7), borderRadius: 20}}/>
            </TouchableOpacity>
          </View>
          </View>
          </ScrollView>
        </View>
      </View>
    );
  }