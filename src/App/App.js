import React, { Component } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchList from '../SearchList/SearchList';
import Dropdown from '../Dropdown/Dropdown';
import preloader from '../preloader.svg';

import s from './App.css';

const optionList = [
  { id: 1, title: 'По релевантности' },
  { id: 2, title: 'А-Я' },
  { id: 3, title: 'Я-А' },
  { id: 4, title: 'Самая свежая статья' },
  { id: 5, title: 'Самая старая статья' },

];

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: '',
      submit: false,
      searchResults: [],
      sortType: 1,
      isLoading: false,
      hasError: false,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }


  handleSearch() {
    this.setState({
      isLoading: true,
      hasError: false,
    });
    const url = `https://ru.wikipedia.org/w/api.php?action=query&origin=*&list=search&prop=info&inprop=url&utf8=&format=json&srlimit=25&srsearch=${encodeURIComponent(this.state.searchQuery)}`;

    Promise.resolve(fetch(url, {cache: 'no-cache'}))
    .then((response) => {
      if (!response.ok) throw new Error('Error');
      return response.json();
    })
    .then((searchResults) => {
      this.setState({searchResults : searchResults.query.search, isLoading: false, hasError: searchResults.query.search.length<1});
    })
    .catch((e) =>  this.setState ({ isLoading: false, hasError: true}));
  }
  
  error = () =>  {
    if (this.state.searchResults.length === 0) {
      this.setState ({ hasError: true}) // ???
     };
  }

  handleChange(searchQuery) {
    this.setState({
      searchQuery,
    })
  }

  handlerSelect = (id) => {
    this.setState({
    sortType: Number(id),
  });
  }

  render() {
    let newArray;
    if (this.state.sortType === 2) {
      newArray =  this.state.searchResults.slice().sort((a,b) =>  {
      if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    } else if (this.state.sortType === 3) {
      newArray =  this.state.searchResults.slice().sort((a,b) =>  {
          if (b.title < a.title) {
              return -1;
            }
            if (b.title > a.title) { 
              return 1;
            }
            return 0;
          });
    } else if (this.state.sortType === 5) {
      newArray = this.state.searchResults.slice().sort((a,b) =>  {
      if (a.timestamp < b.timestamp) {
          return -1;
        }
        if (a.timestamp > b.timestamp) {
          return 1;
        }
        return 0;
      });
    } else if (this.state.sortType === 4) {
      newArray =   this.state.searchResults.slice().sort((a,b) =>  {
      if (a.timestamp > b.timestamp) {
          return -1;
        }
        if (a.timestamp < b.timestamp) {
          return 1;
        }
        return 0;
      });
    } 
      return (
      <div className={s.app}>
        <header className={s.appHeader}>
        <h1>Wikipedia Search</h1>
        </header>
        <div>
        <div className={s.bar}>
        <SearchBar 
        onSearchSubmit={this.handleSearch}
        onSearchChange={this.handleChange}
      />
              <div className={s.filter}>
        <Dropdown
          optionList={optionList}
          onChange={this.handlerSelect}
        />
        </div>
        </div>
      <div className={s.list}>
      {this.state.isLoading ? (
        <div className={s.preloader}>
              <img src={preloader} alt='preloder'/>
        </div>
      ): (
    <SearchList
    result={newArray || this.state.searchResults } />
      )}
       {this.state.hasError & !this.state.isLoading ? (
       <p className={s.error}>Ничего не найдено</p>
       ): ('')}
       </div>
       </div>
      </div>
    );
  }
}

export default App;
