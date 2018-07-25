// @flow

import cookie from 'react-cookies';
import axios from 'axios';
import type {State} from '../store/store';

const API = 'https://arthur-joly.fr/api/';

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
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any;

//action creators
const requestLogin = function (token): Action {
    console.log("requestLogin");
    console.log(token);
    return {
        type: REQUEST_LOGIN,
        connectionToken: token
    }
};

const requestLoginFailed = function (): Action {
    return {
        type: REQUEST_LOGIN_FAILED
    }
};

export function login(login: string, password: string): ThunkAction {
    return (dispatch) => {
        fetch(API + "user/login", {
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            method: 'POST',
            body: JSON.stringify({
                login: login,
                password: password
            })
        }).then(function (response) {
            return response.json();
        })
            .then(data => {
                if (data.success) {
                    cookie.save('portfolioToken', data.token, {path: '/'});
                    dispatch(requestLogin(data.token));
                }
                else {
                    dispatch(requestLoginFailed());
                }
            });
    }
}

export function logout(): Action {
    console.log(cookie.load('portfolioToken'));
    cookie.remove('portfolioToken', {path: '/'});
    console.log(cookie.load('portfolioToken'));
    return {
        type: REQUEST_LOGOUT
    }
}

const requestAddProject = function (): Action {
    return {
        type: REQUEST_ADD_PROJECT
    }
};

export type ProjectWithoutId = {
    title: string,
    description: string,
    beginDate: Date,
    endDate: Date,
    images: Array<Object>,
    status: number
};

export function addProject(project: ProjectWithoutId, token: string): ThunkAction {
    return (dispatch) => {

        fetch(API + "project/create", {
            headers: new Headers({
                "Content-Type": "application/json",
                "authorization": "Bearer " + token
            }),
            method: 'POST',
            body: JSON.stringify({
                title: project.title,
                description: project.description,
                beginDate: project.beginDate,
                endDate: project.endDate,
                status: project.status
            })
        }).then(function (response) {
            return response.json();
        })
            .then(data => {
                console.log("add", data, project.images, token);
                if (project.images && data && token)
                    dispatch(uploadImages(project.images, data.id, token));
                dispatch(requestAddProject());
            }).then(() => dispatch(getProjects()));
    }
}

export function uploadImages(images: Array<Object>, projectId: string, token: string): ThunkAction {
    let returnLambda = null;

    if (images.length === 0 || !images[0]) {
        returnLambda = () => {
        };
    }
    else {
        returnLambda = (dispatch) => {
            images.forEach((elt) => {
                let formData = new FormData();
                formData.append('image', elt.blob);
                axios({
                    method: 'post',
                    url: API + "project/upload/" + projectId.toString(),
                    data: formData,
                    headers: {"authorization": "Bearer " + token, "Content-Type": "multipart/form-data"}
                }).then(function () {
                    dispatch(getProjects());
                    dispatch(displayProject(projectId));
                }).catch(function (error) {
                    console.log("UploadImages ", error);
                })
            })
        }
    }
    return returnLambda;
}

const requestDeleteImage = function (): Action {
    return {
        type: REQUEST_DELETE_IMAGE
    }
};

export function deleteImage(id: string, projectId: string, token: string): ThunkAction {
    return (dispatch) => {

        fetch(API + "project/deleteImage/" + projectId, {
            headers: new Headers({
                "Content-Type": "application/json",
                "authorization": "Bearer " + token
            }),
            method: 'DELETE',
            body: JSON.stringify({
                imageId: id
            })
        }).then(function (response) {
            return response;
        })
            .then(data => {
                console.log("delete", data);
                dispatch(requestDeleteImage());
            }).then(function () {
            dispatch(displayProject(projectId));
        });
    }
}


const requestGetProjects = function (projects: Array<Object>): Action {
    return {
        type: REQUEST_GET_PROJECTS,
        projects: projects
    }
};

export function getProjects(): ThunkAction {
    return (dispatch) => {
        fetch(API + "project/list", {
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            method: 'GET'
        }).then(function (response) {
            return response.json();
        })
            .then(data => {
                let projectsList: Array<Project> = [];
                data.projects.forEach((project) => {
                    projectsList.push({
                        id: project._id,
                        title: project.title,
                        beginDate: (project.beginDate ? new Date(project.beginDate) : new Date(0)),
                        endDate: (project.endDate ? new Date(project.endDate) : new Date(0)),
                        description: project.description,
                        images: project.images,
                        status: project.status
                    })
                });
                console.log("GetProjects", data, projectsList);
                dispatch(requestGetProjects(projectsList));
            });
    }
}

