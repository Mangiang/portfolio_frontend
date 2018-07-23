import React from 'react';
import ReactDOM from 'react-dom';
import {Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import Switch from 'react-router-dom/Switch';
import {store} from './store/store';
import {getNext} from './actions/actions';
import Loadable from 'react-loadable';

import './design.css';
import './bootstrap.min.css';


//TODO: Add loading gif
function AppLoader() {
    return <h3>Loading...</h3>;
}

const App = Loadable({
    loader: () =>
        import ('./components/App'),
    loading: AppLoader
});
const HeaderComponent = Loadable({
    loader: () =>
        import ('./components/HeaderComponent'),
    loading: AppLoader
});
const TimelineScreen = Loadable({
    loader: () =>
        import ('./screens/TimelineScreen'),
    loading: AppLoader
});
const ProjectsListScreen = Loadable({
    loader: () =>
        import ('./screens/ProjectsListScreen'),
    loading: AppLoader
});

const render = function (component, eltId) {
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
