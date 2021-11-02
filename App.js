/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Navigation from './src/Navigation';
import rootReducer from './src/rootReducer';
import FlashMessage from 'react-native-flash-message';
import SpinnerOverlay from './src/components/spinner/spinner';

const store = createStore(rootReducer);

const App: () => Node = () => {

  return (
    <Provider store={store}>
        <Navigation/>
        <FlashMessage position="top" />
    </Provider>
  );
};


export default App;
