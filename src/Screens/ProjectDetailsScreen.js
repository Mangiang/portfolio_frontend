// @flow

import React, {Component} from 'react'
import {hot} from 'react-hot-loader'
import {connect} from 'react-redux';
import ProjectDetails from '../Components/Projects/ProjectDetails'
import {withRouter} from 'react-router';

type Props = {}

class ProjectDetailsScreen extends Component<Props> {
    constructor(props) {
        super(props)
    }

    render() {
        const {match: {params}} = this.props;
        return (<ProjectDetails projectID={params.id}/>)
    }
}

function mapStateToProps(state) {
    return {
        state
    };
}

export default hot(module)(withRouter(connect(mapStateToProps)(ProjectDetailsScreen)));