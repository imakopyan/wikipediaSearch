import React, { Component } from 'react';
import './SearchBar.css';

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleSearchSubmit(event) {
        event.preventDefault();
        this.props.onSearchSubmit();
    }

    handleSearchChange(event) {
        this.props.onSearchChange(event.target.value);
      }

    render() {
        return (
            <div className="SearchBar">
                <h1>Wikipedia Search</h1>
                <form onSubmit={this.handleSearchSubmit}>
                    <input
                        type="text"
                        placeholder="Введите запрос"
                        autoFocus
                        onChange={this.handleSearchChange} />
                    <button className="SearchBar-btn">
                    Поиск
                    </button>
                </form>
            </div>
        );
    }
}

export default SearchBar;