import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

import SearchUser from './SearchUser';


describe('Search User', () => {

    it('should have Search User Label', () => {
        const searchUser = mount(<SearchUser/>);
        const searchLbl = searchUser.find('h1');
        expect(searchLbl.text()).to.equal('Search User');
    })

    it('should have search field', () => {
        const searchUser = mount(<SearchUser/>);
        const searchField = searchUser.find('.search');
        expect(searchField).to.have.length(1);
    });

    it('should have search button', () => {
        const searchUser = mount(<SearchUser/>);
        const searchBtn = searchUser.find('.searchBtn');
        expect(searchBtn).to.have.length(1);
    });

    it('initially, search results are empty', () => {
        const searchUser = mount(<SearchUser/>);
        expect(searchUser.find('.searchResultContainer')).to.have.length(0);
    });

    it('search results are set now', () => {
        const searchUser = mount(<SearchUser/>);
        searchUser.setState({
            searchResults: [{attributes:[], username: 'sid', displayName: 'sid', status: 'actove'}]
        });
        expect(searchUser.find('.searchResultContainer')).to.have.length(1);
    });
})