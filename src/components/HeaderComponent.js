// @flow

import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import type {Dispatch} from "redux"

import {styles} from './styles/HeaderComponentStyles'


import Parallax from 'react-parallax';

import {requestNavigation} from '../actions/actions';

type Props = {
    currentPage: string,
    requestNavigation: (currentPage: string) => any,
    history: Object
}

class HeaderComponent extends Component<Props> {
    constructor(props) {
        super(props);
    }

    render() {
        let description = "";
        if (this.props.currentPage === 'timeline')
            description = "Here are both my professional and school my experience";
        else if (this.props.currentPage === 'projectsList')
            description = "Here is a list of my projects";

        return (
            <div>
                <Parallax
                    blur={3}
                    bgImage={require('../images/backgroundImage.jpg')}
                    bgImageAlt="the background image"
                    strength={500}>
                    <div style={styles.backgroundOverlay}>
                        <h1 style={styles.centerName}>Arthur Joly's portfolio</h1>
                        <h4 style={styles.centerDescription}>
                            {description}
                            <br/>
                        </h4>
                        <button onClick={this.handleTimelineRedirect.bind(this)}>
                            {(this.props.currentPage !== 'timeline' ? 'Timeline' : 'Projects list')}
                        </button>
                        <div style={{height: 200}}/>
                    </div>
                </Parallax>
            </div>
        )
    }

    handleTimelineRedirect() {
        if (this.props.currentPage === "timeline")
            this.props.requestNavigation('projectsList');
        else {
            this.props.requestNavigation('timeline');
        }
        this.props.history.push('/' + this.props.currentPage);
    }
}

function mapStateToProps(state) {
    const destinationPage = state.navHeader;
    if (!destinationPage || Object.keys(destinationPage).length === 0) {
        return {
            currentPage: 'projectsList'
        };
    }
    return {
        currentPage: destinationPage
    };
}

function mapDispatchToProps(dispatch: Dispatch<*>) {
    return {
        requestNavigation: (newPage) => {
            dispatch(requestNavigation(newPage));
        }
    }
}

export default hot(module)(withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)));