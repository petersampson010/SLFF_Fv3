import { vh, vw } from "react-native-expo-viewport-units";
import { $baseBlue, $darkBlue, $standardWhite } from "../../styles/global";

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
    fontSize: 30,
    color: $standardWhite,
    fontWeight: 'bold',
    paddingBottom: vh(20)
}