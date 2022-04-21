import { vh, vw } from "react-native-expo-viewport-units"
import { $arylideYellow, $baseBlue, $darkBlue, $inputBlue } from "../../styles/global"
import { appTitleTEXT, standardText } from "../../styles/textStyle"

export const gwInfo = {
    // height: vh(30),
    marginBottom: vh(2)
}

export const topPerformers = {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: vh(2),
    width: vw(100),
}

export const topPerformerContainer = {
    height: vh(10),
    width: vh(10),
    borderRadius: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: $darkBlue,
    shadowColor: $arylideYellow,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 1,
    shadowRadius: 5,
}

export const appClubContainer  = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: vh(1)
}

export const appLogoTitleContainer = {
    justifyContent: 'center'
}

export const appTitle = {
    ...appTitleTEXT,
    padding: vh(1)
}

export const recentGame = {
    zIndex: 999,
    color: $arylideYellow,
    fontFamily: 'Avenir Next',
    left: vw(3),
}