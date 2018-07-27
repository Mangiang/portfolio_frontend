import {REQUEST_GET_TIMELINES} from '../Actions/Actions';

export default function timelineReducer(state = {}, action) {
    if (!action)
        return state;

    switch (action.type) {
        case REQUEST_GET_TIMELINES:
            return action.timelines;
        default:
            return state;
    }
}
