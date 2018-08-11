import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import style from './FooterComponent.css';

type Props = {

}

export class FooterComponent extends Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    render(){
        return (<div className={style["container"]}></div>)
    }
}

export const FooterComponentConnected = connect()(FooterComponent);
export default hot(module)(withRouter(FooterComponentConnected));
