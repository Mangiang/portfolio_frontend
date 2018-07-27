import type {Action, ThunkAction} from "./Actions";
import {REQUEST_ADD_TIMELINE, REQUEST_DELETE_TIMELINE, REQUEST_GET_TIMELINES} from "./Actions";

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
