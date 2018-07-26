// @flow

import React from 'react';


import style from './ProgressBar.css';

type Props = {
    completion: number,
    endValue: string,
    beginValue: string
}

export const ProgressBar = (props: Props) => {

    let endValuePosStyle = {width: `${props.completion}%`};

    return (
        <div>
            <div className={style['progress']}>
                <div align="right" className={style['progressBar']} style={endValuePosStyle}>
                    >>>
                </div>
            </div>
            <div className={style['progressValueHolder']}>
                <div className={style['progressValue']} style={endValuePosStyle}>
                    {props.endValue}
                </div>
            </div>
            {props.beginValue}
        </div>
    );
};