import React from 'react';
import { hot } from 'react-hot-loader';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { connect } from 'react-redux';
import { addTimeline } from '../actions/actions';

import 'react-datepicker/dist/react-datepicker.css';

class AddTimeline extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputTitle: "",
            inputDescription: "",
            beginDate:moment(),
            endDate:moment()
        }

        this.onClickAdd = this.onClickAdd.bind(this);
        this.updateInputDescription = this.updateInputDescription.bind(this);
        this.updateInputTitle = this.updateInputTitle.bind(this);
        this.updateBeginDate = this.updateBeginDate.bind(this);
        this.updateEndDate = this.updateEndDate.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.state.token = nextProps.token;
    }

    componentWillMount() {
        this.state.token = this.props.token;
    }

    onClickAdd() {
        this.props.dispatch(addTimeline(
            this.state.inputTitle,
            this.state.inputDescription,
            this.state.beginDate,
            this.state.endDate,
            this.state.token
        ));
        this.setState({
            inputDescription: "",
            inputTitle: "",
            beginDate:moment(),
            endDate:moment()
        })      
    }

    onClickHide() {
        
    }

    updateInputTitle(e) {
        this.setState({
            inputTitle: e.target.value
        })
    }

    updateInputDescription(e) {
        this.setState({
            inputDescription: e.target.value
        })
    }
    
    updateBeginDate(date) {
        this.setState({
            beginDate:date 
        })
    }
    
    updateEndDate(date) {
        this.setState({
            endDate:date 
        })
    }

    render() {
        if (this.state.token != "none")
            return (
                <div id="projectForm">
                    <form>
                        <h3>New timeline</h3>
                        <div className="form-group">
                            <label htmlFor="titlet">Title</label>
                            <input className="form-control" type="text" name="titlet" id="titlet" onChange={this.updateInputTitle} value={this.state.inputTitle}/>
                        </div>
                        <div className="form-group"> 
                            <label htmlFor="description">Description</label>
                            <input className="form-control" type="description" name="description" id="description" onChange={this.updateInputDescription} value={this.state.inputDescription}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="beginDate">Begining date</label>
                            <DatePicker name="beginDate" selected={this.state.beginDate} onChange={this.updateBeginDate} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate">Ending date</label>
                            <DatePicker name="endDate" selected={this.state.endDate} onChange={this.updateEndDate} />
                        </div>
                        <button type="button" className="btn btn-default" onClick={() => this.onClickAdd()}>Add</button>
                    </form>                
                </div>
            );
        else
            return <div></div>
    }
}

function mapStateToProps(state) {
    const token = state.loginInfos.token;

    return {
        token
     };
}

export default hot(module)(connect(mapStateToProps)(AddTimeline));