import React from 'react';

import './SearchResultTable.scss'

const ColumnComponent = (props) => {
    return (

        <div className="headerColumn">
            <div className="userName columnItem">Username</div>
            <div className="name columnItem">Name</div>
            <div className="status columnItem">Status</div>
        </div>

    )
}

const RowComponent = (props) => {
    const { username, displayName, status, attributes } = props;

    const parentalInfo = attributes.find(a => a.name === 'user.ParentalRatingId');
    const isParentIdLessThan50 = parentalInfo && parentalInfo.value <= 50;
    const rowClasses = `rowItem${isParentIdLessThan50 ? ' warning' : ''}`;

    return (
        <div className={ rowClasses }>
            <div className="userName userNameVal columnItem">{ username }</div>
            <div className="name nameVal columnItem">{ displayName }</div>
            <div className="status statusVal columnItem">{ status }</div>
        </div>
    );

}

const Paginator = (props) => {
    const { size, totalLength, onClick, currentPage } = props;
    const pages = Math.ceil(totalLength/size);
    let pageNumbers = [];
    for(let i=1; i<= pages; i++) {
        pageNumbers.push(<a key={ i } className={`pageLink ${currentPage === i ? 'currentPage' : ''}`} onClick={ onClick.bind(this, i)  }>{i}</a>)
    }

    return (
        <div className="paginator">
            { pageNumbers }
        </div>
    );
}

class SearchResultTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            pageSize: 5
        };
    }

    onPaginatorClick = (pageNumber) => {
        this.setState({
            currentPage: pageNumber
        });
    }

    render() {
        const { searchKey, searchResults } = this.props;
        const { pageSize, currentPage } = this.state;
        const paginatorProps = {
            size: pageSize,
            totalLength: searchResults.length,
            onClick: this.onPaginatorClick,
            currentPage
        }
        const startIndex = (currentPage - 1) * pageSize;
        const paginatedResults = searchResults.slice(startIndex, startIndex + pageSize);

        return (
            <div className="SearchResultTable">
                <div className="searchResLbl">Search Result for: <span className="searchKey">{ searchKey }</span></div>
                <h2>Users</h2>
                <div className="table">
                    <ColumnComponent/>
                    { paginatedResults.map(s => <RowComponent key={ s.username } { ...s }/>)  }
                </div>
                <Paginator { ...paginatorProps }/>
            </div>    
        )
    }
}

export default SearchResultTable;