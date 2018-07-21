import cookie from 'react-cookies'
import axios from 'axios'

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


const API = 'https://arthur-joly.fr:4242/';

//action creators
const requestLogin = function(token) {
    console.log("requestLogin");
    console.log(token);
    return {
        type: REQUEST_LOGIN,
        connectionToken: token
    }
};

const requestLoginFailed = function() {
    return {
        type: REQUEST_LOGIN_FAILED
    }
};

export function login(login, password) {
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
        }).then(function(response) {
            return response.json();
        })
        .then(data => {
            console.log("fffffgf");
            console.log(data);
            if (data.success) {
                cookie.save('portfolioToken', data.token, { path: '/' });
                dispatch(requestLogin(data.token));
            }
            else {
                dispatch(requestLoginFailed());
            }
        });
    }
}

export function logout() {
    console.log(cookie.load('portfolioToken'));
    cookie.remove('portfolioToken', { path: '/' });
    console.log(cookie.load('portfolioToken'));
    return {
        type: REQUEST_LOGOUT
    }
}

const requestAddProject = function() {
    return {
        type: REQUEST_ADD_PROJECT
    }
};

export function addProject(title, description, beginDate, endDate, images, token) {
    return (dispatch) => {

        fetch(API + "project/create", {
            headers: new Headers({
                "Content-Type": "application/json",
                "authorization": "Bearer " + token
            }),
            method: 'POST',
            body: JSON.stringify({
                title:title,
                description:description,
                beginDate:beginDate,
                endDate:endDate
            })
        }).then(function(response) {
            return response.json();
        })
        .then(data => {
            console.log("add", data, images, token);
            if (images && data && token)
                dispatch(uploadImages(images, data.id, token));
            dispatch(requestAddProject());
        }).then(() => dispatch(getProjects()));
    }
}

export function uploadImages(images, projectId, token) {
    if (images.length === 0 || !images[0])
        return () => {};

    return (dispatch) => {
        images.forEach((elt) => {
            let formData = new FormData();
            formData.append('image', elt.blob);
            axios({
                method:'post',
                url:API + "project/upload/" + projectId.toString(),
                data:formData,
                headers:{"authorization": "Bearer " + token, "Content-Type":"multipart/form-data"}
            }).then(function() {
                dispatch(getProjects());
                dispatch(displayProject(projectId));
            }).catch(function (error) {
                console.log("UploadImages ", error);
            })
        })
    }
}

const requestDeleteImage = function() {
    return {
        type: REQUEST_DELETE_IMAGE
    }
};

export function deleteImage(id, projectId, token) {
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
        }).then(function(response) {
            return response;
        })
        .then(data => {
            console.log("delete", data);
            dispatch(requestDeleteImage());
        }).then(function() {
            dispatch(displayProject(projectId));
        });
    }
}


const requestGetProjects = function(projects) {
    return {
        type: REQUEST_GET_PROJECTS,
        projects: projects
    }
};

export function getProjects() {
    return (dispatch) => {
        fetch(API + "project/list", {
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            method: 'GET'
        }).then(function(response) {
            return response.json();
        })
        .then(data => {
            console.log("GetProjects", data);
            dispatch(requestGetProjects(data.projects));
        });
    }
}

const requestDisplayProject = function(project) {
    return {
        type: REQUEST_DISPLAY_PROJECT,
        project: project
    }
};

export function displayProject(id) {
    return (dispatch) => {

        fetch(API + "project/detail/" + id, {
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            method: 'GET'
        }).then(function(response) {
            console.log("display", response);
            return response.json();
        })
        .then(data => {
            console.log("project", data);
            dispatch(requestDisplayProject(data));
        });
    }
}

const requestUpdateProject = function() {
    return {
        type: REQUEST_UPDATE_PROJECT
    }
};

export function updateProject(id, title, description, beginDate, endDate, token) {
    return (dispatch) => {

        fetch(API + "project/update/" + id, {
            headers: new Headers({
                "Content-Type": "application/json",
                "authorization": "Bearer " + token
            }),
            method: 'PUT',
            body: JSON.stringify({
                title:title,
                description:description,
                beginDate:beginDate,
                endDate:endDate
            })
        }).then(function(response) {
            console.log("miaou", response);
            return response.json();
        })
        .then(data => {
            console.log("miaou", data);
            dispatch(requestUpdateProject());
        }).then(function() {
            dispatch(displayProject(id));
        });
    }
}

const requestDeleteProject = function() {
    return {
        type: REQUEST_DELETE_PROJECT
    }
};

export function deleteProject(id, token) {
    return (dispatch) => {

        fetch(API + "project/delete/" + id, {
            headers: new Headers({
                "Content-Type": "application/json",
                "authorization": "Bearer " + token
            }),
            method: 'DELETE',
            body: JSON.stringify({
            })
        }).then(function(response) {
            return response;
        })
        .then(data => {
            dispatch(requestDeleteProject());
        }).then(function() {
            dispatch(getProjects());
        });
    }
}

const requestGetTimelines = function(timelines = null) {
    return {
        type: REQUEST_GET_TIMELINES,
        timelines: timelines
    }
};

export function getTimelines() {
    return (dispatch) => {

        fetch(API + "timeline/list", {
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            method: 'GET'
        }).then(function(response) {
            return response.json();
        })
        .then(data => {
            console.log("data", data);
            dispatch(requestGetTimelines(data.timelines));
        });
    }
}

const requestAddTimeline = function() {
    return {
        type: REQUEST_ADD_TIMELINE
    }
};

export function addTimeline(title, description, beginDate, endDate, token) {
    return (dispatch) => {

        fetch(API + "timeline/create", {
            headers: new Headers({
                "Content-Type": "application/json",
                "authorization": "Bearer " + token
            }),
            method: 'POST',
            body: JSON.stringify({
                title:title,
                description:description,
                beginDate:beginDate,
                endDate:endDate
            })
        }).then(function(response) {
            return response;
        })
        .then(data => {
            console.log("add", data);
            dispatch(requestAddTimeline(data));
        }).then(function() {
            dispatch(getTimelines());
        });
    }
}

const requestDeleteTimeline = function() {
    return {
        type: REQUEST_DELETE_TIMELINE
    }
};

export function deleteTimeline(id, token) {
    return (dispatch) => {

        fetch(API + "timeline/delete/" + id, {
            headers: new Headers({
                "Content-Type": "application/json",
                "authorization": "Bearer " + token
            }),
            method: 'DELETE',
            body: JSON.stringify({
            })
        }).then(function(response) {
            return response;
        })
        .then(data => {
            dispatch(requestDeleteTimeline());
        }).then(function() {
            dispatch(getTimelines());
        });
    }
}


