import React, { Component } from 'react';
import './SearchResult.css';

class SearchResult extends Component {
    render() {
      return (
        <section className="SearchResult">
          <h2 className="title">
            <a href={this.props.link} target="_blank" rel="nofollow noopener">
              {this.props.title}
            </a>
          </h2>
          <p className="description">
            {this.props.description}
          </p>
        </section>
      );
    }
  }
  
  export default SearchResult;