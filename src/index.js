import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import loginReducer from './reducers/loginReducer';
import foodReducer from './reducers/foodReducer';
import mealReducer from './reducers/mealReducer';

import {Router} from 'react-router';
import createBrowserHistory from 'history/createBrowserHistory';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
	login:loginReducer,
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
