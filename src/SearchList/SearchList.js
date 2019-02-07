import React, { Component } from 'react';
import SearchResult from '../SearchResult/SearchResult';
import s from './SearchList.css';

class SearchList extends Component {
render() {
    const searchResultsArray
    = this.props.result.map((result) =>
        <SearchResult
          title={result.title}
          description={result.snippet}
          key={result.pageid} />
      );
    return (
      <section className={s.searchList}>
        {searchResultsArray}
      </section>
    );
}
}

export default SearchList;
