import React, { Component } from 'react';
import { ScrollView, TouchableOpacity, Text, View, Image } from 'react-native';
import { connect, useSelector } from 'react-redux';
import Header from '../../components/header/header';
import { displayDate, getTeamPointsInfo, topPlayer, topUser } from '../../functions/reusable';
import BottomNav from '../../components/bottomNav/bottomNav';
import { $arylideYellow, $darkBlue, $darkBlueOpacity, $inputBlue, $platinum, screenContainer } from '../../styles/global';
import { appClubContainer, appLogoTitleContainer, appTitle, gwInfo, leagueTable, recentGame, topPerformerContainer, topPerformers } from './style';
import PlayerGWProfile from '../../components/profile/playerGWProfile';
import UserGWProfile from '../../components/profile/userGWProfile';
import GWScore from '../../components/gwScore/gwScore';
import { tableElement3, tableRow, tableRowHead } from '../../styles/table';
import { clubNameTEXT, headers, sidenote, standardText } from '../../styles/textStyle';
import { vh, vw } from 'react-native-expo-viewport-units';
import { headerText } from '../../components/header/style';
import NoScoreGW from '../../components/noScoreGW/noScoreGW';
import { getAllRecordsByUserId, getGWStartersByUserId, getGWSubsByUserId, getUGJ, getUserById } from '../../functions/APIcalls';
import { setModal, setOtherTeamPoints } from '../../actions';
import { showMessage } from 'react-native-flash-message';
import LinearGradient from 'react-native-linear-gradient';
import AnimatedLinearGradient, {presetColors} from 'react-native-animated-linear-gradient'


const HomeScreen = ({navigation}) => {

    const [modal, updateModal] = useState({
        topPlayer: false,
        topUser: false
    }),
    user = useSelector(state => state.user.user),
    adminUser = useSelector(state => state.club.adminUser),
    league = useSelector(state => state.club.league),
    topPlayer = useSelector(state => state.club.topPlayer),
    topUser = useSelector(state => state.club.topUser),
    lastGW = useSelector(state => state.club.lastGW ? state.club.lastGW : false),
    lastUGJ = useSelector(state => state.user.focusedGWTeam.UGJ),
    setOtherTeamPointsFUNC = useDispatch((starters, subs, records, UGJ, allPGJs, otherUser) => setOtherTeamPoints(starters, subs, records, UGJ, allPGJs, otherUser)),
    setModalFUNC = useDispatch(modalObj => setModal(modalObj))
    

    const renderRows = () => {
        return league.sort((a,b)=>b.total_points-a.total_points).map((team, i)=>
        <TouchableOpacity key={i}
            style={tableRow}
            onPress={() => goToTeamPoints(team)}>
            <Text style={{...tableElement3, ...standardText}}>{team.team_name}</Text>
            <Text style={{...tableElement3, ...standardText}}>{team.total_points}</Text>
            {lastGW ? <Text style={{...tableElement3, ...standardText}}>{team.gw_points}</Text> : null}
        </TouchableOpacity>);
    }

    const goToTeamPoints = async(team) => {
        if (lastGW) {
            const { starters, subs, records, otherUGJ, allPGJs } = await getTeamPointsInfo(team.user_id, lastGW.gameweek_id, true);
            const otherUser = await getUserById(team.user_id);
            if (otherUGJ) {
                setOtherTeamPointsFUNC(starters, subs, records, otherUGJ, allPGJs, otherUser);
                navigation.navigate('Points');
            } else {
                showMessage({
                    message: "Team has not yet completed a GW",
                    type: 'warning'
                });
            }
        } else {
            showMessage({
                message: "Club has not yet completed a GW",
                type: 'warning'
            });
        }
    }

    const closeModal = type => {
        updateModal({
            ...modal,
            [type]: false
        })
    }

    const openModal = type => {
        updateModal({
            ...modal,
            [type]: true
        })
    }

    const setModalCheck = (entry) => {
        if (entry.player) {
            setModalFUNC({modalSet: 'set3', player: entry.player, pg: entry.pg, btnClick: null, width: vw(80), height: vh(50)});
        } else {
            setModalFUNC({modalSet: 'set3', user: entry.user, ug: entry.ug, btnClick: null, width: vw(80), height: vh(50)});
        }
    }
        const opacity = modal.topPlayer || modal.topUser ? 0.1 : 1;
        return ( 
            <View style={screenContainer}>
                <View style={appClubContainer}>
                    <View style={appLogoTitleContainer}>
                        <Image alt='app logo'/>
                        <Text style={appTitle}>SLFF</Text>
                    </View>
                    <View  style={appLogoTitleContainer}>
                        <Text style={clubNameTEXT}>{adminUser.club_name}</Text>
                    </View>
                </View>
                <View style={{opacity}}>
                    {lastGW && topPlayer && topUser ? 
                    <View style={gwInfo}>
                        <Text style={recentGame}>Most Recent Game</Text>
                        <GWScore backgroundColor={$inputBlue}/>
                        <Text style={{...sidenote, textAlign: 'right'}}>{displayDate(lastGW.date)}</Text>
                        <View style={topPerformers}>
                            <TouchableOpacity style={topPerformerContainer} onPress={()=>setModalCheck(topPlayer)}>
                                    <Text style={{color: $arylideYellow, fontWeight: 'bold'}}>Top Player</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={topPerformerContainer} onPress={()=>setModalCheck(topUser)}>
                                    <Text style={{color: $arylideYellow, fontWeight: 'bold'}}>Top User</Text>
                            </TouchableOpacity>
                        </View>
                    </View> : <NoScoreGW/>}
                    {lastGW ? 
                    <View>
                        <View style={tableRowHead}>
                            <Text style={{...tableElement3, ...standardText}}>Team</Text>
                            <Text style={{...tableElement3, ...standardText}}>Total</Text>
                            {lastGW ? 
                            <Text style={{...tableElement3, ...standardText}}>vs. {lastGW.opponent}</Text>
                            : null}
                        </View>
                        <ScrollView style={''}>
                            <View style={{paddingBottom: vh(20)}}>
                                {renderRows()}
                            </View>
                        </ScrollView>
                    </View>
                    : null}
                </View>
                <BottomNav navigation={navigation}/>
            </View>
         );
}
 
export default HomeScreen;
