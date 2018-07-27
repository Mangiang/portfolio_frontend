import {REQUEST_LOGIN, REQUEST_LOGIN_FAILED, REQUEST_LOGOUT} from '../Actions/Actions';

export default function loginReducer(state = {}, action) {
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
