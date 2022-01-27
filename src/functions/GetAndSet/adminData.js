import { useDispatch } from "react-redux";
import { loginAdminUser } from "../../actions";
import { getAllPlayersByAdminUserId, getAllUsersByAdminUserId } from "../APIcalls";
import { getLastAndAllGWs } from "../reusable";

const adminData = async(adminUser) => {
    try {
        let clubPlayers = await getAllPlayersByAdminUserId(adminUser.admin_user_id);
        console.log(clubPlayers);
        let allUsers = await getAllUsersByAdminUserId(adminUser.admin_user_id);
        console.log(allUsers);
        let { lastGW, GWs } = await getLastAndAllGWs(adminUser.admin_user_id);
        console.log(lastGW);
        console.log(GWs);
        return loginAdminUser(adminUser, clubPlayers, allUsers, GWs, lastGW);
    } catch (e) {
        return false;
    }
}

export default adminData;