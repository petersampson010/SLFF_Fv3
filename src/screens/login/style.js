import { vh, vw } from "react-native-expo-viewport-units";
import { $arylideYellow, $inputBlue, $luminousGreen, $skobeloff } from "../../styles/global";
import { headers, labelText, standardText } from "../../styles/textStyle";

export const loginHead = {
    ...headers,
    marginBottom: vh(7),
}

export const switchText = {
    ...standardText,
    paddingBottom: vh(3),
}

export const textLabel = {
    ...labelText,
    width: vw(70),
    textAlign: 'left',
}