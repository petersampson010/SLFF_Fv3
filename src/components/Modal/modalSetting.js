import React from 'react';
import { Image, View, Text } from 'react-native';
import { Input } from 'react-native-elements';  
import { vw, vh } from 'react-native-expo-viewport-units';
import Button from '../Button/button';
import { playerImageLarge } from '../PlayerGraphic/style';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { subImage } from './style';
import { standardText } from '../../styles/textStyle';

const playerImg = require('../../../images/profile.jpg');
const subImg = require('../../../images/subIcon.png');

export const set1 = (player, btnClick) => {
    return {
        player, 
        jsx: <Image source={playerImg} imageStyle={{resizeMode: 'cover'}} style={playerImageLarge}/>, 
        width: vw(80), 
        height: vh(50), 
        btn: <Button width={vw(35)} clickable comp={<Image source={subImg} imageStyle={{resizeMode: 'cover'}} style={subImage}/>} func={()=>btnClick(player)}/>
    }
}

export const set2 = (player, sub, btnClick, captain, vCaptain, setCaptain, setVCaptain) => {

    return {
        player, 
        jsx: !sub ? <View>
            <Button clickable={player.player_id!==captain.player_id} text='Captain' func={()=>setCaptain(player)} width={vw(35)}/>
            <Button clickable={player.player_id!==vCaptain.player_id} text='Vice Captain' func={()=>setVCaptain(player)} width={vw(35)}/>
        </View> : null, 
        width: vw(80), 
        height: vh(50), 
        btn: <Button width={vw(35)} clickable comp={<Image source={subImg} imageStyle={{resizeMode: 'cover'}} style={subImage}/>} func={()=>btnClick(player)}/>
    }
}

export const set3 = (player) => {
    return {
        player, 
        jsx: <Text>GW Points</Text>, 
        width: vw(80), 
        height: vh(50), 
        btn: null
    }
}

// export const newGame = (newGame, updateGame, addGame, formChange, openDate) => {
//     return {
//         player: false, 
//         jsx: <View>
//             <Input value={newGame.opponent} 
//             style={standardText}
//             onChange={(el)=>formChange('opponent', el.nativeEvent.text)}
//             placeholder="Fantasy FC"
//             label="Opposition"
//             />
//             <Text style={standardText}>Please select the date the game will be played</Text>
//             <DateTimePickerModal
//             isVisible={newGame.dateModalVisible}
//             mode='date'
//             date={newGame.date}
//             onConfirm={(event, date)=>formChange('date', date)}
//             />
//             <Text onPress={openDate}>Select Date</Text>
//         </View>,
//         width: vw(80), height: vh(60), 
//         btn: <Button clickable text={"Submit Game"} func={addGame} width={vw(35)}/>
//     }
// }