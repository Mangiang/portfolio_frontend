// @flow

import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {ProgressBar} from '../Other/ProgressBar/ProgressBar';

import type {Dispatch, Project} from '../../Actions/Actions';
import {displayProject} from '../../Actions/Actions';

import {format} from '../../Utilities/DateUtilities';

import style from './styles/ProjectDetails.css'

type Props = {
    project: Project,
    getProject: (id: string) => Project,
    projectID : string,
}

export class ProjectDetails extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    componentWillMount() {
        this.props.getProject(this.props.projectID);
    }

    render() {


        let project = this.props.project;

        return (
            <div key={project.id} className={style['container']}>
                <h1 id={"projectTitle"}>
                    {project.title}
                </h1>
                <ProgressBar
                    completion={50} //TODO: Do not hard code
                    beginValue={(project.beginDate ? format(project.beginDate) : "")}
                    endValue={(project.endDate ? format(project.endDate) : "")}/>
                <div id={"projectDescription"} className={style['projectDescription']}>{project.description}</div>
                <div className={style['carouselContainer']}>
                    {
                        project.images && project.images[0].map((img) => {
                            return ( <img className={style['carouselImage']} key={img.id} src={img.url}/> );
                        })
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const project = state.projectDetailsReducer;
    const projectID = ownProps.projectID;

    return {
        project: project,
        projectID: projectID
    };
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        getProject: (id: string) => {
            dispatch(displayProject(id));
        }
    }
}

export default hot(module)(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectDetails)));