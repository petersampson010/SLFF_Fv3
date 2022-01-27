import { vh, vw } from "react-native-expo-viewport-units";
import { $arylideYellow, $chocolateBlack, $darkBlue } from "../../styles/global";
import { standardText } from "../../styles/textStyle";

export const profile = {
    width: vw(15),
    height: vh(9),
    resizeMode: 'cover',
    borderRadius: 30,
    textAlign: 'center',
    backgroundColor: 'yellow'
}

export const title = {
    ...standardText,
    textAlign: 'center'
}

export const profileContainer = {
    width: vw(40),
    borderTopColor: $arylideYellow,
    borderTopWidth: 1,
    borderLeftColor: $arylideYellow,
    borderLeftWidth: 1,
    borderRightColor: $arylideYellow,
    borderRightWidth: 1,
    padding: vh(1)
}

export const profileFlexContainer = {
}

export const playerInfo = {
    flexDirection: 'row',
}

export const playerImg = {
}

export const playerBio = {
    color: 'white',
    flexDirection: 'column'
}

export const playerStats = {
    height: vh(5),
    flexDirection: 'row',
}

export const buttons = {
    flexDirection: 'row'
}

export const GWContainer = {
    flexDirection: 'row',
    justifyContent: 'center'
}

export const GWInfoContainer = {
    marginVertical: vh(2),
    textAlign: 'center',
    margin: vh(0.3),
    width: vw(18),
    height: vh(6)
}

export const infoTitle = {
    height: vh(2.5),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: $darkBlue,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
}

export const infoScore = {
    height: vh(4),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:  'white',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
}