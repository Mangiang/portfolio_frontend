// @flow

import React, {Component} from 'react'
import {hot} from 'react-hot-loader'
import {connect} from 'react-redux';
import ProjectList from '../components/Projects/ProjectList'

type Props = {}

class ProjectsListScreen extends Component<Props> {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
    }
  
    render() {
        return (
            <ProjectList/>
        )
   }
}

function mapStateToProps(state) {
    return {
        state
    };
}

export default hot(module)(connect(mapStateToProps)(ProjectsListScreen));