import { vh, vw } from "react-native-expo-viewport-units"
import { $arylideYellow, $inputBlue, $luminousGreen, $skobeloff } from "./global"
import { headers, labelText, standardText } from "./textStyle"

export const inputFieldVeryLarge = {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    backgroundColor: $inputBlue,
    height: vh(36), 
    width: vw(70),
    marginBottom: vh(3)
}

export const inputFieldLarge = {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    backgroundColor: $inputBlue,
    height: vh(6), 
    width: vw(70),
    marginBottom: vh(3)
}

export const inputFieldSmall = {
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    backgroundColor: $inputBlue,
    // height: vh(3), 
    // width: vw(12),
    marginVertical: vh(0.5)
}

export const inputFieldContainerCenter = {
    alignItems: 'center',
    flex: 1,
    paddingTop: vh(5),
    paddingBottom: vh(25)
}

export const inputFieldContainerInLine = {
    flexDirection: 'row',
    width: vw(100),
    justifyContent: 'space-evenly'
}

export const input = {
    ...standardText,
    height: vh(3),
    marginLeft: vw(3)
}