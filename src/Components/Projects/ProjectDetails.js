// @flow

import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import ReactHtmlParser from 'react-html-parser';

import type {Dispatch, Project} from '../../Actions/Actions';
import {displayProject} from '../../Actions/Actions';

import {format} from '../../Utilities/DateUtilities';
import {StatusToString} from "../../Utilities/ProjectStatus";

import style from './styles/ProjectDetails.css';

import Carousel from '../Other/Carousel/Carousel';

import completeSignal from "../../Images/completedSignal.png";
import onGoingSignal from "../../Images/onGoing.png";
import abortedSignal from "../../Images/abortedSignal.png";
import onHoldSignal from "../../Images/onHoldSignal.png";
import {Link} from "react-router-dom/umd/react-router-dom";

type Props = {
    project: Project,
    getProject: (id: string) => Project,
    projectID: string,
}

export class ProjectDetails extends Component<Props> {
    statusIcons: string[];

    constructor(props: Props) {
        super(props);

        this.statusIcons = [completeSignal, onGoingSignal, abortedSignal, onHoldSignal];
    }

    componentWillMount() {
        this.props.getProject(this.props.projectID);
    }

    render() {


        let project = this.props.project;
        console.log(project.status);

        return (
            <div key={project.id} className={style['container']}>
                <Link to="/">{"< Go back to main menu"}</Link>
                <h1 id={"projectTitle"}>
                    {project.title}
                    <img className={style["statusIcon"]} src={this.statusIcons[project.status]} title={StatusToString(project.status)}/>
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