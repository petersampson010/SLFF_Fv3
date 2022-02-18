import React from 'react';
import { View } from 'react-native';
import { navContainer } from './style';
import NavSection from './navSection';

const BottomNav = ({navigation}) => {

        const pages = ['Home', 'PickTeam', 'Points', 'Transfers'];
        return ( 
            <View style={navContainer}>
                {pages.map((p,i)=>
                <NavSection 
                key={i}
                navigation={navigation} 
                page={p}/>
                )}
            </View>
         );
}
 
export default BottomNav;