import { showMessage } from "react-native-flash-message";
import { fetchAllUsers } from "./APIcalls";
import { playersObjToArray } from "./reusable";
import globalConfig from '../config/globalConfig.json';


export const validatePlayer = player => {
    if (player.name!==''&&player.price!==0) {
        return true;
    } else {
        return false;
    }
}

export const validateUser = (allUsers, aUser, user) => {
    let result = true;
    if (aUser.admin_user_id) {
        allUsers.forEach(x => {
            if (x.email===user.email) {
                showMessage({
                    message: "Email address already in use",
                    type: "danger"
                });
                result = false;
            }
        })
    } else {
        showMessage({
            message: "Invalid club ID",
            type: "danger"
        })
        result = false;
    }
    return result;
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

export const validateTransfers = (budget, team) => {
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
}