import { vh, vw } from "react-native-expo-viewport-units"
import { $arylideYellow, $chocolateBlack } from "../../styles/global"
import { inputFieldSmall } from "../../styles/input"
import { tableElement3 } from "../../styles/table"
import { labelText, standardText } from "../../styles/textStyle"

export const picker = {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    ...standardText,
    width: vw(25)
}

export const pickerItemStyle = {
    height: vh(5),
    color: $arylideYellow
}

export const topBar = {
    flexDirection: 'row',
    justifyContent: 'space-between'
}

export const textBox = {
    ...standardText,
    borderBottomWidth: 0.3,
    borderBottomColor: $arylideYellow,

}

export const headerTextBox = {
    ...labelText,
    textAlign: 'center',
}