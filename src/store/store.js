import {applyMiddleware, createStore} from 'redux';
import portfolio from '../reducers/reducers';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import cookie from 'react-cookies'

let middlewares = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
    const loggerMiddleware = createLogger();
    middlewares = [...middlewares, loggerMiddleware];
}

export const store = createStore(
  portfolio,
  {
    loginInfos: {
        token: cookie.load('portfolioToken') === undefined ? "none" : cookie.load('portfolioToken'),
      loginFailed: false
    },
    projects: [],
    currentProject: {},
    timelines: []
  },
  applyMiddleware(
      ...middlewares
  )
);