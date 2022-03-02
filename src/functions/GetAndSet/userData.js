import { getAdminUserById, getAllPGJFromUserId, getAllPGJsFromGameweekId, getAllPlayersByAdminUserId, getAllRecordsByUserId, getLeague, getPlayerById, getPlayersByUserIdGWIdSub, getUGJ, getUGJs, getUserById } from "../APIcalls";
import { getLastAndAllGWs } from "../reusable";
import { loginUser } from "../../actions";


const userData = async(user) => {
  try {
    const adminUser = await getAdminUserById(user.admin_user_id);
        let { lastGW } = await getLastAndAllGWs(adminUser.admin_user_id);
        let clubPlayers = await getAllPlayersByAdminUserId(adminUser.admin_user_id);
        let currentStarters = await getPlayersByUserIdGWIdSub(user.user_id, 0, false);
        let currentSubs = await getPlayersByUserIdGWIdSub(user.user_id, 0, true);
        let records = await getAllRecordsByUserId(user.user_id);
        let league = await getLeague(adminUser.admin_user_id);
        if (lastGW) {
          const { gameweek_id } = lastGW;
          let lastGWStarters = await getPlayersByUserIdGWIdSub(user.user_id, gameweek_id, false);
          let lastGWSubs = await getPlayersByUserIdGWIdSub(user.user_id, gameweek_id, true);
          let lastPGJs = await getAllPGJsFromGameweekId(gameweek_id);
          if (lastPGJs.length<1) {
            return loginUser(user, adminUser, clubPlayers, currentStarters, currentSubs, lastGWStarters, lastGWSubs, records, league, lastGW, lastPGJs, [], [], null, null, []);
          } else {
            let allPGJs = await getAllPGJFromUserId(user.user_id);
            let allLastUGJs = await getUGJs(adminUser.admin_user_id, gameweek_id);
            let lastUGJ = await getUGJ(user.user_id, gameweek_id);
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
            return loginUser(user, adminUser, clubPlayers, currentStarters, currentSubs, lastGWStarters, lastGWSubs, records, league, lastGW, lastUGJ, lastPGJs, allLastUGJs, topPlayer, topUser, allPGJs);
          }
        } else {
          return loginUser(user, adminUser, clubPlayers, currentStarters, currentSubs, [], [], records, league, null, null, [], [], null, null, []);
        }
      } catch(e) {
        return false;
      }
}

export default userData;