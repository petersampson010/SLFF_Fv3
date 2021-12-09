import { vh, vw } from "react-native-expo-viewport-units";

export const gameContainer = {
    height: vh(7),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: vw(2),
    paddingVertical: vw(1),
    borderTopWidth: 0.2,
    borderTopColor: 'grey'
}

export const gameScore = {
    paddingRight: vh(2),
    paddingTop: vh(2),
}

export const listLabel = {
    width: vw(100),
    backgroundColor: 'grey',
    height: vh(3),
    paddingLeft: vw(2)

}

export const gamesContainer = {
    // paddingLeft: vw(2)
}