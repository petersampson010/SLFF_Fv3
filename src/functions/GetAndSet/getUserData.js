import { useDispatch } from "react-redux";
import { getAdminUserById, getAllPGJFromUserId, getAllPGJsFromGameweekId, getAllPlayersByAdminUserId, getAllRecordsByUserId, getLeague, getPlayerById, getPlayersByUserIdGWIdSub, getUGJ, getUGJs, getUserById } from "../APIcalls";
import { getLastAndAllGWs } from "../reusable";

const dispatch = useDispatch()


const userData = () => {
    const { admin_user_id, user_id } = user;
        let { lastGW } = await getLastAndAllGWs(admin_user_id);
        let clubPlayers = await getAllPlayersByAdminUserId(admin_user_id);
        let adminUser = await getAdminUserById(admin_user_id);
        let currentStarters = await getPlayersByUserIdGWIdSub(user_id, 0, false);
        let currentSubs = await getPlayersByUserIdGWIdSub(user_id, 0, true);
        let records = await getAllRecordsByUserId(user_id);
        let league = await getLeague(admin_user_id);
        if (lastGW) {
          const { gameweek_id } = lastGW;
          let lastGWStarters = await getPlayersByUserIdGWIdSub(user_id, gameweek_id, false);
          let lastGWSubs = await getPlayersByUserIdGWIdSub(user_id, gameweek_id, true);
          let lastPGJs = await getAllPGJsFromGameweekId(gameweek_id);
          if (lastPGJs.length<1) {
            await dispatch(loginUser(user, adminUser, clubPlayers, currentStarters, currentSubs, lastGWStarters, lastGWSubs, records, league, lastGW, lastPGJs, [], [], null, null, []));
          } else {
            let allPGJs = await getAllPGJFromUserId(user_id);
            let allLastUGJs = await getUGJs(admin_user_id, gameweek_id);
            let lastUGJ = await getUGJ(user_id, gameweek_id);
            let pg = lastPGJs.sort((a,b)=>b.total_points-a.total_points);
            pg = pg[0];
            let topPlayer = pg ? {
              pg,
              player: await getPlayerById(pg.player_id)
            } : null;
            let ug = allLastUGJs.sort((a,b)=>b.total_points-a.total_points)[0];
            let topUser = ug ? {
              ug,
              user: await getUserById(ug.user_id)
            } : null;
            await dispatch(loginUser(user, adminUser, clubPlayers, currentStarters, currentSubs, lastGWStarters, lastGWSubs, records, league, lastGW, lastUGJ, lastPGJs, allLastUGJs, topPlayer, topUser, allPGJs));
          }
        } else {
          await dispatch(loginUser(user, adminUser, clubPlayers, currentStarters, currentSubs, [], [], records, league, null, null, [], [], null, null, []));
        }
}

export default userData;