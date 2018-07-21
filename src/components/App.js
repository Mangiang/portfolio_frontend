import React from 'react'
import { hot } from 'react-hot-loader'
import '../design.css'
import '../bootstrap.min.css'

import { connect } from 'react-redux';

import { getProjects } from '../actions/actions';
import ProjectMiniature from './ProjectMiniature';
import AddProject from './AddProject'
import HeaderComponent from './HeaderComponent';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.state.projects = nextProps.projects;
    }

    componentWillMount() {
        this.props.dispatch(getProjects());
        this.state.projects = this.props.projects;
    }

    render() {
        return(
            <div>
                <HeaderComponent/>
                <AddProject/>        
                <div id="mainBody"> 
                {
                    this.state.projects.map(function (project, i) {
                        return <ProjectMiniature key={i} project={project}/>
                    })
                }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const projects = state.projects;
    console.log("asdasd")
    console.log(state.projects)

    return {
        projects
     };
}

export default hot(module)(connect(mapStateToProps)(App));