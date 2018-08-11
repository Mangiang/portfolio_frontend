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
                <ul className={style["carouselSlides"]}>
                    {this.props.slides.map((slide, index) =>
                        <li className={index === this.state.activeIndex ?
                            [style["carouselSlide"], style["carouselSlide--active"]].join(' ') :
                            style["carouselSlide"]} key={index}>
                            <div className={style["carouselSlideContainer"]}>
                                <a href={slide.url} target={"_blank"}>
                                    <img className={style["carouselSlideContent"]} src={slide.url}/>
                                </a>
                                <a href="#"
                                   className={[style["carouselArrow"], style["carouselArrow--left"]].join(' ')}
                                   onClick={event => this.goToPrevSlide(event)}>
                                    <span
                                        className={["fa fa-2x fa-angle-left", style["carouselArrow--icon"]].join(' ')}/>
                                </a>
                                <a href="#"
                                   className={[style["carouselArrow"], style["carouselArrow--right"]].join(' ')}
                                   onClick={event => this.goToNextSlide(event)}>
                                    <span
                                        className={["fa fa-2x fa-angle-right", style["carouselArrow--icon"]].join(' ')}/>
                                </a>
                            </div>

                            <p>
                                <strong className={style["carouselSlideName"]}>
                                    Image {index}
                                </strong>,
                                {" "}
                                <small className={style["carouselSlideSource"]}>
                                    {this.props.projectTitle}
                                </small>
                            </p>
                        </li>
                    )}
                </ul>

                <ul className={style["carouselIndicators"]}>
                    {this.props.slides.map((slide, index) =>
                        <li key={index}>
                            <a className={
                                index === this.state.activeIndex ?
                                    [style["carouselIndicator"], style["carouselIndicator--active"]].join(' ') :
                                    style["carouselIndicator"]}
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
