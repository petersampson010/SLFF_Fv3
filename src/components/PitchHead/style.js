import { vh, vw } from "react-native-expo-viewport-units";
import { $darkBlue } from "../../styles/global";

export const pitchHead = {
    padding: vw(3),
    flexDirection: 'row',
    justifyContent: 'space-between'
}

export const pitchHeadComp = {
    width: vw(20)
}

export const pitchHeadLeft = {
    ...pitchHeadComp,
    textAlign: 'left'
}

export const pitchHeadRight = {
    ...pitchHeadComp,
    textAlign: 'right'
}

export const teamNameContainer = {
    width: vw(100),
    height: vh(4),
    textAlign: 'center'
}