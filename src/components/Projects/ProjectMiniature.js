// @flow

import React from 'react';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import styles from './styles/ProjectMiniature.css';
import {StatusToString} from '../../Utilities/ProjectStatus'

type Props = {
    projects: Object,
    projectIdx: number
}

class ProjectMiniature extends React.Component<Props> {
    project: {
        id: string,
        title: string,
        description: string,
        beginDate: Date,
        endDate: Date,
        images: Array<Object>
    };

    constructor(props: Props) {
        super(props);
        this.project = props.projects[props.projectIdx];
        console.log(props.projectIdx, this.project);
    }

    static onClick(id): void {
        console.log("click" + id)
    }

    render() {
        let image = "";
        if (this.project
            && this.project.images !== undefined
            && this.project.images[0] !== undefined) {
            image = <img className={styles['projectMiniatureImage']} src={this.project.images[0][0].url}/>
        }

        return (
            <div className={styles['projectMiniature']}>
                {
                    this.project &&
                    <Link to={'/project/' + this.project.id}>
                        <div className={styles['projectMiniatureLink']}
                             onClick={() => ProjectMiniature.onClick.bind(this, this.project.id)}>
                            {image}
                            <div className={styles['projectName']}>
                                <p className={styles['projectMiniatureTitle']}>{this.project.title}</p>
                                <p className={styles['projectMiniatureBody']}>{this.project.description}</p>
                            </div>
                        </div>
                        <div className={styles['projectMiniatureStatus']}>
                            <div className={styles['projectMiniatureStatusHolder']}>
                                <div className={styles['projectMiniatureStatusIconHolder']}>
                                    <div className={styles['projectMiniatureStatusIconOngoing']}/>
                                </div>
                                <div className={styles['projectMiniatureStatusText']}>{StatusToString(this.project.status)}</div>
                            </div>
                        </div>
                    </Link>
                }
            </div>
        )
    }
}

function mapStateToProps(state, ownProps) {
    const projects = state.projects;
    const projectIdx = ownProps.projectIdx;
    return {
        projects: projects,
        index: projectIdx
    };
}

export default hot(module)(withRouter(connect(mapStateToProps)(ProjectMiniature)));