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
import rootReducer from './src/rootReducer';
import FlashMessage from 'react-native-flash-message';
import MyModal from './src/components/Modal/myModal';
import LoadContainer from './src/LoadContainer';

const store = createStore(rootReducer);

const App = () => {

  console.log(process.env.RN_SET_API_URL);

  return (
    <Provider store={store}>
      <LoadContainer />
      <MyModal/>
      <FlashMessage position="top"/>
    </Provider>
  );
};


export default App;
