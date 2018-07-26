import React, {Component} from 'react'
import {hot} from 'react-hot-loader'
import {connect} from 'react-redux';


class TimelineScreen extends Component {
    constructor(props) {
        super(props)
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

export default hot(module)(connect(mapStateToProps)(TimelineScreen));