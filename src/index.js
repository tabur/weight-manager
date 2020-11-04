import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

import App from './App';
import * as serviceWorker from './serviceWorker';
import userReducer from './reducers/userReducer';
import foodReducer from './reducers/foodReducer';
import mealReducer from './reducers/mealReducer';

import {Router} from 'react-router';
import {createBrowserHistory} from 'history';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
	user:userReducer,
  food:foodReducer,
  meal:mealReducer
})

const store = createStore(rootReducer,applyMiddleware(thunk));

export const history = createBrowserHistory();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
