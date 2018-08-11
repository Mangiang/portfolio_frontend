// @flow

import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import ReactHtmlParser from 'react-html-parser';

import {ProgressBar} from '../Other/ProgressBar/ProgressBar';

import type {Dispatch, Project} from '../../Actions/Actions';
import {displayProject} from '../../Actions/Actions';

import {format} from '../../Utilities/DateUtilities';

import style from './styles/ProjectDetails.css'

import Carousel from '../Other/Carousel/Carousel'

type Props = {
    project: Project,
    getProject: (id: string) => Project,
    projectID: string,
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
                <p>
                    Starting date : {(project.beginDate ? format(project.beginDate) : "")}
                    <br/>
                    Ending date : {(project.endDate ? format(project.endDate) : "")}
                </p>

                <div className={style["carousel-container"]}>
                    {
                        project.images &&
                        <Carousel slides={project.images} projectTitle={project.title}/>
                    }
                </div>
                <br/>
                <br/>
                <div id={"projectDescription"}
                     className={style['projectDescription']}>{ReactHtmlParser(project.description)}</div>
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