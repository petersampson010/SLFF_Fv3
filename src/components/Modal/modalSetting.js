import React from 'react';
import { Image, View, Text } from 'react-native';
import { Input } from 'react-native-elements';  
import { vw, vh } from 'react-native-expo-viewport-units';
import Button from '../Button/button';
import { playerImageLarge } from '../PlayerGraphic/style';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { captainCheckboxContainer, subImage } from './style';
import { modalLabelText, standardText } from '../../styles/textStyle';
import Checkbox from '../Checkbox/checkbox';

const playerImg = require('../../../images/profile.jpg');
const subImg = require('../../../images/subIcon.png');

export const set1 = (player, btnClick) => {
    return {
        player, 
        jsx: <Image source={playerImg} imageStyle={{resizeMode: 'cover'}} style={playerImageLarge}/>, 
        width: vw(80), 
        height: vh(50), 
        btn: <Button width={vw(35)} clickable modal comp={<Image source={subImg} imageStyle={{resizeMode: 'cover'}} style={subImage}/>} func={()=>btnClick(player)}/>
    }
}

export const set2 = (player, sub, btnClick, captain, vCaptain, setCaptain, setVCaptain) => {
    return {
        player, 
        jsx: <View style={{flexDirection: 'row', width: vw(76), justifyContent: 'center'}}>
                <Image source={playerImg} imageStyle={{resizeMode: 'cover'}} style={playerImageLarge}/>
            {!sub ? <View style={captainCheckboxContainer}>
                <Checkbox clickable active={player.player_id===captain.player_id} text="C" func={()=>setCaptain(player)}/>
                <Checkbox clickable active={player.player_id===vCaptain.player_id} text="VC" func={()=>setCaptain(player)}/>
            </View> : null} 
            </View>,
        width: vw(80), 
        height: vh(50), 
        btn: <Button width={vw(35)} clickable modal comp={<Image source={subImg} imageStyle={{resizeMode: 'cover'}} style={subImage}/>} func={()=>btnClick(player)}/>
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

export const submitOrEditGame = (openEditGameModal, openSubmitGameStats, game) => {
    return {
        player: false, 
        jsx: <View>
            <Text style={modalLabelText}>Woould you like to edit the game or submit the stats and complete it?</Text>
            <View style={{flexDirection: 'row', paddingTop: vh(2)}}>
                <Button width={vw(35)} clickable modal text="Edit Game" func={()=>openEditGameModal(game)}/>
                <Button width={vw(35)} clickable modal text="Submit Stats" func={openSubmitGameStats}/>
            </View>
        </View>,
        width: vw(80), height: vh(35),
        btn: false
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