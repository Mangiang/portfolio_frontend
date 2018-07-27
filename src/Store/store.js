// @flow

import type {Store} from 'redux';
import {applyMiddleware, createStore} from 'redux';
import portfolio from '../Reducers/Reducers';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import cookie from 'react-cookies'
import type {Action} from '../Actions/Actions'

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
        loginReducer: {
            token: cookie.load('portfolioToken') === undefined ? "none" : cookie.load('portfolioToken'),
            loginFailed: false
        },
        projectsReducer: [],
        projectDetailsReducer: {},
        timelineReducer: []
    },
    applyMiddleware(
        ...middlewares
    )
);