import React from 'react';
import { hot } from 'react-hot-loader';
import moment from 'moment';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteTimeline } from '../actions/actions';




class TimelineMiniature extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentWillReceiveProps(nextProps) {

    }

    componentWillReceiveProps(nextProps) {
        this.state.token = nextProps.token;
    }

    componentWillMount() {
        this.state.token = this.props.token;
    }

    onClick() {
        this.props.dispatch(deleteTimeline(this.props.timeline.id, this.props.token));
    }

    render() {
        let buttonDelete = {}
        if (this.state.token != "none") {
            console.log("testetstetsets")
            buttonDelete =
                <form>
                    <button type="button" className="btn btn-default" onClick={() => this.onClick()}>X</button>
                </form>
        }
        else {
            buttonDelete = <form></form>
        }
        
        return (
            
            <div className="timelineMiniature">
                { buttonDelete }
                <h4>{this.props.timeline.title}</h4>
                <p>{this.props.timeline.description}</p>
                <p>Begin date : {moment(this.props.timeline.beginDate).format("DD-MM-YYYY")}</p>
                <p>End date : {moment(this.props.timeline.endDate).format("DD-MM-YYYY")}</p>
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

export default hot(module)(connect(mapStateToProps)(TimelineMiniature));