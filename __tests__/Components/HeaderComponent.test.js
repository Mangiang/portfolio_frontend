// @flow

import React from 'react';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'

import {HeaderComponent, HeaderComponentConnected, mapStateToProps} from '../../src/components/Other/HeaderComponent';

jest.mock('react-router-dom');

const middlewares = [thunk];

describe('>>> HEADER COMPONENT --- Snapshot', () => {
    const currentPage = "projectsList";
    const history = {};
    const requestNavigation = (str: string): any => "currentPage";

    it('+++ capturing Snapshot of Projects list dumb component', () => {
        const renderedValue = renderer.create(<HeaderComponent currentPage={currentPage} history={history} requestNavigation={requestNavigation}/>).toJSON();
        expect(renderedValue).toMatchSnapshot();
    });
});

describe('>>> HEADER REDUX COMPONENT', () => {
    const mockStore = configureStore(middlewares);

    it('+++ render the component', () => {
        const initialState = {navHeader: "projectsList"};

        let store = mockStore(initialState);
        store.dispatch = jest.fn();

        let component = shallow(<HeaderComponentConnected store={store}/>);

        expect(component).not.toBe(null);
        expect(component).not.toBe(undefined);
    });

    it('+++ check currentPage value setting projectsList', () => {
        const initialState = {navHeader: "projectsList"};

        let store = mockStore(initialState);
        let component = shallow(<HeaderComponentConnected store={store}/>);

        expect(component.prop('currentPage')).toEqual(initialState.navHeader);
    });

    it('+++ check currentPage value setting timeline', () => {
        const initialState = {navHeader: "timeline "};

        let store = mockStore(initialState);
        let component = shallow(<HeaderComponentConnected store={store}/>);

        expect(component.prop('currentPage')).toEqual(initialState.navHeader);
    });

    it('+++ check description value on Projects list page', () => {
        const initialState = {navHeader: "projectsList"};
        const expectedValue = "Here is a list of my projects";

        let store = mockStore(initialState);
        let wrapper = shallow(<HeaderComponentConnected store={store}/>);
        let component = wrapper.dive().find('h4');

        expect(component.text()).toEqual(expectedValue);
    });

    it('+++ check description value on Timeline page', () => {
        const initialState = {navHeader: "timeline"};
        const expectedValue = "Here are both my professional and school my experience";

        let store = mockStore(initialState);
        let wrapper = shallow(<HeaderComponentConnected store={store}/>);
        let component = wrapper.dive().find('h4');

        expect(component.text()).toEqual(expectedValue);
    });
});

describe('>>> HEADER REDUX MAPSTATETOPROPS', () => {
    it('+++ check default mapStateToProps value', () => {
        const actual = mapStateToProps({});

        expect(actual).not.toBe(null);
        expect(actual).not.toBe(undefined);
        expect(actual.currentPage).toEqual('projectsList');
    });

    it('+++ check mapStateToProps value setting projectsList', () => {
        const actual = mapStateToProps({navHeader: "projectsList"});

        expect(actual).not.toBe(null);
        expect(actual).not.toBe(undefined);
        expect(actual.currentPage).toEqual('projectsList');
    });

    it('+++ check mapStateToProps value setting timeline', () => {
        const actual = mapStateToProps({navHeader: "timeline"});

        expect(actual).not.toBe(null);
        expect(actual).not.toBe(undefined);
        expect(actual.currentPage).toEqual('timeline');
    });
});
