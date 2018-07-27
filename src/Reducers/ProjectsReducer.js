import {REQUEST_GET_PROJECTS} from '../Actions/Actions';

export default function projectsReducer(state = {}, action) {
    switch (action.type) {
        case REQUEST_GET_PROJECTS:
            return action.projects;
        default:
            return state;
    }
}

