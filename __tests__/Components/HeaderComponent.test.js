import React from 'react';
import renderer from 'react-test-renderer';
import thunk from 'redux-thunk'

import {HeaderComponent} from '../../src/Components/Other/HeaderComponent';

jest.mock('react-router-dom');

const middlewares = [thunk];

describe('>>> HEADER COMPONENT --- Snapshot', () => {
    const currentPage = "projectsList";
    const history = {};
    const requestNavigation = (str: string): any => str;

    it('+++ capturing Snapshot of Projects list dumb component', () => {
        const renderedValue = renderer.create(<HeaderComponent currentPage={currentPage} history={history} requestNavigation={requestNavigation}/>).toJSON();
        expect(renderedValue).toMatchSnapshot();
    });
});
