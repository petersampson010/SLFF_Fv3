/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Navigation from './src/Navigation';
import rootReducer from './src/rootReducer';
import FlashMessage from 'react-native-flash-message';
import SpinnerOverlay from './src/components/spinner/spinner';
import MyModal from './src/components/Modal/MyModal';

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
        <Navigation/>
        <FlashMessage position="top" />
        <MyModal />
    </Provider>
  );
};


export default App;
