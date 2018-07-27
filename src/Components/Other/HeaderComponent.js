import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
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
            <div id="title" className={style['centerName']}>
                <h2 className={style['title']}>Arthur Joly</h2>
                <div id="subTitle" className={style['subTitle']}>Computer science engineer student</div>
                <div className={style['divLine']}/>
            </div>
        )
    }
}

export const HeaderComponentConnected = connect()(HeaderComponent);
export default hot(module)(withRouter(HeaderComponentConnected));
