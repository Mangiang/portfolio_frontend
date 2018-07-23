import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {styles} from './styles/HeaderComponentStyles'


import BackgroundImage from '../images/backgroundImage.jpg'
import {Parallax} from 'react-parallax';

import {requestNavigation} from '../actions/actions';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Parallax
                    blur={3}
                    bgImage={BackgroundImage}
                    bgImageAlt="the background image"
                    strength={500}>
                    <div style={styles.backgroundOverlay}>
                        <h1 style={styles.centerName}>Arthur Joly's portfolio</h1>
                        <h4 style={styles.centerDescription}>
                            Here is a list of some projects I worked on<br/>
                        </h4>
                        <button onClick={this.handleTimelineRedirect.bind(this)}>
                            {(this.props.currentPage !== 'timeline' ? 'Timeline' : 'Projects list')}
                        </button>
                        <div style={{height: 200}}/>
                    </div>
                </Parallax>
                <div style={{height: 5000000}}/>
            </div>
        )
    }

    handleTimelineRedirect() {
        if (this.props.currentPage === "timeline")
            this.props.requestNavigation('projectslist');
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

function mapDispatchToProps(dispatch) {
    return {
        requestNavigation: (newPage) => {
            dispatch(requestNavigation(newPage));
        }
    }
}

export default hot(module)(withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)));