import { Component } from 'react';
import Searchbar from '../searchbar';
import css from './app.module.css';
import ImageGallery from '../image-gallery/image-gallery';

class App extends Component {

  state = {
    category: null
  }

  handleChangeCategory = (category) => {
    this.setState({ category });
  }

  render() {

    const { category } = this.state;

    return (
      <div className={css.app}>
        <Searchbar onSubmit={ this.handleChangeCategory } />

        <ImageGallery category={ category } />

      </div>
    );
  }
}

export default App;
