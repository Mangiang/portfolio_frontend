// @flow

import React from 'react';
import {store} from './store/store';
import Loadable from 'react-loadable';

import './design.css';
import './bootstrap.min.css';


//TODO: Add loading gif
function AppLoader() {
    return <h3>Loading...</h3>;
}

const App = Loadable({
    loader: () => import ('./components/Other/App'),
    loading: AppLoader
});

const TimelineScreen = Loadable({
    loader: () => import ('./screens/TimelineScreen'),
    loading: AppLoader
});

const ProjectsListScreen = Loadable({
    loader: () => import ('./screens/ProjectsListScreen'),
    loading: AppLoader
});

const render = function (component, eltId) {
    const root = document.getElementById(eltId);

    if (root) {
        import('react-router-dom').then(parametersDom => {
            let BrowserRouter = parametersDom.BrowserRouter;
            let Switch = parametersDom.Switch;
            import('react-router').then(parametersRouter => {
                let Route = parametersRouter.Route;
                import('react-redux').then(parametersRedux => {
                    let Provider = parametersRedux.Provider;
                    import('react-dom').then(ReactDOM => {
                        ReactDOM.render(
                            <Provider store={store}>
                                <BrowserRouter>
                                    <Switch>
                                        <Route exact path='/' component={App}/>
                                        <Route path='/timeline' component={TimelineScreen}/>
                                        <Route path='/projectsList' component={ProjectsListScreen}/>
                                    </Switch>
                                </BrowserRouter>
                            </Provider>,
                            root
                        );
                    });
                });
            });
        });
    }
};

if (document.getElementById('rootIndex')) {
    render(<App/>, 'rootIndex')
}
