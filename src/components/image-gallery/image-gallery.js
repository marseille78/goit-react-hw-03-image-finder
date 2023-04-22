import { Component } from 'react';
import PropTypes from 'prop-types';
import { apiService } from '../../services/api-service';
import ImageGalleryIdleView from './image-gallery-idle-view';
import ImageGalleryResolveView from './image-gallery-resolve-view';
import ImageGalleryErrorView from './image-gallery-error-view';
import Loader from '../loader';
import Button from '../button';

const IDLE = 'idle';
const PENDING = 'pending';
const REJECTED = 'rejected';
const RESOLVED = 'resolved';

class ImageGallery extends Component {

  state = {
    activePage: 1,
    status: IDLE,
    response: [],
    error: null,
    totalHits: null,
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const prevCategory = prevProps.category;
    const nextCategory = this.props.category;
    const prevPage = prevState.activePage;
    const nextPage = this.state.activePage;

    const { activePage } = this.state;

    if (prevCategory !== nextCategory || (prevPage !== nextPage && nextPage !== 1)) {
      this.setState({ status: PENDING });

      try {
        if (prevCategory !== nextCategory) {
          const { hits, totalHits } = await apiService.getResource(nextCategory, 1);

          this.setState({
            response: hits,
            activePage: 1,
            status: RESOLVED,
            error: null,
            totalHits,
          });
        }

        if (prevPage !== nextPage && nextPage !== 1) {
          const { hits } = await apiService.getResource(nextCategory, activePage);

          this.setState(state => ({
            response: [...state.response, ...hits],
            status: RESOLVED,
            error: null,
          }));
        }
      } catch (error) {
        this.setState({ error })
      }
    }
  }

  handleLoadMore = () => {
    this.setState(state => ({
      activePage: state.activePage + 1,
    }));
  }

  render() {
    const { status, response, error, totalHits } = this.state;

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
          {
            (response.length !== totalHits && response.length !== 0) &&
            <Button onLoadMore={ this.handleLoadMore } />
          }
        </>
      );
    }

    if (status === REJECTED) {
      return <ImageGalleryErrorView message={ error.message } />;
    }
  }
}

ImageGallery.propTypes = {
  category: PropTypes.string,
};

export default ImageGallery;
