import React, { Component, useState } from 'react';
import { ScrollView, View, Text, TextInput } from 'react-native';
import { Input } from 'react-native-elements';  
import { connect, useDispatch, useSelector } from 'react-redux';
import {vw, vh} from 'react-native-expo-viewport-units';
import { validateGame } from '../../functions/validity';
import DateTimePicker from '@react-native-community/datetimepicker';
import { postGame, patchGame } from '../../functions/APIcalls';
import { showMessage } from 'react-native-flash-message';
import TouchableScale from 'react-native-touchable-scale'
import { setClubFocusGW, addGameState, setModal, updateGameState, closeModal } from '../../actions';
import { displayDate } from '../../functions/reusable';
import { TouchableOpacity } from 'react-native';
import { gameContainer, gamesContainer, gameScore, listLabel } from './style';
import { headers, labelText, modalLabelText, sidenote, standardText } from '../../styles/textStyle';
import { $arylideYellow, $chocolateBlack, $darkBlue, $luminousGreen, $zaGreen, screenContainer } from '../../styles/global';
import { buttonSplit } from '../../components/Button/style';
import Button from '../../components/Button/button';
import StateModal from '../../components/Modal/StateModal';
import { input, inputFieldLarge } from '../../styles/input';
import { textLabel } from '../login/style';
import DatePicker from 'react-native-date-picker';
import { flashMyMessage } from '../../functions/flashMyMessage';


const AdminHomeScreen = ({navigation}) => {

    const dispatch = useDispatch(), 
    [modal, updateModal] = useState({
        active: false,
        update: false,
    }),
    [game, updateGame] = useState({
        dateModalVisible: false,
        opponent: '',
        date: new Date(),
        complete: false
    }),
    games = useSelector(state => state.club.allGames),
    adminUser = useSelector(state => state.club.adminUser);

    

    const renderGame = (game, i) => <TouchableOpacity key={i} style={gameContainer}
    onPress={()=>setModal(game)}>
        <View>
            <Text style={labelText}>{game.opponent}</Text>
            <Text style={sidenote}>{displayDate(game.date)}</Text>
        </View>
        {game.complete ? 
        <View style={gameScore}>
            <Text style={standardText}>{game.score}</Text>
        </View>
            : <Button width={vw(35)} clickable text="Submit Stats" func={()=>openSubmitGameStats(game)}/>}
    </TouchableOpacity>

    const renderGames = () => {
        let completedGamesSorted = games.filter(x => x.complete).sort((a,b)=>Date.parse(b.date)-Date.parse(a.date));
        let openGamesSorted = games.filter(x=>!x.complete).sort((a,b)=>Date.parse(b.date)-Date.parse(a.date));
        return <View style={gamesContainer}>
            <View style={listLabel}>
                <Text>Upcoming</Text>
            </View>
            <ScrollView>
                {openGamesSorted.map((game, i) => renderGame(game, i))}
            </ScrollView>
            <View style={listLabel}>
                <Text>Complete</Text>
            </View>
            <ScrollView>
                {completedGamesSorted.map((game, i) => renderGame(game, i))}
            </ScrollView>
        </View>
    }


    const formChange = (id, value) => {
        updateGame({
            ...game,
            [id]: value
        });
    }

    const addGame = async() => {
        try {
            let res = await postGame(game, adminUser.admin_user_id);
            if (res.date) {
                dispatch(addGameState(res));
                updateModal({
                    active: false, 
                    update: false
                });
                updateGame({
                    dateModalVisible: false,
                    opponent: '',
                    date: new Date(),
                    complete: false
                })
                showMessage({
                    message: "Game/Event added",
                    type: 'success'
                })
            }
        } catch(e) {
            flashMyMessage(e, 'danger');
        }
    }   

    const updateGameComplete = async() => {
        try {
            let res = await patchGame(game);
            dispatch(updateGameState(game));
            if (res.date) {
                updateModal({
                    active: false, 
                    update: false
                });
                showMessage({
                    message: "Game/Event updated",
                    type: 'success'
                })
            }
        } catch(e) {
            flashMyMessage(e, 'danger');
        }
    }

    const openDate = () => {
        updateGame({
            ...game, 
            dateModalVisible: true
        })
    }

    const setModal = (game) => {
        dispatch(setModal({modalSet: 'set4', player: null, width: vw(80), height: vh(45), btnClick: () => openEditGameModal(game)}));
    }

    const openSubmitGameStats = (game) => {
        dispatch(setClubFocusGW(game));
        dispatch(closeModal());
        navigation.navigate('GameEditor');
    }

    const openEditGameModal = (game) => {
        dispatch(closeModal());
        updateModal({active: true, update: true});
        updateGame(game);
    }

    // return <Text>Hi</Text>

        return ( 
            <View>
                <ScrollView style={screenContainer}>
                    <ScrollView>
                        {renderGames()}
                    </ScrollView>
                    <StateModal
                    modalActive={modal.active}
                    height={vh(60)}
                    width={vw(90)}
                    jsx={<View>
                        <Text style={modalLabelText}>Opposition</Text>
                        <View style={inputFieldLarge}>
                            <TextInput style={input} value={game.opponent}
                            onChangeText={value=>formChange('opponent', value)}
                            placeholder="Fantasy FC"
                            placeholderTextColor='#d1d2d6'
                            />
                        </View>
                        <Text style={modalLabelText}>Date</Text>
                            <DatePicker 
                            height={vh(1)}
                            mode='date'
                            date={new Date(game.date)}
                            onDateChange={date=>updateGame({...game, date})}
                            androidVariant='nativeAndroid'
                            />
                    </View>}
                    btn={<Button clickable modal text={modal.update ? "Edit Game" : "Submit Game"} func={modal.update ? updateGameComplete : addGame} width={vw(35)}/>}
                    closeFcn={()=>updateModal({active: false})}
                    />
                </ScrollView>
            <View style={buttonSplit}>
                <Button clickable text='Add Event/Game' func={()=>updateModal({active: true})} width={vw(40)} />
                <Button clickable text='Edit Player(s)' func={()=>navigation.navigate('AdminPlayerEdit')} width={vw(40)} />
            </View>

            </View>
         );
}
 
export default AdminHomeScreen;