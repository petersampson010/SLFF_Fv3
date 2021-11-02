import { vh, vw } from "react-native-expo-viewport-units";
import { $arylideYellow, $zaGreen } from "./global";

export const buttonText = {
    color: $arylideYellow,
    fontSize: 14,
    fontFamily: 'Avenir Next',
    textAlign: 'center'
}

export const buttonContainer = {
    paddingVertical: vh(2),
    borderRadius: 20,
    borderLeftWidth: 0.2, 
    borderLeftColor: $zaGreen,
    borderRightWidth: 0.2, 
    borderRightColor: $zaGreen
}

export const buttonSplit = {
    padding: vh(1),
    width: vw(100),
    flexDirection: 'row',
    justifyContent: 'space-evenly'
} 