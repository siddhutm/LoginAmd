import React from 'react';
import './SearchUser.scss';
import { get } from '../utils/apiBase';
import Debounce from '../utils/debounce';
import SearchResultTable from './SearchResultTable';
class SeachUser extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchKey: ''
        };
        this.searchNowDB = Debounce(this.searchNow, 2000);
    }

    onSearch = (e) => {
        const searchKey = e.target.value;
        this.setState({
            searchKey
        }, this.searchNowDB)
    }

    searchNow = () => {
        const { searchKey } = this.state;
        if(searchKey) {
            const url = `v60/admin/search/user?keyword=${searchKey}&alias=false`
            const searchPromise = get(url);
            searchPromise.then(results => {
                this.setState({
                    searchResults: results 
                })
            })
        } else {
            this.setState({
                searchResults: [] 
            })
        }
    }

    render() {
        const { searchKey, searchResults } = this.state;
        const tableProps = {
            searchKey,
            searchResults
        };
        const isSearchResAvailable = searchResults && searchResults.length;
        const SearchContainer = isSearchResAvailable ?
        <div key="st" className="searchResultContainer">
            <SearchResultTable { ...tableProps }/>
        </div> : null;

        return (
            [<div key="su" className="SearchUser">
                <h1>Search User</h1>
                <input className="search" value={searchKey} placeholder="Enter User Name" onChange={ this.onSearch }/>
                <button className="searchBtn" onClick={ this.searchNow }>Search</button>
            </div>,
            SearchContainer
            ]
        );
    }
}

export default SeachUser;