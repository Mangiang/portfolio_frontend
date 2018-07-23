import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import Switch from 'react-router-dom/Switch';
import {store} from './store/store';
import {getNext} from './actions/actions';

import './design.css'
import './bootstrap.min.css'

import HeaderComponent from './components/HeaderComponent';

import TimelineScreen from './screens/TimelineScreen'
import ProjectsListScreen from './screens/ProjectsListScreen'

let render = function(component, eltId) {
  ReactDOM.render( 
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
            <HeaderComponent page="projects"/>
            <Route exact path='/' component={App}/>
            <Route path='/timeline' component={TimelineScreen}/>
            <Route path='/projectsList' component={ProjectsListScreen}/>
        </Switch>
      </BrowserRouter>
    </Provider>, 
    document.getElementById(eltId)
  );
};

if(document.getElementById('rootIndex')) {
    render(<App/>, 'rootIndex')
}

/*if(document.getElementById('rootProfil')) {
    render(<App/>, 'rootProfil')
}*/