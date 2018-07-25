import React from 'react';
import {hot} from 'react-hot-loader';

import {connect} from 'react-redux';
import {updateProject} from '../../actions/actions';


class UpdateProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputTitle: "",
            inputDescription: "",
            beginDate: new Date(),
            endDate: new Date()
        };

        this.onClickUpdate = this.onClickUpdate.bind(this);
        this.updateInputDescription = this.updateInputDescription.bind(this);
        this.updateInputTitle = this.updateInputTitle.bind(this);
        this.updateBeginDate = this.updateBeginDate.bind(this);
        this.updateEndDate = this.updateEndDate.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.state.token = nextProps.token;
        this.setState({
            inputTitle: nextProps.project.title,
            inputDescription: nextProps.project.description,
            beginDate: new Date(nextProps.project.beginDate),
            endDate: new Date(nextProps.project.endDate)
        })
    }

    componentWillMount() {
        this.state.token = this.props.token;
    }

    onClickUpdate() {
        this.props.dispatch(updateProject({
                id: this.props.id,
                title: this.state.inputTitle,
                description: this.state.inputDescription,
                beginDate: this.state.beginDate,
                endDate: this.state.endDate
            },
            this.state.token
        ));
    }

    updateInputTitle(e) {
        this.setState({
            inputTitle: e.target.value
        })
    }

    updateInputDescription(e) {
        this.setState({
            inputDescription: e.target.value
        })
    }

    updateBeginDate(date) {
        this.setState({
            beginDate: date
        })
    }

    updateEndDate(date) {
        this.setState({
            endDate: date
        })
    }

    render() {
        if (this.state.token !== "none")
            return (
                <div id="projectForm">
                    <form>
                        <h3>Update</h3>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input className="form-control" type="text" name="title" id="title" onChange={this.updateInputTitle} value={this.state.inputTitle}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input className="form-control" type="description" name="description" id="description" onChange={this.updateInputDescription}
                                   value={this.state.inputDescription}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="beginDate">Begining date</label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate">Ending date</label>
                        </div>
                        <button type="button" className="btn btn-default" onClick={() => this.onClickUpdate()}>Update</button>
                    </form>
                </div>
            );
        else
            return <div/>
    }
}

function mapStateToProps(state) {
    const token = state.loginInfos.token;

    return {
        token
    };
}

export default hot(module)(connect(mapStateToProps)(UpdateProject));