// @flow

import cookie from 'react-cookies';

import type {Action, ThunkAction} from './Actions';
import {REQUEST_LOGIN, REQUEST_LOGIN_FAILED, REQUEST_LOGOUT} from './Actions';

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
