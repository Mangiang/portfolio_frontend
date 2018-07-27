import {REQUEST_DISPLAY_PROJECT} from '../Actions/Actions';

export default function projectDetailsReducer(state = {}, action) {
    switch (action.type) {
        case REQUEST_DISPLAY_PROJECT:
            return action.project;
        default:
            return state;
    }
}
