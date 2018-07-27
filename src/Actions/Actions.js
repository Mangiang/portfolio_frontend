// @flow


import type {State} from '../Store/store';

export const API = 'https://arthur-joly.fr/api/';

//action types
export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const REQUEST_LOGIN_FAILED = 'REQUEST_LOGIN_FAILED';
export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const REQUEST_ADD_PROJECT = 'REQUEST_ADD_PROJECT';
export const REQUEST_GET_PROJECTS = 'REQUEST_GET_PROJECTS';
export const REQUEST_DISPLAY_PROJECT = 'REQUEST_DISPLAY_PROJECT';
export const REQUEST_UPDATE_PROJECT = 'REQUEST_UPDATE_PROJECT';
export const REQUEST_DELETE_PROJECT = 'REQUEST_DELETE_PROJECT';
export const REQUEST_GET_TIMELINES = 'REQUEST_GET_TIMELINES';
export const REQUEST_ADD_TIMELINE = 'REQUEST_ADD_TIMELINE';
export const REQUEST_DELETE_TIMELINE = 'REQUEST_DELETE_TIMELINE';
export const REQUEST_DELETE_IMAGE = 'REQUEST_DELETE_IMAGE';
export const REQUEST_NAVIGATION = 'REQUEST_NAVIGATION';

//flow types
export type Action =
    { type: 'REQUEST_LOGIN', connectionToken: string }
    | { type: 'REQUEST_LOGIN_FAILED' }
    | { type: 'REQUEST_LOGOUT' }
    | { type: 'REQUEST_ADD_PROJECT' }
    | { type: 'REQUEST_GET_PROJECTS', projects: Array<Object> }
    | { type: 'REQUEST_DISPLAY_PROJECT', project: Object }
    | { type: 'REQUEST_UPDATE_PROJECT' }
    | { type: 'REQUEST_DELETE_PROJECT' }
    | { type: 'REQUEST_ADD_TIMELINE' }
    | { type: 'REQUEST_GET_TIMELINES', timelines: ?Array<Object> }
    | { type: 'REQUEST_DELETE_TIMELINE' }
    | { type: 'REQUEST_DELETE_IMAGE' }
    | { type: 'REQUEST_NAVIGATION', destinationPage: string }

type GetState = () => State;
type PromiseAction = Promise<Action>;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;

//action creators
export * from './LoginActions';
export * from './ProjectActions';
export * from './TimelineActions';
