import { $baseBlue, $cadetBlue, $chocolateBlack, $col1, $coral, $darkBlue, $darkElectricBlue, $electricBlue, $electricBlueHighlight, $luminousGreen, $mellowApricot, $offWhite, $onyx, $platinum, $sage, $spaceCadet, $standardWhite, $zaGreen } from "../../styles/global";
import {vw, vh} from 'react-native-expo-viewport-units';


export const modalContainer = {
    position: "absolute",
    top: vh(15),
    backgroundColor: '#C5C5C5',
    borderRadius: 12,
    alignItems: 'center', 
    padding: vh(3),
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

export const captainCheckbox = {
    flexDirection: 'row', 
    justifyContent: 'center', 
    width: vh(3), 
    height: vh(3), 
}

export const captainCheckboxContainer = {
    height: vh(18),
    justifyContent: 'space-evenly'
}