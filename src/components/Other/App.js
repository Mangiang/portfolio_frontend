import React from 'react'
import {hot} from 'react-hot-loader'

import {connect} from 'react-redux';

import ProjectsListScreen from '../../screens/ProjectsListScreen';

export class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.state.projects = nextProps.projects;
    }

    componentWillMount() {
        this.state.projects = this.props.projects;
    }

    render() {
        return(
            <ProjectsListScreen/>
        )
    }
}

function mapStateToProps(state) {
    const projects = state.projects;
    console.log("asdasd");
    console.log(state.projects);

    return {
        projects
     };
}

export default hot(module)(connect(mapStateToProps)(App));