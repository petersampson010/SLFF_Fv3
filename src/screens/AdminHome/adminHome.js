import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput } from 'react-native';
import { Input } from 'react-native-elements';  
import { connect } from 'react-redux';
import {vw, vh} from 'react-native-expo-viewport-units';
import { validateGame } from '../../functions/validity';
import DateTimePicker from '@react-native-community/datetimepicker';
import { postGame, patchGame } from '../../functions/APIcalls';
import { showMessage } from 'react-native-flash-message';
import TouchableScale from 'react-native-touchable-scale'
import { setClubFocusGW, addGameState, setModal, updateGameState, closeModal } from '../../actions';
import { displayDate } from '../../functions/reusable';
import MyModal from '../../components/Modal/MyModal';
import { TouchableOpacity } from 'react-native';
import { gameContainer, gamesContainer, gameScore, listLabel } from './style';
import { headers, labelText, modalLabelText, sidenote, standardText } from '../../styles/textStyle';
import { $arylideYellow, $chocolateBlack, $darkBlue, $luminousGreen, $zaGreen, screenContainer } from '../../styles/global';
import { buttonSplit } from '../../components/Button/style';
import Button from '../../components/Button/button';
import { game, submitOrEditGame } from '../../components/Modal/modalSetting';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import StateModal from '../../components/Modal/StateModal';
import { input, inputFieldLarge } from '../../styles/input';
import { textLabel } from '../login/style';


class AdminHomeScreen extends Component {
    state = { 
        modal: {
            active: false,
            update: false,
        },
        game: {
            dateModalVisible: false,
            opponent: '',
            date: new Date(),
            complete: false
        }
     }

    renderGame = (game, i) => <TouchableOpacity key={i} style={gameContainer}
    onPress={()=>this.setModal(game)}>
        <View>
            <Text style={labelText}>{game.opponent}</Text>
            <Text style={sidenote}>{displayDate(game.date)}</Text>
        </View>
        {game.complete ? 
        <View style={gameScore}>
            <Text style={standardText}>{game.score}</Text>
        </View>
            : <Button width={vw(35)} clickable text="Submit Stats" func={()=>this.openSubmitGameStats(game)}/>}
    </TouchableOpacity>

    openSubmitGameStats = (game) => {
        this.props.setClubFocusGW(game);
        this.props.closeModal();
        this.props.navigation.navigate('GameEditor');
    }

    renderGames = () => {
        let completedGamesSorted = this.props.games.filter(x => x.complete).sort((a,b)=>Date.parse(b.date)-Date.parse(a.date));
        let openGamesSorted = this.props.games.filter(x=>!x.complete).sort((a,b)=>Date.parse(b.date)-Date.parse(a.date));
        return <View style={gamesContainer}>
            <View style={listLabel}>
                <Text>Upcoming</Text>
            </View>
            <ScrollView>
                {openGamesSorted.map((game, i) => this.renderGame(game, i))}
            </ScrollView>
            <View style={listLabel}>
                <Text>Complete</Text>
            </View>
            <ScrollView>
                {completedGamesSorted.map((game, i) => this.renderGame(game, i))}
            </ScrollView>
        </View>
    }


    formChange = (id, value) => {
        this.setState({...this.state, 
        game: {...this.state.game,
            [id]: value
        }})
    }

    addGame = async() => {
        try {
            let res = await postGame(this.state.game, this.props.adminUser.admin_user_id);
            if (res.date) {
                this.props.addGameState(res);
                this.setState({
                    ...this.state,
                    modal: {active: false},
                    game: {
                        dateModalVisible: false,
                        opponent: '',
                        date: new Date(),
                        complete: false
                    }
                });
                showMessage({
                    message: "Game/Event added",
                    type: 'success'
                })
            }
        } catch(e) {
            showMessage({
                message: "Fail: Network Issue, please try again later",
                type: "danger"
              });
            console.warn(e);
        }
    }   

    updateGame = async() => {
        try {
            let res = await patchGame(this.state.game);
            if (res.date) {
                this.setState({
                    ...this.state,
                    modal: {active: false, update: false},
                });
                this.props.updateGameState(this.state.game);
                showMessage({
                    message: "Game/Event updated",
                    type: 'success'
                })
            }
        } catch(e) {
            showMessage({
                message: "Fail: Network Issue, please try again later",
                type: "danger"
              });
            console.warn(e);
        }
    }

