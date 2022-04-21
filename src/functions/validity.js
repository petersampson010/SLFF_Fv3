import { showMessage } from "react-native-flash-message";
import { getAllUsers } from "./APIcalls";
import { playersObjToArray } from "./reusable";
import globalConfig from '../config/globalConfig.json';
import { useSelector } from "react-redux";


export const validatePlayer = player => {
    if (player.name!==''&&player.price!==0) {
        return true;
    } else {
        return false;
    }
}

export const validatePickTeam = (team) => {
    if (playersObjToArray(team).length===globalConfig.numberOfStarters) {
        return true;
    } else {
        showMessage({
            message: `You need ${globalConfig.numberOfStarters} starting players`,
            type: "danger"
        });
        return false;
    }
}

export const validatePlayerScore = playerScore => {
    let totalScore = 0;
    let reg = new RegExp('^[0-9]{1,2}$');
    Object.values(playerScore).map(x => {
        if (reg.test(x)) {
            totalScore+=parseInt(x);
        }
    })
    totalScore-=playerScore.gameweek_id+playerScore.player_id;
    if (playerScore.minutes>0) {
        return { result: true, post: true }
    } else if (totalScore>0) {
        return { result: false, post: false }
    } else {
        return { result: true, post: true }
    }
}

export const validateTransfers = (transfers, transfersAvailable, budget, team) => {
    if (transfers<=transfersAvailable) {
        if (budget>=0) {
            if (playersObjToArray(team).length===globalConfig.numberOfPlayers) {
                return true;
            } else {
                showMessage({
                    type: 'warning',
                    message: `you need ${globalConfig.numberOfPlayers} players on your team`
                });
                return false;
            }
        } else {
            showMessage({
                type: 'warning',
                message: "Not enough funds for these transfers"
            });
            return false;
        }
    } else {
        showMessage({
            type: 'warning',
            message: "You do not have the transfers available"
        });
        return false;
    }
}