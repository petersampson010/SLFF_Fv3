import React from 'react';
import { TouchableOpacity, Text } from "react-native";
import { useDispatch } from 'react-redux';
import { resetStore } from '../actions';
import { clearStorage } from "../functions/storage";
import { updateStack } from '../Navigation';
import { $darkBlue, $darkBlueOpacity } from '../styles/global';
import { standardText } from '../styles/textStyle';

const signOutText = (navigation) => {

    const dispatch = useDispatch();

    const signOut = () => {
        clearStorage();
        dispatch(resetStore());
        updateStack(navigation, 0, 'Opener');
    }

    return ( 
        <TouchableOpacity onPress={signOut}>
            <Text style={{color: 'white'}}>Sign Out</Text>
        </TouchableOpacity>
     );
}

export default signOutText;