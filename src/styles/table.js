import { vh, vw } from "react-native-expo-viewport-units"
import { $arylideYellow, $electricBlueHighlight, $standardWhite } from "./global"

export const tableRow = {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: $electricBlueHighlight,
    padding: vh(0.5)
}

export const tableRowHead = {
    ...tableRow,
    borderTopWidth: 1, 
    borderTopColor: $arylideYellow, 
    marginTop: vh(2), 
    textAlign: 'center'
}

export const tableElement3 = {
    width: vw(30),
}

export const tableElement4 = {
    width: vw(8),
}

export const tableElement9 = {
    width: vw(8),
    height: vh(6),
    // paddingTop: vh(1),
    fontSize:  16,
    color: $standardWhite,
    borderRightWidth: 1,
    borderRightColor: $electricBlueHighlight,
    textAlign: 'center'
}

export const tableElement1 = {
    flex: 1,
    height: vh(6),
    justifyContent: 'center',
    width: vw(20),
    borderRightWidth: 1,
    borderRightColor: $electricBlueHighlight,
    paddingRight: vh(1)
}