// @flow

import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {styles} from './styles/HeaderComponentStyles';
import backgroundImage from '../../images/backgroundImage.jpg';
import LazyHero from 'react-lazy-hero';

import type {Dispatch} from "../../actions/actions";
import {requestNavigation} from '../../actions/actions';

type Props = {
    currentPage: string,
    requestNavigation: (currentPage: string) => any,
    history: Object
}

export class HeaderComponent extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        let description = "";
        let buttonTitle = "";
        if (this.props.currentPage === 'projectsList') {
            description = "Here is a list of my projects";
            buttonTitle = 'Timeline';
        }
        else if (this.props.currentPage === 'timeline') {
            description = "Here are both my professional and school my experience";
            buttonTitle = "Projects list"
        }

        return (
            <div>
                <LazyHero imageSrc={backgroundImage} color={'#4F4943'} opacity={0.5} parallaxOffset={50}>
                    <h1 id="title" style={styles.centerName}>Arthur Joly's portfolio</h1>
                    <h4 id="description" style={styles.centerDescription}>{description}</h4>
                    <br/>
                    <button onClick={this.handlePageRediection.bind(this)}>{buttonTitle}</button>
                </LazyHero>
            </div>
        )
    }

    handlePageRediection() {
        if (this.props.currentPage === "timeline") {
            this.props.history.push('/projectsList');
            this.props.requestNavigation('projectsList');
        }
        else {
            this.props.requestNavigation('timeline');
            this.props.history.push('/timeline');
        }
    }
}

export function mapStateToProps(state) {
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

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        requestNavigation: (newPage) => {
            dispatch(requestNavigation(newPage));
        }
    }
}

export const HeaderComponentConnected = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
export default hot(module)(withRouter(HeaderComponentConnected));
