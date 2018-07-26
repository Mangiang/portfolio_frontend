import React from 'react'
import {hot} from 'react-hot-loader';
import Loadable from 'react-loadable';
import {connect} from 'react-redux';

import styles from './App.css';

//TODO: Add loading gif
function AppLoader() {
    return <h3>Loading...</h3>;
}

const HeaderComponent = Loadable({
    loader: () => import ('./components/Other/HeaderComponent'),
    loading: AppLoader
});

export class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles['contentContainer']}>
                <div className={styles['content']}>
                    <HeaderComponent/>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        state
    };
}

export default hot(module)(connect(mapStateToProps, null, null, {pure: false})(App));
