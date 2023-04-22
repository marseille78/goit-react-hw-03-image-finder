import { Component } from 'react';
import PropTypes from 'prop-types';
import ApiService from '../../services/api-service';
import ImageGalleryIdleView from './image-gallery-idle-view';
import Loader from '../loader';
import ImageGalleryResolveView from './image-gallery-resolve-view';
import Button from '../button';
import ImageGalleryErrorView from './image-gallery-error-view';

const apiService = new ApiService();

const IDLE = 'idle';
const PENDING = 'pending';
const REJECTED = 'rejected';
const RESOLVED = 'resolved';

class ImageGallery extends Component {

  state = {
    activePage: 1,
    status: IDLE,
    response: [],
    isLoading: false,
    category: null
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const prevCategory = prevProps.category;
    const nextCategory = this.props.category;
    const prevPage = prevState.activePage;
    const nextPage = this.state.activePage;
    const { status, activePage } = this.state;

    if (prevCategory !== nextCategory || prevPage !== nextPage) {
      this.setState({ status: PENDING });
      try {
        const { totalHits, hits: response } = await apiService.getResource(nextCategory, activePage);

        if (prevCategory !== nextCategory) {
          this.setState({
            response,
            activePage: 1,
            status: RESOLVED,
          });
        }

        if (prevPage !== nextPage && nextPage !== 1) {
          this.setState(state => ({
            response: [...state.response, ...response],
            activePage: state.activePage + 1,
            status: RESOLVED,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  handleLoadMore = () => {
    this.setState(state => ({
      activePage: state.activePage + 1
    }));
  }

  render() {
    const { status, response } = this.state;

    if (status === IDLE) {
      return <ImageGalleryIdleView />;
    }

    if (status === PENDING) {
      return <Loader />;
    }

    if (status === RESOLVED) {
      return (
        <>
          <ImageGalleryResolveView imageList={ response } />
          <Button onLoadMore={ this.handleLoadMore } />
        </>
      );
    }

    if (status === REJECTED) {
      return <ImageGalleryErrorView />;
    }
  }
}

ImageGallery.propTypes = {
  category: PropTypes.string,
};

export default ImageGallery;
