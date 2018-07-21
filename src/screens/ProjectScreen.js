import React from 'react'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux';
import HeaderComponent from '../components/HeaderComponent';
import Project from '../components/Project';

class ProjectScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
    }
  
    render() {
        return (
            <div>
                <HeaderComponent page="projects"/>
                <Project id={this.props.match.params.id}/>
            </div>
        )
   }
}

function mapStateToProps(state) {
    
    return {
        state
    };
}

export default hot(module)(connect(mapStateToProps)(ProjectScreen));