const requestDisplayProject = function (project: Object): Action {
    return {
        type: REQUEST_DISPLAY_PROJECT,
        project: project
    }
};

export function displayProject(id: string): ThunkAction {
    return (dispatch) => {

        fetch(API + "project/detail/" + id, {
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            method: 'GET'
        }).then(function (response) {
            console.log("display", response);
            return response.json();
        })
            .then(data => {
                console.log("project", data);
                dispatch(requestDisplayProject(data));
            });
    }
}

const requestUpdateProject = function (): Action {
    return {
        type: REQUEST_UPDATE_PROJECT
    }
};

export type Project = {
    id: string,
    title: string,
    description: string,
    beginDate: Date,
    endDate: Date,
    images: Array<Object>,
    status: number
};

export function updateProject(project: Project, token: string): ThunkAction {
    return (dispatch) => {
        fetch(API + "project/update/" + project.id, {
            headers: new Headers({
                "Content-Type": "application/json",
                "authorization": "Bearer " + token
            }),
            method: 'PUT',
            body: JSON.stringify({
                title: project.title,
                description: project.description,
                beginDate: project.beginDate,
                endDate: project.endDate,
                status: project.status
            })
        }).then(function (response) {
            return response.json();
        })
            .then(() => {
                dispatch(requestUpdateProject());
            }).then(function () {
            dispatch(displayProject(project.id));
        });
    }
}

const requestDeleteProject = function (): Action {
    return {
        type: REQUEST_DELETE_PROJECT
    }
};

export function deleteProject(id: string, token: string): ThunkAction {
    return (dispatch) => {

        fetch(API + "project/delete/" + id, {
            headers: new Headers({
                "Content-Type": "application/json",
                "authorization": "Bearer " + token
            }),
            method: 'DELETE',
            body: JSON.stringify({})
        }).then(function (response) {
            return response;
        })
            .then(() => {
                dispatch(requestDeleteProject());
            }).then(function () {
            dispatch(getProjects());
        });
    }
}

const requestGetTimelines = function (timelines: ?Array<Object> = null): Action {
    return {
        type: REQUEST_GET_TIMELINES,
        timelines: timelines
    }
};

export function getTimelines(): ThunkAction {
    return (dispatch) => {

        fetch(API + "timeline/list", {
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            method: 'GET'
        }).then(function (response) {
            return response.json();
        })
            .then(data => {
                console.log("data", data);
                dispatch(requestGetTimelines(data.timelines));
            });
    }
}

const requestAddTimeline = function (): Action {
    return {
        type: REQUEST_ADD_TIMELINE
    }
};

export function addTimeline(title: string, description: string, beginDate: string, endDate: string, token: string): ThunkAction {
    return (dispatch) => {

        fetch(API + "timeline/create", {
            headers: new Headers({
                "Content-Type": "application/json",
                "authorization": "Bearer " + token
            }),
            method: 'POST',
            body: JSON.stringify({
                title: title,
                description: description,
                beginDate: beginDate,
                endDate: endDate
            })
        }).then(function (response) {
            return response;
        })
            .then(data => {
                console.log("add", data);
                dispatch(requestAddTimeline());
            }).then(function () {
            dispatch(getTimelines());
        });
    }
}

const requestDeleteTimeline = function (): Action {
    return {
        type: REQUEST_DELETE_TIMELINE
    }
};

export function deleteTimeline(id: string, token: string): ThunkAction {
    return (dispatch) => {

        fetch(API + "timeline/delete/" + id, {
            headers: new Headers({
                "Content-Type": "application/json",
                "authorization": "Bearer " + token
            }),
            method: 'DELETE',
            body: JSON.stringify({})
        }).then(function (response) {
            return response;
        })
            .then(() => {
                dispatch(requestDeleteTimeline());
            }).then(function () {
            dispatch(getTimelines());
        });
    }
}

export function requestNavigation(destinationPage: string = 'projectsList'): Action {
    return {
        type: REQUEST_NAVIGATION,
        destinationPage: destinationPage
    }
}
