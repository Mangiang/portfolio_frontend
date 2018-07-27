// @flow

import React from 'react';
import {store} from './Store/store';
import Loadable from 'react-loadable';

import './design.css';
import 'normalize.css';

//TODO: Add loading gif
function AppLoader() {
    return <h3>Loading...</h3>;
}

const App = Loadable({
    loader: () => import ('./App'),
    loading: AppLoader
});

const TimelineScreen = Loadable({
    loader: () => import ('./Screens/TimelineScreen'),
    loading: AppLoader
});

const ProjectsListScreen = Loadable({
    loader: () => import ('./Screens/ProjectsListScreen'),
    loading: AppLoader
});

const ProjectDetailsScreen = Loadable({
    loader: () => import ('./Screens/ProjectDetailsScreen'),
    loading: AppLoader
});

const render = function (component, eltId) {
    const root = document.getElementById(eltId);

    if (root) {
        import('react-router-dom').then(parametersRouterDom => {
            let BrowserRouter = parametersRouterDom.BrowserRouter;
            let Switch = parametersRouterDom.Switch;
            import('react-router-dom').then(parametersRouter => {
                let Route = parametersRouter.Route;
                import('react-redux').then(parametersRedux => {
                    let Provider = parametersRedux.Provider;
                    import('react-dom').then(parametersDom => {
                        let hydrate = parametersDom.hydrate;
                        let render = parametersDom.render;

                        if (root.hasChildNodes()) {
                            hydrate(
                                <Provider store={store}>
                                    <BrowserRouter>
                                        <App>
                                            <Switch>
                                                <Route exact path='/' component={ProjectsListScreen}/>
                                                <Route exact path='/timeline' component={TimelineScreen}/>
                                                <Route exact path='/projectsList' component={ProjectsListScreen}/>
                                                <Route path='/project/:id' component={ProjectDetailsScreen}/>
                                            </Switch>
                                        </App>
                                    </BrowserRouter>
                                </Provider>,
                                root
                            );
                        } else {
                            render(
                                <Provider store={store}>
                                    <BrowserRouter>
                                        <App>
                                            <Switch>
                                                <Route exact path='/' component={ProjectsListScreen}/>
                                                <Route exact path='/timeline' component={TimelineScreen}/>
                                                <Route exact path='/projectsList' component={ProjectsListScreen}/>
                                                <Route path='/project/:id' component={ProjectDetailsScreen}/>
                                            </Switch>
                                        </App>
                                    </BrowserRouter>
                                </Provider>,
                                root
                            );
                        }

                    });
                });
            });
        });
    }
};

if (document.getElementById('rootIndex')) {
    render(<ProjectsListScreen/>, 'rootIndex')
}
