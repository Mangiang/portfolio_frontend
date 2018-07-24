// @flow

import React from 'react'
import {shallow} from 'enzyme';

import {HeaderComponent} from '../../src/components/Other/HeaderComponent'

// Snapshot for MyHeaderComponent React Component
describe('>>> HEADER COMPONENT', () => {
    let wrapper;
    const currentPage = "The current page";
    const history = {};
    const requestNavigation = () => "requestNavigation";

    beforeEach(() => {
        wrapper = shallow(<HeaderComponent currentPage={""} history={{}} requestNavigation={() => "toto"}/>)
    });

    describe('--- Snapshot', () => {
        it('+++capturing Snapshot of MyHeaderComponent', () => {
            expect(wrapper).toMatchSnapshot();
        });
    });
});
