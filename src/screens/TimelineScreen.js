import React from 'react'
import { hot } from 'react-hot-loader'
import { connect } from 'react-redux';
import HeaderComponent from '../components/HeaderComponent';
import Timeline from '../components/Timeline';


class TimelineScreen extends React.Component {
    constructor(props) {
        super(props)
    }
  
    render() {
        return (
            <div>
                <HeaderComponent page="timeline"/>
                <Timeline/>
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