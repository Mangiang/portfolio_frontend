import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {Router, Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
console.log("Miaou !");



import { Provider } from 'react-redux';
import Switch from 'react-router-dom/Switch';
//import epipic from './reducers/reducers';
import { store } from './store/store';
import { getNext } from './actions/actions';

import TimelineScreen from './screens/TimelineScreen'
import ProjectScreen from './screens/ProjectScreen'

console.log();

let render = function(component, eltId) {
  ReactDOM.render( 
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={App}/>
          <Route path='/timeline' component={TimelineScreen}/>
          <Route path='/project/:id' component={ProjectScreen}/>
        </Switch>
      </BrowserRouter>
    </Provider>, 
    document.getElementById(eltId)
  );
}

if(document.getElementById('rootIndex')) {
    render(<App/>, 'rootIndex')
}

/*
if(document.getElementById('rootProfil')) {
    render(<App/>, 'rootProfil')
}*/