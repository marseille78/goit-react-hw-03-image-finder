import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './searchbar.module.css';

class Searchbar extends Component {

  state = {
    value: ''
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { value } = this.state;

    if (value.trim().length < 2) return;

    this.props.onSubmit(this.transformRequestPhrase(value));
  }

  transformRequestPhrase = (phrase) => {
    return phrase.trim().replaceAll(/\s+/g, '+');
  }

  render() {
    const { value } = this.state;

    return (
      <header className={ css.searchbar }>
        <form className={ css.searchForm } onSubmit={ this.handleSubmit }>
          <button type="submit" className={ css.searchFormButton }>
            <i className="fa-sharp fa-solid fa-magnifying-glass" />
          </button>

          <input
            className={ css.searchFormInput }
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={ value }
            onChange={ this.handleChange }
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
