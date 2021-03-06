import React from 'react';
import {hot} from 'react-hot-loader';

import {connect} from 'react-redux';
import {deleteProject} from '../../Actions/Actions';


class DeleteProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.onClick = this.onClick.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.state.token = nextProps.token;
    }

    componentWillMount() {
        this.state.token = this.props.token;
    }

    onClick() {
        this.props.dispatch(deleteProject(this.props.id, this.props.token));
    }

    render() {
        if (this.state.token !== "none")
            return (
                <div className="deleteForm">
                    <form>
                        <button type="button" className="btn btn-default" onClick={() => this.onClick()}>X</button>
                    </form>                
                </div>
            );
        else
            return <div/>
    }
}

function mapStateToProps(state) {
    const token = state.loginInfos.token;

    return {
        token
     };
}

export default hot(module)(connect(mapStateToProps)(DeleteProject));