// @flow

import React, {Component} from 'react'
import {hot} from 'react-hot-loader'
import {connect} from 'react-redux';
import ProjectList from '../components/Projects/ProjectsList'
import HeaderComponent from '../components/Other/HeaderComponent'
import {withRouter} from 'react-router';

type Props = {}

class ProjectsListScreen extends Component<Props> {
    constructor(props) {
        super(props)
    }

    render() {
        console.log("Test");
        return (
            <div>
                <HeaderComponent/>
                <ProjectList/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state
    };
}

export default hot(module)(withRouter(connect(mapStateToProps)(ProjectsListScreen)));