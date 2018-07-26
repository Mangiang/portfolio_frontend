// @flow

import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import type {Dispatch, Project} from '../../actions/actions';
import {displayProject} from '../../actions/actions';

import {format} from '../../Utilities/DateUtilities';

import style from './styles/ProjectDetails.css'

import {Carousel} from 'react-responsive-carousel';

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

    render() {

        //TODO: Do not hard code
        let progressStyle = {
            width: "50%"
        };

        console.log("images", this.props.project.images);

        return (
            <div className={style['container']}>
                <h1>
                    {this.props.project.title}
                </h1>
                <div className={style['progress']}>
                    <div className={style['progressBar']} style={progressStyle}/>
                </div>
                <div className={style['progressValueHolder']}>
                    <div className={style['progressValue']} style={progressStyle}>
                        {this.props.project.endDate && format(this.props.project.endDate)}
                    </div>
                </div>
                <div>
                    {this.props.project.beginDate && format(this.props.project.beginDate)}
                </div>
                <div>
                    {this.props.project.description}
                </div>
                <div className={style['carouselContainer']}>
                    <Carousel>
                    {
                        this.props.project.images && this.props.project.images[0].map((img) => {
                            return (
                                <div>
                                    <img src={img.url}/>
                                    <p className="legend">Image 1</p>
                                </div>
                            );
                        })
                    }
                    </Carousel>
                </div>
            </div>
        )
    }
}

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