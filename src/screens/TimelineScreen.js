import {Component} from 'react'
import {hot} from 'react-hot-loader'
import {connect} from 'react-redux';
import Timeline from '../components/Timeline/Timeline';


class TimelineScreen extends Component {
    constructor(props) {
        super(props)
    }
  
    render() {
        return (
            <div>
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