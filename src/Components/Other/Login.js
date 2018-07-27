import React, {Component} from 'react';
import {hot} from 'react-hot-loader';

import {connect} from 'react-redux';
import {login, logout} from '../../Actions/Actions';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputLogin: "",
            inputPassword: "",
            token: "none"
        };

        this.onClickLogin = this.onClickLogin.bind(this);
        this.updateInputLogin = this.updateInputLogin.bind(this);
        this.updateInputPassword = this.updateInputPassword.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.state.token = nextProps.token;
        if (nextProps.loginFailed)
            Login.blinkForm("#CC0000");
    }

    componentWillMount() {
        this.state.token = this.props.token;
    }

    onClickLogin() {
        this.props.dispatch(login(this.state.inputLogin, this.state.inputPassword));
    }

    onClickLogout() {
        this.props.dispatch(logout());
    }

    static blinkForm(color) {
        let elt = document.getElementById("loginForm").childNodes[0];
        elt.style.backgroundColor = color;
    }

    updateInputLogin(e) {
        this.setState({
            inputLogin: e.target.value
        })
    }

    updateInputPassword(e) {
        this.setState({
            inputPassword: e.target.value
        })
    }

    render() {
        let loginDiv = null;

        if (this.state.token === "none") {
            loginDiv = <form className="form-inline" id="loginForm">
                <div className="form-group">
                    <label htmlFor="login">Login</label>
                    <input className="form-control" type="text" name="login" id="login" onChange={this.updateInputLogin}/>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="form-control" type="password" name="password" id="password" onChange={this.updateInputPassword}/>
                </div>
                <button type="button" className="btn btn-default" onClick={() => this.onClickLogin()}>Log in</button>
            </form>
        }
        else {
            loginDiv = <div id="logoutButton">
                <button type="button" className="btn btn-default" onClick={() => this.onClickLogout()}>Log out</button>
            </div>
        }
        return ({loginDiv});
    }
}

function mapStateToProps(state) {
    const token = state.loginInfos.token;
    const loginFailed = state.loginInfos.loginFailed;
    console.log(token + "  miaou");

    return {
        token,
        loginFailed
    };
}

export default hot(module)(connect(mapStateToProps)(Login));