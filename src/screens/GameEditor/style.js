import { vh, vw } from "react-native-expo-viewport-units";
import { $electricBlueHighlight } from "../../styles/global";
import { tableElement9 } from "../../styles/table";

export const headComp = {
    ...tableElement9,
    transform: [{rotate: '278deg'}, {translateX: -95}, {translateY: 11}],
    width: vw(8),
    height: vw(8),
    justifyContent: 'center'
}

export const tableComp = {
    ...tableElement9,
    borderRightWidth: 1,
    borderRightColor: $electricBlueHighlight,
    width: vw(8),
    height: vh(6)
}