import {Component} from 'react';
import {hot} from 'react-hot-loader';

import {connect} from 'react-redux';

import {displayProject} from '../../actions/actions';
import UpdateProject from './UpdateProject';
import AddImageToProject from './AddImageToProject';

import format from 'date-fns/format';

class ProjectList extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.dispatch(displayProject(this.props.id))
    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        let images = "";
        if (this.props.project.images !== undefined) {
            images = (
                this.props.project.images.map((img, i) => {
                    return (
                        <div key={i} className="image">
                            <a href={img[0].url}>
                                <img src={img[0].url}/>
                            </a>
                        </div>
                    )
                })
            )
        }

        return (
            <div>
                <UpdateProject id={this.props.id} project={this.props.project}/>
                <div id="projectDetails">
                    <h3>{this.props.project.title}</h3>
                    <p>Description : {this.props.project.description}</p>
                    <p>Begin date : {format(this.props.project.beginDate, "DD-MM-YYYY")}</p>
                    <p>End date : {format(this.props.project.endDate, "DD-MM-YYYY")}</p>
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

    return {
        project,
    };
}

export default hot(module)(connect(mapStateToProps)(ProjectList));