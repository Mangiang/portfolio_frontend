import { createStore, applyMiddleware } from 'redux';
import portfolio from '../reducers/reducers';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import cookie  from 'react-cookies'

const loggerMiddleware = createLogger();

export const store = createStore(
  portfolio,
  {
    loginInfos: {
      token: cookie.load('portfolioToken') == undefined ? "none" : cookie.load('portfolioToken'),
      loginFailed: false
    },
    projects: [],
    currentProject: {},
    timelines: []
  },
  applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
  )
);