// @flow

import React, {Component} from 'react';
import {hot} from 'react-hot-loader';

import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import type {Dispatch} from '../../actions/actions';
import {getProjects} from '../../actions/actions';

import ProjectMiniature from './ProjectMiniature'

import styles from './styles/ProjectList.css'

type Props = {
    projects: Array<Object>,
    getProjects: () => any
}

export class ProjectsList extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    componentWillMount() {
        this.props.getProjects();
    }

    render() {
        let key = -1;
        return (
            <div className={styles['projectList']}>
                {}
                {
                    this.props.projects.map(() => {
                        key++;
                        return <ProjectMiniature projectIdx={key} key={key}/>;
                    })
                }
            </div>
        )
    }
}

/*

 */

function mapStateToProps(state) {
    const projects = state.projects;

    return {
        projects,
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        getProjects: () => {
            dispatch(getProjects());
        }
    }
}

export default hot(module)(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectsList)));