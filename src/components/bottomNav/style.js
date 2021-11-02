import { vh, vw } from 'react-native-expo-viewport-units';
import { $arylideYellow, $baseBlue, $chocolateBlack, $coral, $darkBlue, $darkBlueOpacity, $darkElectricBlue, $electricBlue, $electricBlueHighlight, $onyx, $platinum, $sage, $seaBlue, $skobeloff } from '../../styles/global';

export const navContainer = {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: $darkBlueOpacity,
    position: 'absolute',
    height: vh(7),
    width: vw(94),
    marginLeft: vw(3),
    top: vh(80)
}

export const navText = {
    textAlign: "center",
    color: 'white',
    fontSize: 17,
    fontWeight: '500',
    fontFamily: 'Avenir Next',
}

export const navSectionBackground = {
    flex: 1,
    backgroundColor: 'rgb(49, 52, 62)',
    borderRadius: 9
}

export const navSectionContainer = {
    justifyContent: 'center',
    height: vh(7),
    width: vw(22),
    borderWidth: 1,
    borderColor: $electricBlueHighlight,
    borderRadius: 9
}
