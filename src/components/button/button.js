import React from 'react';
import PropTypes from 'prop-types';
import css from './button.module.css';

const Button = ({ onLoadMore }) => {
  return (
    <button className={ css.button } type="button" onClick={ onLoadMore }>
      Load more
    </button>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func,
};

export default Button;
