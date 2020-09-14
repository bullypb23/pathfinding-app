import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import gameConfigReducer from './store/reducers/gameConfig';
import dataReducer from './store/reducers/data';
import { BrowserRouter } from 'react-router-dom';

const rootReducer = combineReducers({
  gameConfig: gameConfigReducer,
  data: dataReducer,
})

const store = createStore(
  rootReducer, 
  typeof window === "object" &&
  typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== "undefined"
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : (f) => f
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
