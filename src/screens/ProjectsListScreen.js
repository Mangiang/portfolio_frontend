import React from 'react'
import {hot} from 'react-hot-loader'
import {connect} from 'react-redux';

class ProjectsListScreen extends React.Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
    }
  
    render() {
        return (
            <div>
            </div>
        )
   }
}

function mapStateToProps(state) {
    
    return {
        state
    };
}

export default hot(module)(connect(mapStateToProps)(ProjectsListScreen));