import { vh, vw } from "react-native-expo-viewport-units";
import { $arylideYellow, $zaGreen } from "../../styles/global";

export const buttonText = {
    color: $arylideYellow,
    fontSize: 14,
    fontFamily: 'Avenir Next',
    textAlign: 'center'
}

export const buttonContainer = {
    paddingVertical: vh(2),
    borderRadius: 20,
    borderWidth: 0.2, 
    borderColor: $zaGreen,
    margin: vw(0.5),
    flexDirection: 'row',
    justifyContent: 'center'
}

export const buttonSplit = {
    padding: vh(1),
    width: vw(100),
    flexDirection: 'row',
    justifyContent: 'space-evenly'
} 