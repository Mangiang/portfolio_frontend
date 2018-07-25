// @flow

import React from 'react'
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer'
import {ProjectsList} from '../../src/components/Projects/ProjectsList'

describe('>>> PROJECTS LIST COMPONENT --- Snapshot', () => {
    it('+++ capturing Snapshot of Projects list', () => {
        const renderedValue = renderer.create(<ProjectsList projects={[]} getProjects={() => []}/>).toJSON();
        expect(renderedValue).toMatchSnapshot();
    });
});

describe('>>> PROJECTS LIST COMPONENT', () => {
    let wrapper;
    const projects = [];
    const getProjects = (): any => [];

    beforeEach(() => {
        wrapper = shallow(<ProjectsList projects={projects} getProjects={getProjects}/>)
    });

    it('+++ render the DUMB component', () => {
        expect(wrapper.length).toEqual(1)
    });
});
