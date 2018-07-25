// @flow

import React from 'react'
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer'
import {HeaderComponent} from '../../src/components/Other/HeaderComponent'

//region ************************************ SNAPSHOT ***************************************************************

describe('>>> HEADER COMPONENT --- Snapshot', () => {
    it('+++ capturing Snapshot of Projects list', () => {
        const renderedValue = renderer.create(<headerComponent currentPage={"CurrentPage"} history={{}} requestNavigation={(str: string): any => {
            return str;
        }}/>).toJSON();
        expect(renderedValue).toMatchSnapshot();
    });
});
//endregion

//region ************************************ DUMB COMPONENT *********************************************************
describe('>>> HEADER COMPONENT', () => {
    let wrapper;
    const currentPage = "projectList";
    const history = {};
    const requestNavigation = (str: string): any => "currentPage";

    beforeEach(() => {
        wrapper = shallow(<HeaderComponent currentPage={currentPage} history={history} requestNavigation={requestNavigation("")}/>)
    });

    it('+++ render the DUMB component', () => {
        expect(wrapper.length).toEqual(1);
    });

    it('+++ contains header h1', () => {
        expect(wrapper.find('h1')).not.toBe(null);
        expect(wrapper.find('h1')).not.toBe(undefined);
    });

    it('+++ contains only one header h1', () => {
        expect(wrapper.find('h1')).toHaveLength(1);
    });

    it('+++ check header h1 value', () => {
        let expectedValue = "Arthur Joly's portfolio";
        expect(wrapper.find('h1').text()).toBe(expectedValue);
    });

    it('+++ contains header h4', () => {
        expect(wrapper.find('h4')).not.toBe(null);
        expect(wrapper.find('h4')).not.toBe(undefined);
    });

    it('+++ contains only one header h4', () => {
        expect(wrapper.find('h4')).toHaveLength(1);
    });

    it('+++ contains header LazyHero', () => {
        expect(wrapper.find('LazyHero')).not.toBe(null);
        expect(wrapper.find('LazyHero')).not.toBe(undefined);
    });

    it('+++ contains only one header LazyHero', () => {
        expect(wrapper.find('LazyHero')).toHaveLength(1);
    });

    it('+++ contains header button', () => {
        expect(wrapper.find('button')).not.toBe(null);
        expect(wrapper.find('button')).not.toBe(undefined);
    });

    it('+++ contains only one header button', () => {
        expect(wrapper.find('button')).toHaveLength(1);
    });
});
//endregion

//region ************************************ REACT REDUX COMPONENT **************************************************
//endregion