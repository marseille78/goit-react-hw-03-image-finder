import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleBackdropClick = (e) => {
    console.log(e.target);
    console.log(e.currentTarget);
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  }

  handleKeydown = (e) => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  }

  render() {

    const { src } = this.props;

    const body = (
      <div className={ css.overlay } onClick={ this.handleBackdropClick }>
        <div className={ css.modal }>
          <img src={ src } alt="" />
        </div>
      </div>
    );

    return createPortal(body, modalRoot);
  }
};

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
