import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Navigation from './Navigation';
import SpinnerOverlay from './components/spinner/spinner';
import { clearStorage, getStorage, getTokenAndId } from './functions/storage';
import userData from './functions/GetAndSet/userData';
import adminData from './functions/GetAndSet/adminData';
import { getAdminUserById, getUserById } from './functions/APIcalls';
import { View } from 'react-native';
import { screenContainer } from './styles/global';
import { flashMyMessage } from './functions/flashMyMessage';

const LoadContainer = () => {

    const [onLoad, updateOnLoad] = useState(true);
    const [initialRoute, updateInitialRoute] = useState('Opener');
    const dispatch = useDispatch();
  
    useEffect(() => {
        const loggedIn = async() => {
            // await clearStorage();
            try {
                let session = await getStorage('session');
                if (session) {
                    const { user_id, admin_user_id } = session;
                    if (user_id) {
                        const user = await getUserById(user_id);
                        dispatch(await userData(user));
                        updateInitialRoute('Home'); 
                    } else if (admin_user_id) {
                        const adminUser = await getAdminUserById(admin_user_id);
                        const adminDataObj = await adminData(adminUser);
                        adminDataObj ? dispatch(adminDataObj) : null;
                        updateInitialRoute('AdminHome');
                    }
                }
            } catch(e) {
                flashMyMessage(e, 'danger');
                console.warn(e)
            }
            updateOnLoad(false);
        };
        loggedIn(); 
    }, []);

    return onLoad ? 
            <View style={screenContainer}>
                <SpinnerOverlay/>
            </View>
            :
            <Navigation initialRoute={initialRoute}/>;
}

export default LoadContainer;
