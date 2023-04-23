import React, { Component } from 'react';
import Searchbar from '../searchbar';
import css from './app.module.css';
import ImageGallery from '../image-gallery/image-gallery';
import { apiService } from '../../services/api-service';
import Loader from '../loader';
import Button from '../button';

const IDLE = 'idle';
const PENDING = 'pending';
const REJECTED = 'rejected';
const RESOLVED = 'resolved';

class App extends Component {

  state = {
    category: '',
    activePage: 1,
    status: IDLE,
    response: [],
    error: null,
    totalHits: null,
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    const prevCategory = prevState.category;
    const nextCategory = this.state.category;
    const prevPage = prevState.activePage;
    const nextPage = this.state.activePage;

    const { activePage } = this.state;

    if (prevCategory !== nextCategory) {
      this.setState({ status: PENDING });

      try {
        const { hits, totalHits } = await apiService.getResource(nextCategory, 1);

        this.setState({
          response: hits,
          activePage: 1,
          status: RESOLVED,
          error: null,
          totalHits,
        });
      } catch (error) {
        this.setState({ error });
      }
    }

    if (prevPage !== nextPage && nextPage !== 1) {
      try {
        const { hits } = await apiService.getResource(nextCategory, activePage);

        this.setState(state => ({
          response: [...state.response, ...hits],
          status: RESOLVED,
          error: null,
        }));
      } catch (error) {
        this.setState({ error });
      }
    }
  }

  handleChangeCategory = (category) => {
    this.setState({ category });
  }

  handleLoadMore = () => {
    this.setState(state => ({
      activePage: state.activePage + 1,
    }));
  }

  render() {

    const { status, response, totalHits, error } = this.state;

    const imageGalleryIdleView = () => (
      <div>
        <h2>Enter category, please</h2>
      </div>
    );

    const imageGalleryErrorView = (message) => (
      <div>
        <h2>{ message }</h2>
      </div>
    );

    return (
      <div className={css.app}>
        <Searchbar onSubmit={ this.handleChangeCategory } />

        { status === IDLE && imageGalleryIdleView() }
        { status === PENDING && <Loader /> }
        { status === RESOLVED && <ImageGallery dataList={ response } /> }
        { status === REJECTED && imageGalleryErrorView(error.message) }

        {
          (status === RESOLVED && response.length !== totalHits && response.length !== 0) &&
          <Button onLoadMore={ this.handleLoadMore } />
        }

      </div>
    );
  }
}

export default App;
