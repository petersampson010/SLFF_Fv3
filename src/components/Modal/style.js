import { $baseBlue, $chocolateBlack, $coral, $darkBlue, $electricBlue, $electricBlueHighlight, $luminousGreen, $standardWhite, $zaGreen } from "../../styles/global";
import {vw, vh} from 'react-native-expo-viewport-units';


export const modalContainer = {
    position: "absolute",
    top: vh(20),
    backgroundColor: $darkBlue,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: $zaGreen,
    alignItems: 'center', 
    padding: vh(3),
    // paddingTop: vh(20),
    zIndex: 999
}

export const modalJSX = {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: vh(2),
    width: '100%'
}

export const buttons = {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: vh(2)
}

export const closeButton = {
    position: 'absolute',
    bottom: vh(1),
    alignItems: 'center',
}

export const modalTextContainer = {
    alignItems: 'center', 
}

export const modalSplitContainer = {
    flexDirection: 'row',
    justifyContent: 'space-between'
}

export const captainBox = {
    elevation: 8,
    width: vw(30),
    marginVertical: vh(1),
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
}

export const subImage = {
    height: vh(2),
    width: vw(5),
}

export const pickTeamStats = {
    width: vw(35)
}