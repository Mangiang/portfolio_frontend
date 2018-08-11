// @flow

import React from 'react';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import styles from './styles/ProjectMiniature.css';
import {StatusToString} from '../../Utilities/ProjectStatus'
import type {Project} from '../../Actions/Actions';

import completeSignal from "../../Images/completedSignal.png";
import onGoingSignal from "../../Images/onGoing.png";
import abortedSignal from "../../Images/abortedSignal.png";
import onHoldSignal from "../../Images/onHoldSignal.png";

type Props = {
    projects: Object,
    projectIdx: number
}

class ProjectMiniature extends React.Component<Props> {
    project: Project;

    constructor(props: Props) {
        super(props);
        this.project = props.projects[props.projectIdx];
        this.statusIcons = [completeSignal, onGoingSignal, abortedSignal, onHoldSignal];
    }

    render() {
        let image = "";
        if (this.project
            && this.project.images !== undefined
            && this.project.images[0]) {
            image = <img className={styles['projectMiniatureImage']} src={this.project.images[0].url}/>
        }

        return (
            <div className={styles['projectMiniature']}>
                {
                    this.project &&
                    <Link id={this.project.id} to={'/project/' + this.project.id}>
                        <div className={styles['projectMiniatureLink']}>
                            {image}
                            <div className={styles['projectName']}>
                                <p className={styles['projectMiniatureTitle']}>{this.project.title}</p>
                                <p className={styles['projectMiniatureBody']}>{this.project.smallDescription}</p>
                            </div>
                        </div>
                        <div className={styles['projectMiniatureStatus']}>
                                <div className={styles['projectMiniatureStatusIconHolder']}>
                                    <img className={styles['projectMiniatureStatusIcon']} src={this.statusIcons[this.project.status]}/>
                                </div>
                            <div className={styles['projectMiniatureStatusTextHolder']}>
                                <div className={styles['projectMiniatureStatusText']}>
                                    {StatusToString(this.project.status)}
                                </div>
                            </div>
                        </div>
                    </Link>
                }
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const projects = state.projectsReducer;
    const projectIdx = ownProps.projectIdx;
    return {
        projects: projects,
        index: projectIdx
    };
}

export default hot(module)(withRouter(connect(mapStateToProps, null, null, {pure: false})(ProjectMiniature)));