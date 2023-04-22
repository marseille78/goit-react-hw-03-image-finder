import PropTypes from 'prop-types';
import ImageGalleryItem from '../image-gallery-item';
import css from './image-gallery.module.css';

const ImageGalleryResolveView = ({ imageList }) => {

  const list = imageList.map(({ id, ...data }) => {
    return <ImageGalleryItem key={id} {...data} />;
  });

  return (
    <ul className={css.imageGallery}>
      { list }
    </ul>
  );
};

ImageGalleryResolveView.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.object),
};

export default ImageGalleryResolveView;
