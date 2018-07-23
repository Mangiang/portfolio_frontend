import React from 'react';
import {hot} from 'react-hot-loader';
import {format} from 'date-fns';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import DeleteProject from './DeleteProject';


class ProjectMiniature extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.onClick = this.onClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {

    }

    onClick(id) {
        console.log("click" + id)
        
    }

    render() {
        let image = "";
        if (this.props.project.images !== undefined
            && this.props.project.images[0] !== undefined) {
            image = <img src={this.props.project.images[0][0].url} />
        }

        return (
            <div className="projectMiniature">
                <DeleteProject id={this.props.project.id} />
                <Link to={'/project/' + this.props.project.id}>
                    <div className="projectMiniatureLink" onClick={() => this.onClick(this.props.project._id)}>
                        {image}
                        <div className="projectName">
                            <p>{this.props.project.title}</p>
                            <p>{this.props.project.description}</p>
                            <p>Begin date : {format(this.props.project.beginDate, "DD-MM-YYYY")}</p>
                            <p>End date : {format(this.props.project.endDate, "DD-MM-YYYY")}</p>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const token = state.loginInfos.token;

    return {
        token: token
     };
}

export default hot(module)(connect(mapStateToProps)(ProjectMiniature));