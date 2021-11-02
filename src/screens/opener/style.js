import { vh, vw } from "react-native-expo-viewport-units"
import { $darkBlue } from "../../styles/global"

export const optionsContainer = {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: vh(25)
}

export const optionContainer = {
    width: vw(70), 
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: vh(1)
}

export const optionUsContainer = {
    height: vh(10), 
    width: vw(70), 
}

export const optionHead = {
    color: 'white',
    fontFamily: 'Avenir Next',
    fontSize: 20,
}

export const optionText = {
    color: 'white',
    fontFamily: 'Avenir Next',
    fontSize: 13,
    marginBottom: vh(2)
}