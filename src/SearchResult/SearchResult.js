import React, { Component } from 'react';
import s from './SearchResult.css';

class SearchResult extends Component {
  getUrl = () => {
  const url = this.props.title.replace(/ /g, "_");
    return `https://ru.wikipedia.org/wiki/${url}`;
  }
    render() {
      return (
        <section className={s.SearchResult}>
          <h2 className={s.title}>
            <a href={this.getUrl()} target="_blank" rel="nofollow noopener">
              {this.props.title}
            </a>
          </h2>
          <p className={s.description} dangerouslySetInnerHTML={{__html: this.props.description}} />
        </section>
      );
    }
  }
  
  export default SearchResult;