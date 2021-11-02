import { vh, vw } from "react-native-expo-viewport-units";
import { $baseBlue, $chocolateBlack } from "../../styles/global";

export const overlay = {
    position: 'absolute',
    zIndex: 1,
    width: vw(100),
    height: vh(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: $chocolateBlack,
    opacity: 0.8,
    paddingBottom: vh(25)
}