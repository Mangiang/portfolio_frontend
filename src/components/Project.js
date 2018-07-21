import React from 'react';
import { hot } from 'react-hot-loader';
import moment from 'moment';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { displayProject, deleteImage } from '../actions/actions';
import UpdateProject from './UpdateProject';
import AddImageToProject from './AddImageToProject';




class Project extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }

        this.onClickDelete = this.onClickDelete.bind(this)
    }

    onClickDelete(id) {
        console.log("token", this.props.token)
        this.props.dispatch(deleteImage(id, this.props.project.id, this.props.token));
    }

    componentWillMount() {
        this.props.dispatch(displayProject(this.props.id))
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        let images = "";
        let button = "";
        if (this.props.token != "none") {
            if (this.props.project.images != undefined) {
                images = (
                    this.props.project.images.map((img, i) => {
                        return (
                            <div key={i} className="image">
                                <form>
                                    <button type="button" className="btn btn-default" onClick={() => this.onClickDelete(img[0].id)}>X</button>
                                </form> 
                                <a href={img[0].url}>
                                    <img src={img[0].url} />
                                </a>
                            </div>
                        )
                    })
                )
            }
        }
        else {
            if (this.props.project.images != undefined) {
                images = (
                    this.props.project.images.map((img, i) => {
                        return (
                            <div key={i} className="image">
                                <a href={img[0].url}>
                                    <img src={img[0].url} />
                                </a>
                            </div>
                        )
                    })
                )
            }
        }

        return (
            <div>
                <UpdateProject id={this.props.id} project={this.props.project} />
                <div id="projectDetails">
                    <h3>{this.props.project.title}</h3>
                    <p>Description : {this.props.project.description}</p>
                    <p>Begin date : {moment(this.props.project.beginDate).format("DD-MM-YYYY")}</p>
                    <p>End date : {moment(this.props.project.endDate).format("DD-MM-YYYY")}</p>
                    <div id="projectImages"> 
                        <AddImageToProject id={this.props.project.id}/>
                        {images}
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const project = state.currentProject;
    const token = state.loginInfos.token;

    return {
        project,
        token
     };
}

export default hot(module)(connect(mapStateToProps)(Project));