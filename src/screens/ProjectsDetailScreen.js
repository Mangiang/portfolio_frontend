// @flow

import React, {Component} from 'react'
import {hot} from 'react-hot-loader'
import {connect} from 'react-redux';
import ProjectDetails from '../components/Projects/ProjectDetails'
import {withRouter} from 'react-router';

type Props = {}

class ProjectsListScreen extends Component<Props> {
    constructor(props) {
        super(props)
    }

    render() {
        return (<ProjectDetails/>)
    }
}

function mapStateToProps(state) {
    return {
        state
    };
}

export default hot(module)(withRouter(connect(mapStateToProps)(ProjectsListScreen)));