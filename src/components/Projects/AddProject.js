import React from 'react';
import {hot} from 'react-hot-loader';

import {connect} from 'react-redux';
import {addProject} from '../../actions/actions';


class AddProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputTitle: "",
            inputDescription: "",
            beginDate: new Date(),
            endDate: new Date(),
            images:[]
        };

        this.onClickAdd = this.onClickAdd.bind(this);
        this.updateInputDescription = this.updateInputDescription.bind(this);
        this.updateInputTitle = this.updateInputTitle.bind(this);
        this.updateBeginDate = this.updateBeginDate.bind(this);
        this.updateEndDate = this.updateEndDate.bind(this);
        this.updateImages = this.updateImages.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.state.token = nextProps.token;
    }

    componentWillMount() {
        this.state.token = this.props.token;
    }

    onClickAdd() {
        this.props.dispatch(addProject(
            this.state.inputTitle,
            this.state.inputDescription,
            this.state.beginDate,
            this.state.endDate,
            this.state.images,
            this.state.token
        ));
        this.setState({
            inputDescription: "",
            inputTitle: "",
            beginDate: new Date(),
            endDate: new Date(),
            images: []
        })      
    }

    onClickHide() {
        
    }

    updateInputTitle(e) {
        this.setState({
            inputTitle: e.target.value
        })
    }

    updateInputDescription(e) {
        this.setState({
            inputDescription: e.target.value
        })
    }
    
    updateBeginDate(date) {
        this.setState({
            beginDate:date 
        })
    }
    
    updateEndDate(date) {
        this.setState({
            endDate:date 
        })
    }
    
    updateImages(imgList) {
        let imgs = [];
        console.log(imgList);
        Array.from(imgList).forEach(elt => {
            let reader = new FileReader();
            console.log(elt);
            reader.onload = (e) => {
                imgs.push({url:e.target.result, blob:elt});
                this.setState({
                    images:imgs,
                })
            };
            reader.readAsDataURL(elt);
        });
    }

    render() {
        if (this.state.token !== "none")
            return (
                <div id="projectForm">
                    <form>
                        <h3>New project</h3>
                        <div className="form-group">
                            <label htmlFor="titlep">Title</label>
                            <input className="form-control" type="text" name="titlep" id="titlep" onChange={this.updateInputTitle} value={this.state.inputTitle}/>
                        </div>
                        <div className="form-group"> 
                            <label htmlFor="description">Description</label>
                            <input className="form-control" type="description" name="description" id="description" onChange={this.updateInputDescription} value={this.state.inputDescription}/>
                        </div>
                        <div className="form-group"> 
                            <label htmlFor="images">Images</label>
                            <input className="form-control" type="file" name="images" id="images" accept="image/*" onChange={(e) => this.updateImages(e.target.files)} multiple />
                            { this.state.images.length > 0 &&
                                this.state.images.map(function (img, i) {
                                    return <img key={i} src={img.url} style={{height:200, width:'auto'}}/>
                                })
                            }
                        </div>
                        <div className="form-group">
                            <label htmlFor="beginDate">Begining date</label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="endDate">Ending date</label>
                        </div>
                        <button type="button" className="btn btn-default" onClick={() => this.onClickAdd()}>Add</button>
                    </form>                
                </div>
            );
        else
            return <div></div>
    }
}

function mapStateToProps(state) {
    const token = state.loginInfos.token;

    return {
        token
     };
}

export default hot(module)(connect(mapStateToProps)(AddProject));