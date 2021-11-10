import React, { Component } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { showMessage } from 'react-native-flash-message';
// import Dialog, { DialogButton, DialogContent } from 'react-native-popup-dialog';
import { connect } from 'react-redux';
import { postPGJoiner, completeGame, postUGJoiner, getRecordsByGWId, patchRecordGAMEWEEK, postRecordDUPLICATE, postPGJ, getRecordsByGWIdAndUserId, getAllRecordsByGWId } from '../../functions/APIcalls';
import { validatePlayerScore } from '../../functions/validity';
import { completeGameState } from '../../actions';
import { $baseBlue, $darkBlue, $electricBlue, $inputBlue, screenContainer } from '../../styles/global';
import { tableElement1, tableElement9, tableRow } from '../../styles/table';
import { vh, vw } from 'react-native-expo-viewport-units';
import { standardText } from '../../styles/textStyle';
import { inputFieldSmall, input, inputFieldContainerInLine } from '../../styles/input';
import { calculateScore } from '../../functions/reusable';
import SpinnerOverlay from '../../components/spinner/spinner';

class GameEditorScreen extends Component {
    state = { 
        players: {},
        dialog: {
            active: false
        },
        score: {
            team: '',
            oppo: ''
        },
        spinner: false
     }

    componentDidMount() {
        let players = {};
        for (let i=0;i<this.props.clubPlayers.length;i++) {
            let player = this.props.clubPlayers[i];
            players = {
                ...players,
                [player.player_id]: {
                    name: player.first_name + ' ' + player.last_name,
                    player_id: player.player_id,
                    gameweek_id: this.props.gwSelect.gameweek_id,
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
        this.setState({
            ...this.state, 
            players
        });
    }

    renderRows = () => {
        return Object.keys(this.state.players).map((x,i) => {
            return <View key={i} style={{...tableRow, backgroundColor: this.state.players[x].valid ? $inputBlue : 'red'}}>{this.renderRow(x)}</View>})
    }

    renderRow = (playerID) => [<View style={tableElement1}><Text style={standardText}>{this.state.players[playerID].name}</Text></View>,
        <TextInput style={tableElement9}
        value={this.state.players[playerID].minutes} 
        onChange={el=>this.updateScore(playerID, el.nativeEvent.text, 'minutes')}
        placeholder="0"
        />, <TextInput style={tableElement9}
        value={this.state.players[playerID].assists} 
        onChange={el=>this.updateScore(playerID, el.nativeEvent.text, 'assists')}
        placeholder="0"
        />, <TextInput style={tableElement9}
        value={this.state.players[playerID].goals} 
        onChange={el=>this.updateScore(playerID, el.nativeEvent.text, 'goals')}
        placeholder="0"
        />, <TextInput style={tableElement9}
        value={this.state.players[playerID].own_goals} 
        onChange={el=>this.updateScore(playerID, el.nativeEvent.text, 'own_goals')}
        placeholder="0"
        />, <TextInput style={tableElement9}
        value={this.state.players[playerID].y_cards} 
        onChange={el=>this.updateScore(playerID, el.nativeEvent.text, 'y_cards')}
        placeholder="0"
        />, <TextInput style={tableElement9}
        value={this.state.players[playerID].r_cards} 
        onChange={el=>this.updateScore(playerID, el.nativeEvent.text, 'r_cards')}
        placeholder="0"
        />, <TextInput style={tableElement9}
        value={this.state.players[playerID].bonus} 
        onChange={el=>this.updateScore(playerID, el.nativeEvent.text, 'bonus')}
        placeholder="0"
        />, <TextInput style={tableElement9}
        value={this.state.players[playerID].penalty_miss} 
        onChange={el=>this.updateScore(playerID, el.nativeEvent.text, 'penalty_miss')}
        placeholder="0"
        />, <TextInput style={tableElement9}
        value={this.state.players[playerID].goals_conceded} 
        onChange={el=>this.updateScore(playerID, el.nativeEvent.text, 'goals_conceded')}
        placeholder="0"
        />];

    updateScore = (playerID, value, attr) => {
        if (value.match('^[0-9]{1,2}$') || value==="") {
            this.setState({...this.state, 
                players: {
                    ...this.state.players,
                    [playerID]: {...this.state.players[playerID],
                        [attr]: value
                    }
                }
            })
        }
    }

    validatePlayerScores = () => {
        this.setState({...this.state, spinner: true});
        let outcome = true;
        let postArr = [];
        let updatedState = this.state;
        for (let i=0;i<this.props.clubPlayers.length;i++) {
            let playerID = this.props.clubPlayers[i].player_id
            let { result, post } = validatePlayerScore(this.state.players[playerID])
            if (!result) {
                updatedState = ({...updatedState, 
                    players: {
                        ...updatedState.players,
                        [playerID]: {...updatedState.players[playerID],
                            valid: false
                        }
                    }
                });
                outcome = false;
            } else if (post) {
                postArr.push(this.state.players[playerID]);
            }
        }
        this.setState({...updatedState, dialog: {active: false}});
        if (outcome) {
            this.postPGJoiners(postArr);
        } else {
            this.setState({...this.state, spinner: false});
            showMessage({
                message: "Please update minutes",
                type: "warning"
            })
        }
    }
    
    postPGJoiners = async(postArr) => {
        try{
            for (let i=0;i<postArr.length;i++) {
                await postPGJ(postArr[i]);
            }
            await this.postUGJoiners();
            let records = await getAllRecordsByGWId(0);
            await this.patchCurrentRecords(records);
            await this.postNewRecords(records);
            await completeGame(this.props.gwSelect.gameweek_id, this.state.score);
            this.props.completeGameState(this.props.gwSelect.gameweek_id);
            this.setState({...this.state, spinner: false});
            this.props.navigation.navigate('AdminHome');
        } catch(e) {
            this.setState({...this.state, spinner: false});
            showMessage({
                message: "Fail: Network Issue, please try again later",
                type: "danger"
              });
            console.warn(e);
        }
    }

    postUGJoiners = async() => {
        let { allUsers, gwSelect } = this.props;
        for (let i=0; i<allUsers.length; i++) {
            const user = allUsers[i];
            let records = await getRecordsByGWIdAndUserId(user.user_id, 0);
            const score = await calculateScore(records, gwSelect.gameweek_id);
            await postUGJoiner(user.user_id, gwSelect.gameweek_id, score);
        }
    }

    postNewRecords = async(records) => {
        for (let i=0; i<records.length; i++) {
            await postRecordDUPLICATE(records[i]);
        }
    }

    patchCurrentRecords = async(records) => {
        for (let i=0; i<records.length; i++) {
            await patchRecordGAMEWEEK(records[i].record_id, this.props.gwSelect.gameweek_id);
        }
    }
    
    render() { 
        return (
            <View style={{backgroundColor: $darkBlue}}>
                {this.state.spinner ? <SpinnerOverlay/> : null}
                <Button title="Confirm" onPress={()=>this.setState({...this.state, dialog: {active: true}})}/>
                <View style={inputFieldContainerInLine}>
                    <Text style={{...standardText, width: vw(20), textAlign: 'right'}}>{this.props.adminUser.club_name}</Text>
                    <View style={inputFieldSmall}>
                        <TextInput
                        style={input}
                        value={this.state.score.team}
                        onChange={el=>this.setState({...this.state, score: {...this.state.score, team: el.nativeEvent.text}})}
                        placeholder='your team'
                        />
                    </View>
                    <View style={inputFieldSmall}>
                        <TextInput
                        style={input}
                        value={this.state.score.oppo}
                        onChange={el=>this.setState({...this.state, score: {...this.state.score, oppo: el.nativeEvent.text}})}
                        placeholder='their team'
                        />
                    </View>
                    <Text style={{...standardText, width: vw(20), textAlign: 'left'}}>{this.props.gwSelect.opponent}</Text>
                </View>
                        <View style={{...tableRow, backgroundColor: $darkBlue}}>
                            <View style={tableElement1}><Text style={standardText}>Player</Text></View>
                            <Text style={tableElement9}>M</Text>
                            <Text style={tableElement9}>A</Text>
                            <Text style={tableElement9}>G</Text>
                            <Text style={tableElement9}>OG</Text>
                            <Text style={tableElement9}>YC</Text>
                            <Text style={tableElement9}>RC</Text>
                            <Text style={tableElement9}>B</Text>
                            <Text style={tableElement9}>PM</Text>
                            <Text style={tableElement9}>GC</Text>
                        </View>
            <ScrollView style={screenContainer}>
                    <View style={{paddingBottom: vh(30)}}>
                        {this.renderRows()}
                    </View>
                {/* <Dialog
                visible={this.state.dialog.active}
                width={0.6}
                height={0.2}
                onTouchOutside={()=>this.setState({...this.state, dialog:{active: false}})}
                >
                    <DialogContent>
                        <Text>Please review your stats before submission! Once submitted, stats cannot be changed. Clicking confirm will submit these stats and set this 'Game' to complete.</Text>
                    </DialogContent>
                    <DialogButton
                    text="SUBMIT STATS"
                    onPress={this.validatePlayerScores}
                    />
                </Dialog> */}
            </ScrollView>

            </View> 
        );
    }
}

const mapStateToProps = state => {
    return {
        clubPlayers: state.players.clubPlayers,
        gwSelect: state.gameweek.gwSelect,
        adminUser: state.endUser.adminUser.adminUser,
        allUsers: state.endUser.adminUser.allUsers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        completeGameState: id => dispatch(completeGameState(id))
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(GameEditorScreen);