import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import backgroundImage from '../../images/backgroundImage.jpg';
import LazyHero from 'react-lazy-hero';
import style from './HeaderComponent.css';

type Props = {
    requestNavigation: (currentPage: string) => any,
    history: Object
}

export class HeaderComponent extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <LazyHero imageSrc={backgroundImage} minHeight='200px' color={'#4F4943'} isCentered={false} opacity={0.5} parallaxOffset={50}>
                <div id="title" className={style['centerName']}>
                    <h2 className={style['title']}>Arthur Joly</h2>
                    <div id="subTitle" className={style['subTitle']}>Computer science engineer student</div>
                </div>
            </LazyHero>
        )
    }
}

export const HeaderComponentConnected = connect()(HeaderComponent);
export default hot(module)(withRouter(HeaderComponentConnected));
