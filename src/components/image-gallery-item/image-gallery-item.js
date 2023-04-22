import { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from '../modal';
import css from './image-gallery-item.module.css';

class ImageGalleryItem extends Component {

  state = {
    isVisibleModal: false
  }

  handleToggleModal = () => {
    this.setState(state => ({
      isVisibleModal: !state.isVisibleModal
    }));
  }

  render() {

    const { isVisibleModal } = this.state;
    const { webformatURL, largeImageURL } = this.props;

    return (
      <li className={ css.imageGalleryItem }>
        <img className={ css.imageGalleryItemImage } src={ webformatURL } onClick={ this.handleToggleModal } alt="" />
        { isVisibleModal && <Modal src={ largeImageURL } onClose={ this.handleToggleModal } /> }
      </li>
    );
  }
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
