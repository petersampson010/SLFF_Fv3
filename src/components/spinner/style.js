import { vh, vw } from "react-native-expo-viewport-units";
import { $baseBlue, $darkBlue, $darkBlueMidOpacity, $darkBlueOpacity, $standardWhite } from "../../styles/global";
import { appTitleTEXT } from "../../styles/textStyle";

export const overlay = {
    position: 'absolute',
    zIndex: 10,
    width: vw(100),
    height: vh(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: $darkBlueMidOpacity,
    paddingBottom: vh(25)
}

export const spinnerTitle = {
    ...appTitleTEXT,
    zIndex: 999,
    paddingBottom: vh(20)
}