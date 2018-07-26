// @flow

import React, {Component} from 'react';
import {hot} from 'react-hot-loader';

import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import type {Dispatch, Project} from '../../actions/actions';
import {displayProject} from '../../actions/actions';

type Props = {
    projects: Array<Object>,
    getProject: (id: string) => Project
}

export class ProjectDetails extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    componentWillMount() {
        this.props.getProject(this.props.projectID);
    }

    render() { return <div>Test</div> }
}

/*

 */

function mapStateToProps(state, ownProps) {
    const project = state.currentProject;
    const projectID = ownProps.projectID;

    return {
        project: project,
        projectID: projectID
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        getProject: (id: string): Project => {
            dispatch(displayProject(id));
        }
    }
}

export default hot(module)(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectDetails)));