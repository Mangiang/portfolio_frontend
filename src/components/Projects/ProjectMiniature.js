// @flow

import React from 'react';
import {hot} from 'react-hot-loader';
import {format} from 'date-fns';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {styles} from './styles/ProjectMiniatureStyles';
import Radium from 'radium';

import './styles/ProjectMiniature.css';

type Props = {
    projects: Object,
    projectIdx: number
}

class ProjectMiniature extends React.Component<Props> {
    project: Object;

    constructor(props: Props) {
        super(props);
        this.project = props.projects[props.projectIdx];
    }

    static onClick(id): void {
        console.log("click" + id)
    }

    render() {
        let image = "";
        if (this.project
            && this.project.images !== undefined
            && this.project.images[0] !== undefined) {
            image = <img src={this.project.images[0][0].url}/>
        }

        return (
            <div className="projectMiniature">
                {
                    this.project &&
                    <Link to={'/project/' + this.project.id}>
                        <div key="0" style={styles.link}
                             onClick={() => ProjectMiniature.onClick.bind(this, this.project._id)}>
                            {image}
                            <div key="1" style={styles.projectName}>
                                <p>{this.project.title}</p>
                                <p>{this.project.description}</p>
                                <p>Begin date : {format(this.project.beginDate, "DD-MM-YYYY")}</p>
                                <p>End date : {format(this.project.endDate, "DD-MM-YYYY")}</p>
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

ProjectMiniature = Radium(ProjectMiniature);

export default hot(module)(withRouter(connect(mapStateToProps)(ProjectMiniature)));