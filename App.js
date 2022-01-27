/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
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
import LoadContainer from './LoadContainer';

const store = createStore(rootReducer);

const App = () => {

  const modalActive = useState(false);

  return (
    <Provider store={store}>
      <LoadContainer />
      <FlashMessage position="top" />
      {modalActive ? <MyModal/> : null}
    </Provider>
  );
};


export default App;
