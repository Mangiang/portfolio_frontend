import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import backgroundImage from '../../images/backgroundImage.jpg';
import LazyHero from 'react-lazy-hero';
import style from './HeaderComponent.css';

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
            <LazyHero imageSrc={backgroundImage} minHeight='500px' color={'#4F4943'} isCentered={false} opacity={0.5} parallaxOffset={50}>
                <div id="title" className={style['centerName']}>
                    <h2 className={style['title']}>Arthur Joly</h2>
                    <div id="subTitle" className={style['subTitle']}>Computer science engineer student</div>
                </div>
                <div className={style['footer']}>
                    <h4 id="description" className={style['centerDescription']}>{description}</h4>
                    <br/>
                    <button onClick={this.handlePageRediection.bind(this)}>{buttonTitle}</button>
                </div>
            </LazyHero>
        )
    }

    handlePageRediection() {
        if (this.props.currentPage === "timeline") {
            this.props.requestNavigation('projectsList');
            this.props.history.push('/projectsList');
        }
        else {
            this.props.requestNavigation('timeline');
            this.props.history.push('/timeline');
        }
    }
}

type State = { navHeader: '' }
    | { navHeader: 'projectsList' }
    | { navHeader: 'timeline' }

function mapStateToProps(state: State, ownProps) {
    const destinationPage = state.navHeader;

    if (!destinationPage
        || (destinationPage !== 'projectsList' && destinationPage !== 'timeline')) {
        return {
            currentPage: 'projectsList'
        };
    }

    return {
        currentPage: destinationPage,
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
