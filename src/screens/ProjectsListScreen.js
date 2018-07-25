// @flow

import React, {Component} from 'react'
import {hot} from 'react-hot-loader'
import {connect} from 'react-redux';
import ProjectList from '../components/Projects/ProjectsList'
import {withRouter} from 'react-router';

type Props = {}

class ProjectsListScreen extends Component<Props> {
    constructor(props) {
        super(props)
    }

    render() {
        console.log("Test");
        return (
                <ProjectList/>
        )
    }
}

function mapStateToProps(state) {
    return {
        state
    };
}

export default hot(module)(withRouter(connect(mapStateToProps)(ProjectsListScreen)));