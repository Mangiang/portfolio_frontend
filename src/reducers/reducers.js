import {combineReducers} from 'redux';
import {
    REQUEST_DISPLAY_PROJECT,
    REQUEST_GET_PROJECTS,
    REQUEST_GET_TIMELINES,
    REQUEST_LOGIN,
    REQUEST_LOGIN_FAILED,
    REQUEST_LOGOUT,
    REQUEST_NAVIGATION
} from '../actions/actions';


function loginInfos(state = {}, action) {
    switch (action.type) {
        case REQUEST_LOGIN:
            return {
                token: action.connectionToken,
                loginFailed: false
            };
        case REQUEST_LOGIN_FAILED:
            return {
                token: state.token,
                loginFailed: true
            };
        case REQUEST_LOGOUT:
            return {
                token: "none",
                loginFailed: false
            };
        default:
            return state;
    }

}

function projects(state = {}, action) {
    switch (action.type) {
        case REQUEST_GET_PROJECTS:
            return action.projects;
        default:
            return state;
    }
}

function currentProject(state = {}, action) {
    switch (action.type) {
        case REQUEST_DISPLAY_PROJECT:
            return action.project;
        default:
            return state;
    }
}

function timelines(state = {}, action) {
    switch (action.type) {
        case REQUEST_GET_TIMELINES:
            return action.timelines;
        default:
            return state;
    }
}

function navHeader(state = {}, action) {
    switch (action.type) {
        case REQUEST_NAVIGATION:
            return action.destinationPage;
        default:
            return state;
    }
}

const portfolio = combineReducers({
    loginInfos,
    projects,
    currentProject,
    timelines,
    navHeader
});

export default portfolio;