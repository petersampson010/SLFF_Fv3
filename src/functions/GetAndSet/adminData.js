import { useDispatch } from "react-redux";
import { loginAdminUser } from "../../actions";
import { getAllPlayersByAdminUserId, getAllUsersByAdminUserId } from "../APIcalls";
import { getLastAndAllGWs } from "../reusable";

const adminData = async(adminUser) => {
    try {
        let clubPlayers = await getAllPlayersByAdminUserId(adminUser.admin_user_id);
        let allUsers = await getAllUsersByAdminUserId(adminUser.admin_user_id);
        let { lastGW, GWs } = await getLastAndAllGWs(adminUser.admin_user_id);
        return loginAdminUser(adminUser, clubPlayers, allUsers, GWs, lastGW);
    } catch (e) {
        return false;
    }
}

export default adminData;