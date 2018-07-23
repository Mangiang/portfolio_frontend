import React from 'react';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Nav, Navbar, NavItem} from 'react-bootstrap';

import {NavLink, NavLinksList} from './styles/HeaderComponentStyles'

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            token: "none"
        }
    }

    componentWillReceiveProps(nextProps) {
        this.state.token = nextProps.token;
    }

    render() {
        let title = "";
        console.log("t", this.props);
        if (this.props.page === "timeline") {
            title = (
                <div id="title">
                    <Link to={'/'}>Portefolio</Link>
                    <h1><Link to={'/'}>Timeline</Link></h1>
                </div>
            )
        }
        else {
            console.log("t");
            title = (
                <div id="title">
                    <h1><Link to={'/'}>Portefolio</Link></h1>
                    <Link to={'/timeline'}>Timeline</Link>
                </div>
            )
        }

        return (

            <Navbar inverse collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/">Arthur Joly</a>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav style={NavLinksList}>
                    <NavItem style={NavLink} href="/projectsList">
                        Portfolio
                    </NavItem>
                    <NavItem href="/timeline">
                        Timeline
                    </NavItem>
                </Nav>
            </Navbar>
            /*<header className='headerInline'>
                {title}
                <Login/>               
            </header>*/
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