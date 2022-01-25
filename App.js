/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Navigation from './src/Navigation';
import rootReducer from './src/rootReducer';
import FlashMessage from 'react-native-flash-message';
import SpinnerOverlay from './src/components/spinner/spinner';
import MyModal from './src/components/Modal/MyModal';
import { getStorage } from './src/functions/storage';

const store = createStore(rootReducer);

const App = () => {

  const [onLoad, updateOnLoad] = useState(true);
  const [initialRoute, updateInitialRoute] = useState('Opener');

  
  
  
  useEffect(() => {
    const X = async() => {
      const token = await getStorage('authToken');
      console.log(token);
      const route = token ? 'Home' : 'Opener';
      console.log(route);
      updateInitialRoute(route)
      updateOnLoad(false)
    }
    X()
  },[])


  return (
    <Provider store={store}>
      {onLoad ? 
      <SpinnerOverlay/>
      :
      <Navigation initialRoute={initialRoute}/>
    }
        <FlashMessage position="top" />
        <MyModal />
    </Provider>
  );
};


export default App;
