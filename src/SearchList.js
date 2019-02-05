import React, { Component } from 'react';
import SearchResult from './SearchResult';
import s from './SearchList.css';

class SearchList extends Component {

    
render() {
    const searchResultsArray
    = this.props.result.map((result) =>
        <SearchResult
          title={result.title}
          description={result.description}
          link={result.link}
          key={result.link} />
      );
    return (
      <section className={s.SearchList}>
        {searchResultsArray}
      </section>
    );
}
}

export default SearchList;
