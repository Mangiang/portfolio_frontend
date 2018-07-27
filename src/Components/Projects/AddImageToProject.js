import React, {Component} from 'react';
import {hot} from 'react-hot-loader';

import {connect} from 'react-redux';
import {uploadImages} from '../../Actions/Actions';


class AddImageToProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            images: []
        };

        this.onClickUpdate = this.onClickUpdate.bind(this);
        this.updateImages = this.updateImages.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.state.token = nextProps.token;
        this.setState({
            images: []
        })
    }

    componentWillMount() {
        this.state.token = this.props.token;
    }

    onClickUpdate() {
        this.props.dispatch(uploadImages(
            this.state.images,
            this.props.id,
            this.state.token
        ));
        this.setState({
            images: []
        })
    }

    updateImages(imgList) {
        let images = [];
        console.log(imgList);
        Array.from(imgList).forEach(elt => {
            let reader = new FileReader();
            console.log(elt);
            reader.onload = (e) => {
                images.push({url: e.target.result, blob: elt});
                this.setState({
                    images: images,
                })
            };
            reader.readAsDataURL(elt);
        });
    }

    render() {
        let renderDiv = null;

        if (this.state.token !== "none") {
            renderDiv = <div id="projectForm">
                <form>
                    <h3>Add image to this project</h3>
                    <div className="form-group">
                        <label htmlFor="images">Images</label>
                        <input className="form-control" type="file" name="images" id="images" accept="image/*" onChange={(e) => this.updateImages(e.target.files)} multiple/>
                        {this.state.images.length > 0 &&
                        this.state.images.map(function (img, i) {
                            return <img key={i} src={img.url} style={{height: 200, width: 'auto'}}/>
                        })
                        }
                    </div>
                    <button type="button" className="btn btn-default" onClick={() => this.onClickUpdate()}>Update</button>
                </form>
            </div>;
        }
        else {
            renderDiv = <div/>;
        }

        return renderDiv;
    }
}

function mapStateToProps(state) {
    const token = state.loginInfos.token;

    return {
        token
    };
}

export default hot(module)(connect(mapStateToProps)(AddImageToProject));