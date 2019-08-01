import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import Login from './Login';

describe('Login Component', () => {

    it('should have Login title', () => {
        const login = mount(<Login/>);
        const text = login.find('.loginTitle');
        expect(text).to.have.length(1);
    });

    it('should have user name field', () => {
        const login = mount(<Login/>);
        const text = login.find('.userName');
        expect(text).to.have.length(1);
    });

    it('should have password field', () => {
        const login = mount(<Login/>);
        const text = login.find('.password');
        expect(text).to.have.length(1);
    });

    it('should have Login button', () => {
        const login = mount(<Login/>);
        const btn =  login.find('.loginBtn');
        expect(btn).to.have.length(1);
    });

    it('by default, it is not errored out', () => {
        const login = mount(<Login/>);
        const text = login.find('.errMsg');
        expect(text).to.have.length(0);
    });

    it('it is errored out by setting the state', () => {
        const login = mount(<Login/>);
        login.setState({
            isError: true,
            errorMsg: 'Error Msg'
        })
        const errMsg = login.find('.errMsg');
        expect(errMsg).to.have.length(1);
        expect(errMsg.text()).to.equal('Error Msg');
    });
})