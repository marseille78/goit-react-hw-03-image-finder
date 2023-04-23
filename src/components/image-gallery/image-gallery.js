import PropTypes from 'prop-types';
import ImageGalleryItem from '../image-gallery-item';
import css from './image-gallery.module.css';

const ImageGallery = ({ dataList }) => {
  const list = dataList.map(({ id, ...data }) => {
    return <ImageGalleryItem key={ id } { ...data } />;
  });

  return (
    <ul className={ css.imageGallery }>
      { list }
    </ul>
  );
}

ImageGallery.propTypes = {
  datalist: PropTypes.arrayOf(PropTypes.object),
};

export default ImageGallery;
