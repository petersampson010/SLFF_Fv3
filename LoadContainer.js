import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createStore } from 'redux';
import Navigation from './src/Navigation';
import rootReducer from './src/rootReducer';
import FlashMessage from 'react-native-flash-message';
import SpinnerOverlay from './src/components/spinner/spinner';
import MyModal from './src/components/Modal/MyModal';
import { clearStorage, getStorage, getTokenAndId } from './src/functions/storage';
import userData from './src/functions/GetAndSet/userData';
import adminData from './src/functions/GetAndSet/adminData';
import { getAdminUserById, getUserById } from './src/functions/APIcalls';

const LoadContainer = () => {

    const [onLoad, updateOnLoad] = useState(true);
    const [initialRoute, updateInitialRoute] = useState('Opener');
    const dispatch = useDispatch();
  
    useEffect(() => {
        console.log('HITTING LOAD CONTAINER USE EFFECT');
        const loggedIn = async() => {
            await clearStorage();
            let session = await getStorage('session');
            if (session) {
                const { token, user_id, admin_user_id } = session;
                console.log('response from store is true: AU/U logged in');
                if (user_id) {
                    console.log("User logged in");
                    const user = await getUserById(user_id);
                    dispatch(userData(user));
                    updateInitialRoute('Home');
                } else if (admin_user_id) {
                    console.log("Admin User logged in");
                    const adminUser = await getAdminUserById(admin_user_id);
                    dispatch(adminData(adminUser));
                    updateInitialRoute('AdminHome');
                }
            }
            updateOnLoad(false);
        };
        loggedIn(); 
    }, [])

    return onLoad ? 
            <SpinnerOverlay/>
            :
            <Navigation initialRoute={initialRoute}/>;
}

export default LoadContainer;