import { vh, vw } from "react-native-expo-viewport-units";
import { $baseBlue, $darkBlue, $standardWhite } from "../../styles/global";
import { appTitleTEXT } from "../../styles/textStyle";

export const overlay = {
    position: 'absolute',
    zIndex: 1,
    width: vw(100),
    height: vh(100),
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: $darkBlue,
    opacity: 0.8,
    paddingBottom: vh(25)
}

export const spinnerTitle = {
    ...appTitleTEXT,
    paddingBottom: vh(20)
}