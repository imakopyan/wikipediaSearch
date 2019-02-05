import React, { Component } from 'react';
import SearchBar from './SearchBar';
import SearchList from './SearchList';
import parseJson from './parseJson';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      submit: false,
      searchResults: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }


  handleSearch() {
    const url = `https://ru.wikipedia.org/w/api.php?action=opensearch&origin=*&format=json&formatversion=2&search=${encodeURIComponent(this.state.searchQuery)}`;
    Promise.resolve(fetch(url, {cache: 'no-cache'}))
    .then((response) => {
      if (!response.ok) throw new Error('Error');
      return response.json();
    })
    .then(parseJson)
    .then((searchResults) => this.setState({searchResults, isLoading: false}))
    .catch((e) => this.setState({isLoading: false, hasError: true}));
  }
  
  handleChange(searchQuery) {
    this.setState({
      searchQuery,
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
      <SearchBar 
        onSearchSubmit={this.handleSearch}
        onSearchChange={this.handleChange}
      />
      <SearchList
      result={this.state.searchResults} />
        </header>
      </div>
    );
  }
}

export default App;
