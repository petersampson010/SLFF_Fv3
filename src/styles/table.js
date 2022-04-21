import { vh, vw } from "react-native-expo-viewport-units"
import { $arylideYellow, $electricBlueHighlight, $standardWhite } from "./global"

export const tableRow = {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: $electricBlueHighlight,
    paddingVertical: vh(0.5),
    marginHorizontal: vw(2)
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
    width: vw(18),
    justifyContent: 'center',
    padding: vh(1)
}

export const tableElement9 = {
    fontSize:  16,
    color: $standardWhite,
    textAlign: 'center',
}

export const tableElement1 = {
    flex: 1,
    justifyContent: 'center',
    padding: vh(1),
}