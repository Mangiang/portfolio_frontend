// @flow

import type {Store} from 'redux';
import {applyMiddleware, createStore} from 'redux';
import portfolio from '../reducers/reducers';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import cookie from 'react-cookies'
import type {Action} from '../actions/actions'

let middlewares = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
    const loggerMiddleware = createLogger();
    middlewares = [...middlewares, loggerMiddleware];
}

export type State = {
    +loginInfos: Object,
    +projects: Array<Object>,
    +currentProject: Object,
    +timelines: Array<Object>
}

export const store: Store<State, Action> = createStore(
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