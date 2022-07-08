import React from 'react';
import s from './Searchbar.module.css';
class SearchBar extends React.Component {
  state = {
    currentSearchQuery: '',
  };

  onSearchInputChange = e => {
    this.setState({ currentSearchQuery: e.target.value });
  };

  onSubmitForm = e => {
    e.preventDefault();

    if (this.state.currentSearchQuery) {
      this.props.onSubmit(this.state.currentSearchQuery);
    }

    this.setState({ currentSearchQuery: '' });
  };

  render() {
    return (
      <header className={s.searchbar}>
        <form className={s.searchForm} onSubmit={this.onSubmitForm}>
          <button type="submit" className={s.searchFormButton}>
            <span className={s.searchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.searchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.currentSearchQuery}
            onChange={this.onSearchInputChange}
          />
        </form>
      </header>
    );
  }
}

export default SearchBar;
