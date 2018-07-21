import React from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Login from './Login'

import './styles/HeaderComponentStyles.css'

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            token: "none"
        }
    }

    componentWillReceiveProps(nextProps) {
        this.state.token = nextProps.token;
    }

    render() {
        let title = ""
        console.log("t", this.props)
        if (this.props.page === "timeline") {
            title = (
                <div id="title">
                    <Link to={'/'}>Portefolio</Link>
                    <h1><Link to={'/'}>Timeline</Link></h1>
                </div>
            )
        }
        else {
            console.log("t")
            title = (
                <div id="title">
                    <h1><Link to={'/'}>Portefolio</Link></h1>
                    <Link to={'/timeline'}>Timeline</Link>
                </div>
            )
        }

        return (

            <header className='headerInline'>
                {title}
                <Login/>               
            </header>
        )
    }
}

function mapStateToProps(state) {
    const token = state.loginInfos.token;

    return {
        token: token
     };
}

export default hot(module)(connect(mapStateToProps)(HeaderComponent));