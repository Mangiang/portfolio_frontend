// @flow
import React, {Component} from 'react';

import {hot} from 'react-hot-loader';
import {connect} from 'react-redux';

import style from './Carousel.css';

type Props = {
    slides: Object,
    projectTitle: string
}

type State = {
    activeIndex: number,
    slidesLength: number
}

class Carousel extends Component<Props, State> {
    state: State;

    constructor(props: Props) {
        super(props);

        this.state = {
            activeIndex: 0,
            slidesLength: this.props.slides.length
        };
    }


    render() {
        return (
            <div className={style["carousel"]}>
                <ul className={style["carousel__slides"]}>
                    {this.props.slides.map((slide, index) =>
                        <li className={index === this.state.activeIndex ?
                            [style["carousel__slide"], style["carousel__slide--active"]].join(' ') :
                            style["carousel__slide"]} key={index}>
                            <div className={style["carousel__slideContainer"]}>
                                <a href={slide.url} target={"_blank"}>
                                    <img className={style["carousel-slide__content"]} src={slide.url}/>
                                </a>
                                <a href="#"
                                   className={[style["carousel__arrow"], style["carousel__arrow--left"]].join(' ')}
                                   onClick={event => this.goToPrevSlide(event)}>
                                    <span
                                        className={["fa fa-2x fa-angle-left", style["carousel__arrow--icon"]].join(' ')}/>
                                </a>
                                <a href="#"
                                   className={[style["carousel__arrow"], style["carousel__arrow--right"]].join(' ')}
                                   onClick={event => this.goToNextSlide(event)}>
                                    <span
                                        className={["fa fa-2x fa-angle-right", style["carousel__arrow--icon"]].join(' ')}/>
                                </a>
                            </div>

                            <p>
                                <strong className={style["carousel-slide__author"]}>
                                    Image {index}
                                </strong>,
                                {" "}
                                <small className={style["carousel-slide__source"]}>
                                    {this.props.projectTitle}
                                </small>
                            </p>
                        </li>
                    )}
                </ul>

                <ul className={style["carousel__indicators"]}>
                    {this.props.slides.map((slide, index) =>
                        <li key={index}>
                            <a className={
                                index === this.state.activeIndex ?
                                    [style["carousel__indicator"], style["carousel__indicator--active"]].join(' ') :
                                    style["carousel__indicator"]}
                               onClick={event => this.goToSlide(index)}/>
                        </li>
                    )}
                </ul>
            </div>);
    }

    goToSlide(index) {
        console.log(index);
        this.setState({activeIndex: index});
    }

    goToPrevSlide(event) {
        event.preventDefault();

        let index = this.state.activeIndex;

        if (index < 1)
            index = this.state.slidesLength;

        --index;

        this.setState({
            activeIndex: index
        });
    }

    goToNextSlide(event) {
        event.preventDefault();

        let index = this.state.activeIndex;

        if (index === this.state.slidesLength - 1)
            index = -1;

        ++index;

        this.setState({
            activeIndex: index
        });
    }
}

function mapStateToProps(state, ownProps) {
    return {
        slides: ownProps.slides,
        projectTitle: ownProps.projectTitle
    };
}

export default hot(module)(connect(mapStateToProps)(Carousel));
