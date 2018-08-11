// @flow
import React, { Component } from 'react';

import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';

import style from './ModalImage.css';

type Props = {
    onCloseRequest:()=>any,
    url:string
}

class ModalImage extends Component<Props> {
    handleKeyUp : (Event) => void;
    handleOutsideClick : (Event) => void;
    modal : ?Object;

    constructor(props) {
        super(props);

        this.modal = {};
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
    }

    componentDidMount() {
        window.addEventListener('keyup', this.handleKeyUp, false);
        document.addEventListener('click', this.handleOutsideClick, false);
    }

    componentWillUnmount() {
        window.removeEventListener('keyup', this.handleKeyUp, false);
        document.removeEventListener('click', this.handleOutsideClick, false);
    }

    handleKeyUp(event) {
        const { onCloseRequest } = this.props;
        const keys = {
            "27": () => {
                event.preventDefault();
                onCloseRequest();
                window.removeEventListener('keyup', this.handleKeyUp, false);
            },
        };

        if (keys[event.keyCode]) { keys[event.keyCode](); }
    }

    handleOutsideClick(event) {
        const { onCloseRequest } = this.props;

        if (this.modal != null) {
            if (!this.modal.contains(event.target)) {
                onCloseRequest();
                document.removeEventListener('click', this.handleOutsideClick, false);
            }
        }
    }

    render () {
        const {
            onCloseRequest,
            url,
        } = this.props;

        return (
            <div className={style["modalOverlay"]}>
                <div className={style["modal"]}
                    ref={node => (this.modal = node)}>
                    <img className={style["modalImage"]} src={url}/>
                </div>

                <button type="button"
                    className={style["closeButton"]}
                    onClick={onCloseRequest}/>
            </div>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return {
        slides: ownProps.slides,
        projectTitle: ownProps.projectTitle
    };
}

export default hot(module)(connect(mapStateToProps)(ModalImage));
