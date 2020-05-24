import React, { Component } from 'react';
import { Provider } from 'react-redux';
import './App.css';
import store from './store';
import Main from './components/Main';
import 'antd/dist/antd.css';

class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    );
  }
}

export default App;
