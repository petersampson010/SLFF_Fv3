import { vh, vw } from "react-native-expo-viewport-units";
import { $arylideYellow, $chocolateBlack, $darkBlue, $platinum, $zaGreen } from "../../styles/global";

export const buttonText = {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'Avenir Next',
    textAlign: 'center'
}

export const buttonContainer = {
    // backgroundColor: '#378f00',
    paddingVertical: vh(1),
    borderRadius: 20,
    borderWidth: 2,
    margin: vw(0.5),
    flexDirection: 'row',
    justifyContent: 'center'
}

export const absoluteButton = {
    zIndex: 99999,
    position: 'absolute',
    bottom: vh(30),
    right: vh(3),
    backgroundColor: $darkBlue
}

export const buttonSplit = {
    position: 'absolute',
    bottom: vh(15),
    padding: vh(1),
    width: vw(100),
    flexDirection: 'row',
    justifyContent: 'space-evenly'
} 