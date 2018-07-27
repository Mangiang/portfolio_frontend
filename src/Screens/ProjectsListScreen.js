// @flow

import React, {Component} from 'react'
import {hot} from 'react-hot-loader'
import {connect} from 'react-redux';
import ProjectList from '../Components/Projects/ProjectsList'
import {withRouter} from 'react-router';

type Props = {}

class ProjectsListScreen extends Component<Props> {
    constructor(props) {
        super(props)
    }

    render() {
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