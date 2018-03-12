/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import logger from 'redux-logger';

import {Provider} from 'react-redux';
import { applyMiddleware,createStore } from 'redux';
import allReducers from './redux/reducers';
import StackNav from './src/Navigation';
let store = createStore(
  allReducers,
  //applyMiddleware(logger)
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <StackNav/>
      </Provider>
    );
  }
}
 export default App;
