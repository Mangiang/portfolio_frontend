import {combineReducers} from 'redux';
import loginReducer from './LoginReducer';
import projectsReducer from './ProjectsReducer';
import projectDetailsReducer from './ProjectDetailsReducer';
import timelineReducer from './TimelineReducer';

const portfolio = combineReducers({loginReducer, projectsReducer, projectDetailsReducer, timelineReducer});

export default portfolio;