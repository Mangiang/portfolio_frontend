import React from 'react'
import {hot} from 'react-hot-loader'
import '../../design.css'
import '../../bootstrap.min.css'

import {connect} from 'react-redux';
import TimelineMiniature from './TimelineMiniature';
import AddTimeline from './AddTimeline'

class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timelines: []
        }
    }

    componentWillReceiveProps(nextProps) {
        this.state.timelines = nextProps.timelines;
    }

    componentWillMount() {
        //this.props.dispatch(getTimelines());
        this.state.timelines = this.props.timelines;
    }

    render() {
        if (!this.state.timelines)
            this.state.timelines = [];
        return(
            <div id="timeline">
                <AddTimeline/>       
                <div id="mainBodyTimeline"> 
                {
                    this.state.timelines.map(function (timeline, i) {
                        return <TimelineMiniature key={i} timeline={timeline}/>
                    })
                }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    const timelines = state.timelines;
    console.log("asdasd");
    console.log(state.timelines);

    return {
        timelines
     };
}

export default hot(module)(connect(mapStateToProps)(Timeline));