import { vh, vw } from 'react-native-expo-viewport-units';
import { $arylideYellow, $baseBlue, $caretColor } from '../../styles/global';


export const container = {
    alignItems: 'center',
    width: vw(20)
}

export const subContainer = {
    width: vw(18),
    flexDirection:  "row",
    alignItems: 'center',
    justifyContent: 'center',
}

export const playerImage = {
    height: vh(5),
    width: vw(10),
    borderRadius: 50
}

export const playerImageLarge = {
    height: vh(18),
    width: vw(30),
    borderRadius: 500
}

export const capText = {
    color: $arylideYellow,
    textAlign: 'center',
    fontWeight: "800"
}