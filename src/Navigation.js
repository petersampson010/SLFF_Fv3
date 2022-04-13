import * as React from 'react';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OpenerScreen from './screens/opener/opener';
import LoginScreen from './screens/login/login';
import AdminAccountSetupScreen from './screens/login/adminAccountSetup';
import ntsScreen1 from './screens/login/nts1';
import ntsScreen2 from './screens/newTeamSetup/nts2';
import ContactUsScreen from './screens/contactUs';
import HomeScreen from './screens/home/home';
import TransfersScreen from './screens/PitchScreens/transfers.js';
import PointsScreen from './screens/PitchScreens/points';
import ClubSetupScreen from './screens/ClubSetup/clubSetup';
import PickTeamScreen from './screens/PitchScreens/pickTeam';
import AdminHomeScreen from './screens/AdminHome/adminHome';
import GameEditorScreen from './screens/GameEditor/gameEditor';
import AdminPlayerEditScreen from './screens/adminPlayerEdit';
import { $inputBlue, $darkBlueOpacity } from './styles/global';
import FlashMessage from 'react-native-flash-message';
import signOutText from './components/signOut';

const Stack = createNativeStackNavigator();

export const updateStack = (navigation, stackIndex, page) => {
  navigation.dispatch(CommonActions.reset({
    index: stackIndex,
    routes: [ { name: page } ]
  }));
}

function Navigation({initialRoute}) {
// console.log(initialRoute)
console.log('hitting nav');
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen name="Opener" component={OpenerScreen} 
        options={{
          title: 'Sunday',
          headerLeft: ()=>false,
          headerStyle: {backgroundColor: $inputBlue}
        , headerTitleStyle: {
          color: 'white'
        }}}/>
        <Stack.Screen name="Login" component={LoginScreen} 
        options={{
          title: 'Login',
          headerTintColor: 'white',
          headerStyle: {backgroundColor: $inputBlue}
        , headerTitleStyle: {
          color: 'white'
        }}}/>
        <Stack.Screen name="AdminAccountSetup" component={AdminAccountSetupScreen} 
        options={{
          title: 'Admin Account Setup',
          headerTintColor: 'white',
          headerStyle: {backgroundColor: $inputBlue}
        , headerTitleStyle: {
          color: 'white'
        }}}/>
        <Stack.Screen name="nts1" component={ntsScreen1} 
        options={{
          title: 'Team Sign Up',
          headerTintColor: 'white',
          headerStyle: {backgroundColor: $inputBlue}
        , headerTitleStyle: {
          color: 'white'
        }}}/>
        <Stack.Screen name="nts2" component={ntsScreen2} 
        options={{
          title: 'Team Set Up',
          headerTintColor: 'white',
          headerStyle: {backgroundColor: $inputBlue}
        , headerTitleStyle: {
          color: 'white'
        }}}/>
        <Stack.Screen name="ContactUs" component={ContactUsScreen} 
        options={{
          title: 'Contact Us',
          headerTintColor: 'white',
          headerStyle: {backgroundColor: $inputBlue}
        , headerTitleStyle: {
          color: 'white'
        }}}/>
        <Stack.Screen name="Home" component={HomeScreen} 
        options={({navigation})=>({
          title: 'Home',
          headerLeft: ()=>false,
          headerRight: ()=>signOutText(navigation),
          headerStyle: {backgroundColor: $inputBlue}
        , headerTitleStyle: {
          color: 'white'
        }})}/>
        <Stack.Screen name="Transfers" component={TransfersScreen} 
        options={{
          title: 'Transfers',
          headerLeft: ()=>false,
          headerStyle: {backgroundColor: $inputBlue}
        , headerTitleStyle: {
          color: 'white'
        }}}/>
        <Stack.Screen name="Points" component={PointsScreen} 
        options={{
          title: 'Points',
          headerLeft: ()=>false,
          headerStyle: {backgroundColor: $inputBlue}
        , headerTitleStyle: {
          color: 'white'
        }}}/>
        <Stack.Screen name="ClubSetup" component={ClubSetupScreen} 
        options={{
          title: 'Club Setup',
          headerTintColor: 'white',
          headerStyle: {backgroundColor: $inputBlue}
        , headerTitleStyle: {
          color: 'white'
        }}}/>
        <Stack.Screen name="PickTeam" component={PickTeamScreen} 
        options={{
          title: 'Pick Team',
          headerLeft: ()=>false,
          headerStyle: {backgroundColor: $inputBlue}
        , headerTitleStyle: {
          color: 'white'
        }}}
        />
        <Stack.Screen name="AdminHome" component={AdminHomeScreen} 
        options={({navigation})=>({
          title: 'Club Home',
          headerLeft: ()=>false,
          headerRight: ()=>signOutText(navigation),
          headerStyle: {backgroundColor: $inputBlue}
        , headerTitleStyle: {
          color: 'white'
        }})}/>
        <Stack.Screen name="GameEditor" component={GameEditorScreen} 
        options={{
          title: 'Game Editor',
          headerTintColor: 'white',
          headerStyle: {backgroundColor: $inputBlue}
        , headerTitleStyle: {
          color: 'white'
        }}}/>
        <Stack.Screen name="AdminPlayerEdit" component={AdminPlayerEditScreen} 
        options={{
          title: 'Player Edit',
          headerTintColor: 'white',
          headerStyle: {backgroundColor: $inputBlue}
        , headerTitleStyle: {
          color: 'white'
        }}}/>
      </Stack.Navigator>
      {/* <FlashMessage position="top" /> */}
    </NavigationContainer>
    );
}

export default Navigation;