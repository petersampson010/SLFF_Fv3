import { vh, vw } from "react-native-expo-viewport-units";
import { $darkBlue, $electricBlue, $electricBlueHighlight, $seaBlue } from "../../styles/global";
import { gwTEXT, headers, labelText, pointsBannerTEXT, team_nameTEXT } from "../../styles/textStyle";

export const pitchHead = {
    width: vw(96),
    marginHorizontal: vw(2),
    borderRadius: 7,
    backgroundColor: 'rgba(249,249,249,0.1)'
}

export const transfersX = {
    padding: vw(3),
    flexDirection: 'row',
    justifyContent: 'space-between'
}

export const pitchHeadComp = {
    width: vw(20)
}

export const pickTeamX = {
    width: vw(94),
    marginHorizontal: vw(2),
    padding: vw(3),
    flexDirection: 'row',
    justifyContent: 'flex-end'
}

export const pointsY = {
    width: vw(92),
}

export const pointsYComp = {
    width: vw(30),
}

export const pitchHeadLeft = {
    ...pitchHeadComp,
    textAlign: 'left'
}

export const pitchHeadRight = {
    ...pitchHeadComp,
    textAlign: 'right'
}

export const team_nameContainer = {
    width: vw(96),
    marginHorizontal: vw(2),
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: vw(2),
    marginTop: vh(1),
}

export const team_nameText = {
    ...team_nameTEXT,
    padding: vh(0.5),
    textAlign: 'center',
    borderRadius: 5,
    // backgroundColor: $seaBlue
}

export const gameweekBanner = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...gwTEXT, 
    width: vw(96),
    height: vh(4),
    marginHorizontal: vw(2),
    borderRadius: 7,
    backgroundColor: 'rgba(249,249,249,0.1)'
}

export const gwArrow = {
    width: vw(10), 
    paddingHorizontal: vw(2), 
    height: vh(4),
    justifyContent: 'center',
    backgroundColor: $electricBlue
}

export const gwText = {
    height: vh(4),
    justifyContent: 'center',
}

export const pointsBanner = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: vh(6),
    width: vw(96),
    marginHorizontal: vw(2),
    marginBottom: vh(-6),
    marginTop: vh(1)
}

export const pointsBannerComp = {
    width: vw(15),
    backgroundColor: 'rgba(249,249,249,0.1)',
    borderRadius: 6,
    padding: vh(0.5)
}