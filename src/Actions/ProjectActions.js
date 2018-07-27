import axios from 'axios';

import type {Action, ThunkAction} from "./Actions";
import {API, REQUEST_ADD_PROJECT, REQUEST_DELETE_IMAGE, REQUEST_DELETE_PROJECT, REQUEST_DISPLAY_PROJECT, REQUEST_GET_PROJECTS, REQUEST_UPDATE_PROJECT} from "./Actions";

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
                        id: project.id,
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
                let project : Project = {
                    id: data.id,
                    title: data.title,
                    beginDate: (data.beginDate ? new Date(data.beginDate) : new Date(0)),
                    endDate: (data.endDate ? new Date(data.endDate) : new Date(0)),
                    description: data.description,
                    images: data.images,
                    status: data.status
                };
                dispatch(requestDisplayProject(project));
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
