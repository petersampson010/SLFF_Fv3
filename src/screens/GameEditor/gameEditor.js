import React, { Component, useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { connect, useDispatch, useSelector } from 'react-redux';
import { postPGJoiner, completeGame, postUGJ, getRecordsByGWId, patchRecordGAMEWEEK, postRecordDUPLICATE, postPGJ, getRecordsByGWIdAndUserId, getAllRecordsByGWId } from '../../functions/APIcalls';
import { validatePlayerScore } from '../../functions/validity';
import { closeModal, completeGameState, setModal, updateStateClubPlayers } from '../../actions';
import { $baseBlue, $darkBlue, $electricBlue, $inputBlue, screenContainer } from '../../styles/global';
import { tableElement1, tableElement9, tableRow } from '../../styles/table';
import { vh, vw } from 'react-native-expo-viewport-units';
import { headers, standardText } from '../../styles/textStyle';
import { inputFieldSmall, input, inputFieldContainerInLine, scoreInput } from '../../styles/input';
import { calculateScore, getLastAndAllGWs } from '../../functions/reusable';
import SpinnerOverlay from '../../components/spinner/spinner';
import Button from '../../components/Button/button';
import { headComp, tableComp } from './style';

const GameEditorScreen = ({ navigation }) => {

    const dispatch = useDispatch(), 
    clubPlayers = useSelector(state => state.club.clubPlayers),
    clubFocusGW = useSelector(state => state.club.clubFocusGW),
    userFocusGW = useSelector(state => state.user.userFocusGW),
    adminUser = useSelector(state => state.club.adminUser),
    allUsers = useSelector(state => state.club.allUsers),
    lastGW = useSelector(state => state.club.lastGW);

    const [players, updatePlayers] = useState({});
    const [activeDialog, updateActiveDialog] = useState(false);
    const [score, updateScore] = useState({
        team: '',
        oppo: ''
    });
    const [spinner, updateSpinner] = useState(false);

    useEffect(() => {
        const setPlayers = () => {
            let players = {};
            for (let i=0;i<clubPlayers.length;i++) {
                let player = clubPlayers[i];
                players = {
                    ...players,
                    [player.player_id]: {
                        name: player.first_name + ' ' + player.last_name,
                        player_id: player.player_id,
                        gameweek_id: clubFocusGW.gameweek_id,
                        minutes: '0',
                        assists: '',
                        goals: '',
                        own_goals: '',
                        y_cards: '',
                        r_cards: '',
                        bonus: '',
                        penalty_miss: '',
                        goals_conceded: '',
                        valid: true
                    }
                };
            };
            updatePlayers(players);
        }
        setPlayers();
    }, [])


    const renderRows = () => {
        return Object.keys(players).map((x,i) => {
            return <View key={i} style={{...tableRow, backgroundColor: players[x].valid ? 'rgba(249,249,249,0.1)' : 'red'}}>{renderRow(x)}</View>})
    }

    const renderRow = (playerID) => [<View style={{...tableElement1, height: vh(6), width: vw(10)}}><Text style={standardText}>{players[playerID].name}</Text></View>,
        <TextInput keyboardType="numeric"  style={tableComp}
        value={players[playerID].minutes} 
        onChange={el=>updatePlayerScore(playerID, el.nativeEvent.text, 'minutes')}
        placeholder="0"
        />, <TextInput keyboardType="numeric"  style={tableComp}
        value={players[playerID].assists} 
        onChange={el=>updatePlayerScore(playerID, el.nativeEvent.text, 'assists')}
        placeholder="0"
        />, <TextInput keyboardType="numeric"  style={tableComp}
        value={players[playerID].goals} 
        onChange={el=>updatePlayerScore(playerID, el.nativeEvent.text, 'goals')}
        placeholder="0"
        />, <TextInput keyboardType="numeric"  style={tableComp}
        value={players[playerID].own_goals} 
        onChange={el=>updatePlayerScore(playerID, el.nativeEvent.text, 'own_goals')}
        placeholder="0"
        />, <TextInput keyboardType="numeric"  style={tableComp}
        value={players[playerID].y_cards} 
        onChange={el=>updatePlayerScore(playerID, el.nativeEvent.text, 'y_cards')}
        placeholder="0"
        />, <TextInput keyboardType="numeric"  style={tableComp}
        value={players[playerID].r_cards} 
        onChange={el=>updatePlayerScore(playerID, el.nativeEvent.text, 'r_cards')}
        placeholder="0"
        />, <TextInput keyboardType="numeric"  style={tableComp}
        value={players[playerID].bonus} 
        onChange={el=>updatePlayerScore(playerID, el.nativeEvent.text, 'bonus')}
        placeholder="0"
        />, <TextInput keyboardType="numeric"  style={tableComp}
        value={players[playerID].penalty_miss} 
        onChange={el=>updatePlayerScore(playerID, el.nativeEvent.text, 'penalty_miss')}
        placeholder="0"
        />, <TextInput keyboardType="numeric"  style={{...tableComp, borderRightWidth: 0}}
        value={players[playerID].goals_conceded} 
        onChange={el=>updatePlayerScore(playerID, el.nativeEvent.text, 'goals_conceded')}
        placeholder="0"
        />];

    const updatePlayerScore = (playerID, value, attr) => {
        if (value.match('^[0-9]{1,2}$') || value==="") {
            updatePlayers({
                ...players,
                [playerID]: {...players[playerID],
                    [attr]: value
                }
            })
        }
    }

    const startSpin = () => {
        updateSpinner(true);
        validatePlayerScores();
    }

    const validatePlayerScores = () => {
        let outcome = true;
        let postArr = [];
        let updatedPlayers = players;
        for (let i=0;i<clubPlayers.length;i++) {
            let playerID = clubPlayers[i].player_id
            let { result, post } = validatePlayerScore(players[playerID])
            if (!result) {
                updatedPlayers = {
                        ...players,
                        [playerID]: {...players[playerID],
                            valid: false
                        }
                    };
                outcome = false;
            } else if (post) {
                postArr.push(players[playerID]);
            }
        }
        updatePlayers(updatedPlayers);
        updateActiveDialog(false);
        if (outcome) {
            postPGJoiners(postArr);
        } else {
            updateSpinner(false);
            showMessage({
                message: "Please update minutes",
                type: "warning"
            })
        }
    }
    
    const postPGJoiners = async(postArr) => {
        try{
            for (let i=0;i<postArr.length;i++) {
                await postPGJ(postArr[i], adminUser.admin_user_id);
            }
            await postUGJoiners();
            let records = await getAllRecordsByGWId(0);
            await patchCurrentRecords(records);
            await postNewRecords(records);
            await completeGame(clubFocusGW.gameweek_id, score, lastGW ? lastGW.gameweek+1 : 1);
            let returnObj = await getLastAndAllGWs(adminUser.admin_user_id)
            dispatch(completeGameState(returnObj.GWs, returnObj.lastGW));
            updateSpinner(false);
            dispatch(closeModal());
            showMessage({
                message: "Success",
                type: "success"
              });
            navigation.navigate('AdminHome');
        } catch(e) {
            updateSpinner(false);
            flashMyMessage(e, 'danger');
        }
    }

    const postUGJoiners = async() => {
        for (let i=0; i<allUsers.length; i++) {
            const user = allUsers[i];
            if (user.gw_start===0) {
            }
            let records = await getRecordsByGWIdAndUserId(user.user_id, 0);
            const score = await calculateScore(records, clubFocusGW.gameweek_id);
            await postUGJ(user, clubFocusGW.gameweek_id, score);
        }
    }

    const postNewRecords = async(records) => {
        for (let i=0; i<records.length; i++) {
            await postRecordDUPLICATE(records[i]);
        }
    }

    const patchCurrentRecords = async(records) => {
        for (let i=0; i<records.length; i++) {
            await patchRecordGAMEWEEK(records[i].record_id, clubFocusGW.gameweek_id);
        }
    }

    const setModalRedux = () => {
        dispatch(setModal({modalSet: 'set5', player: null, btnClick: startSpin, width: vw(80), height: vh(30)}));
    }
    
        return (
            <View style={{backgroundColor: $darkBlue}}>
                {spinner ? <SpinnerOverlay/> : null}
                <Button clickable absolute text="Confirm" width={vw(35)} func={setModalRedux}/>
                <View style={inputFieldContainerInLine}>
                    <Text style={{...standardText, width: vw(30), textAlign: 'right'}}>{adminUser.club_name}</Text>
                    <View>
                        <TextInput
                        keyboardType='numeric'
                        style={scoreInput}
                        value={score.team}
                        onChange={el=>updateScore({...score, team: el.nativeEvent.text})}
                        />
                    </View>
                    <Text style={standardText}>-</Text>
                    <View>
                        <TextInput
                        keyboardType='numeric'
                        style={scoreInput}
                        value={score.oppo}
                        onChange={el=>updateScore({...score, oppo: el.nativeEvent.text})}
                        />
                    </View>
                    <Text style={{...standardText, width: vw(30), textAlign: 'left'}}>{clubFocusGW.opponent}</Text>
                </View>
                <View style={{...tableRow, backgroundColor: $darkBlue, height: vh(17), paddingLeft: vw(24)}}>
                    <View style={headComp}><Text style={{width: vh(15), ...standardText}}>Minutes</Text></View>
                    <View style={headComp}><Text style={{width: vh(15), ...standardText}}>Assists</Text></View>
                    <View style={headComp}><Text style={{width: vh(15), ...standardText}}>Goals</Text></View>
                    <View style={headComp}><Text style={{width: vh(15), ...standardText}}>Own Goals</Text></View>
                    <View style={headComp}><Text style={{width: vh(15), ...standardText}}>Yellow Cards</Text></View>
                    <View style={headComp}><Text style={{width: vh(15), ...standardText}}>Red Cards</Text></View>
                    <View style={headComp}><Text style={{width: vh(15), ...standardText}}>Bonus</Text></View>
                    <View style={headComp}><Text style={{width: vh(15), ...standardText}}>Penalty Miss</Text></View>
                    <View style={headComp}><Text style={{width: vh(16), ...standardText}}>Goals Conceeded</Text></View>
                </View>
                <ScrollView style={screenContainer}>
                    <View style={{paddingBottom: vh(71)}}>
                        {renderRows()}
                    </View>
                </ScrollView>
            </View> 
        );
}
 
export default GameEditorScreen;