    openDate = () => {
        console.log('attempting to open date time picker')
        this.setState({...this.state, game: {...this.state.game, dateModalVisible: true}})
    }

    setModal = (game) => {
        this.props.setModal({modalSet: 'set4', player: null, width: vw(80), height: vh(50), btnClick: () => this.openEditGameModal(game)});
    }

    openSubmitGameStats = (game) => {
        this.props.setClubFocusGW(game);
        this.props.closeModal();
        this.props.navigation.navigate('GameEditor');
    }

    openEditGameModal = (game) => {
        this.props.closeModal();
        this.setState({...this.state, modal: {active: true, update: true}, game});
    }

    render() {
        return ( 
            <View>
                <ScrollView style={screenContainer}>
                    <ScrollView>
                        {this.renderGames()}
                    </ScrollView>
                    <StateModal
                    modalActive={this.state.modal.active}
                    height={vh(40)}
                    width={vw(80)}
                    jsx={<View>
                        <Text style={modalLabelText}>Opposition</Text>
                        <View style={inputFieldLarge}>
                            <TextInput style={input} value={this.state.game.opponent}
                            onChangeText={value=>this.formChange('opponent', value)}
                            placeholder="Fantasy FC"
                            placeholderTextColor='#d1d2d6'
                            />
                        </View>
                        <Text style={modalLabelText}>Date</Text>
                        <TouchableOpacity onPress={this.openDate} style={inputFieldLarge}>
                            <DateTimePickerModal
                            isVisible={this.state.game.dateModalVisible}
                            mode='date'
                            date={this.state.game.date}
                            onConfirm={date=>this.setState({...this.state, game: {...this.state.game, date, dateModalVisible: false}})}
                            onCancel={()=>this.setState({...this.state, game: {...this.state.game, dateModalVisible: false}})}
                            />
                            <Text style={{...input, paddingTop: vh(1.5)}}>{displayDate(this.state.game.date)}</Text>
                        </TouchableOpacity>
                    </View>}
                    btn={<Button clickable modal text={this.state.modal.update ? "Edit Game" : "Submit Game"} func={this.state.modal.update ? this.updateGame : this.addGame} width={vw(35)}/>}
                    closeFcn={()=>this.setState({...this.state, modal: {active: false}})}
                    />
                    {/* <MyModal 
                    visible={this.state.modal2.active}
                    height={vh(60)}
                    width={vw(70)}
                    closeModalFcn={()=>
                        this.setState({...this.state, modal2: {active: false,
                            game: {
                                opponent: '',
                                date: new Date(),
                            }
                        }})
                    }
                    jsx={this.state.modal2.game.complete ? 
                        <Text>This game has been completed, you are unable to edit the player statistics</Text> 
                        : 
                        <View>
                        <Text style={standardText}>Edit game or update stats</Text><Text style={standardText}>Remember... when entering player stats and completing a game, all changes are final so be sure to double check your entries!</Text>
                        </View>}
                        buttonOptions={this.state.modal2.game.complete ? [] : [
                            {
                                text: 'Submit Game Stats', 
                                fcn: ()=>{this.setState({...this.state, modal2: {...this.state.modal2, active: false}});this.props.navigation.navigate('GameEditor')}
                            },
                            {
                            text: 'Edit Game', 
                            fcn: ()=>this.setState({...this.state, modal: {active: true, update: true, game: this.state.modal2.game}, modal2: {...this.state.modal2, active: false}})
                        }
                    ]}
                /> */}
                </ScrollView>
            <View style={buttonSplit}>
                <Button clickable text='Add Event/Game' func={()=>this.setState({...this.state, modal: {active: true}})} width={vw(40)} />
                <Button clickable text='Edit Player(s)' func={()=>this.props.navigation.navigate('AdminPlayerEdit')} width={vw(40)} />
            </View>

            </View>
         );
    }
}

const mapStateToProps = state => {
    return {
        games: state.club.allGames,
        adminUser: state.club.adminUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setClubFocusGW: game => dispatch(setClubFocusGW(game)),
        addGameState: game => dispatch(addGameState(game)),
        updateGameState: game => dispatch(updateGameState(game)),
        setModal: modalObj => dispatch(setModal(modalObj)),
        closeModal: () => dispatch(closeModal())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(AdminHomeScreen);