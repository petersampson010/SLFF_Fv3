import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navigation from './Navigation';
import SpinnerOverlay from './components/spinner/spinner';
import { clearStorage, getStorage, getTokenAndId } from './functions/storage';
import userData from './functions/GetAndSet/userData';
import adminData from './functions/GetAndSet/adminData';
import { getAdminUserById, getUserById } from './functions/APIcalls';
import { screenContainer } from './styles/global';
import { flashMyMessage } from './functions/flashMyMessage';
import { removeSpinner } from './actions';
import { overlay, spinnerTitle } from './components/spinner/style';
import { screensEnabled } from 'react-native-screens';
import { ActivityIndicator, View, Text } from "react-native";
import MyModal from './components/Modal/myModal';
import FlashMessage from 'react-native-flash-message';

const LoadContainer = () => {
    const [initialRoute, updateInitialRoute] = useState('Opener'),
    dispatch = useDispatch(),
    [onLoad, updateOnLoad] = useState(true),
    spinner = useSelector(state => state.boolDeciders.spinner);
  
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
            console.log('aree we hitting');
            dispatch(removeSpinner());
            updateOnLoad(false);
        };
        loggedIn(); 
    }, []);

    return <View style={screenContainer}>
            {onLoad ? 
            <View style={overlay}>
                <Text style={spinnerTitle}>SLFF</Text>
                <ActivityIndicator size="large" color="#00ff00"/>
            </View>
            : 
            <View style={screenContainer}>
                <MyModal/>
                <FlashMessage position="top"/>
                {spinner ? <SpinnerOverlay/> : null}
                <Navigation initialRoute={initialRoute}/>
            </View>}
            {/* <SpinnerOverlay/>
            <MyModal/> */}
        </View>
}

export default LoadContainer;
