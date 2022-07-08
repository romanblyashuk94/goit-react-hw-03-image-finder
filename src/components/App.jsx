import React from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { fetchImages } from 'api/imagesAPI';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import SearchBar from './Searchbar/Searchbar';

export class App extends React.Component {
  state = {
    images: [],
    searchingTerm: '',
    page: 1,
    isLoading: false,
    selectedImage: null,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchingTerm !== this.state.searchingTerm) {
      this.fetchImagesBySearchingTerm();
    }

    if (prevState.page !== this.state.page) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  fetchImagesBySearchingTerm = () => {
    const { images, searchingTerm, page } = this.state;

    this.setState({ isLoading: true });

    fetchImages(searchingTerm, page)
      .then(({ hits }) => {
        if (hits.length > 0) {
          const fetchedImages = hits.map(image => ({
            id: image.id,
            webformatURL: image.webformatURL,
            largeImageURL: image.webformatURL,
          }));

          this.setState({
            images: [...images, ...fetchedImages],
            page: page + 1,
          });
        } else {
          Notify.failure('Images was not found :(');
        }
      })
      .catch(error => this.setState({ error: error.message }))
      .finally(() => this.setState({ isLoading: false }));
  };

  handleFormSubmit = searchingTerm => {
    this.setState({
      images: [],
      searchingTerm,
      page: 1,
    });
  };

  setSelectedImage = image => {
    this.setState({
      selectedImage: image,
    });
  };

  removeError = () => {
    this.setState({ error: null });
  };

  render() {
    const { isLoading, images, selectedImage, error } = this.state;

    return (
      <div className="app">
        <SearchBar onSubmit={this.handleFormSubmit} />
        {images.length > 0 && (
          <ImageGallery
            setSelectedImage={this.setSelectedImage}
            images={images}
          />
        )}
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button action={this.fetchImagesBySearchingTerm} label="LOAD MORE" />
        )}
        {selectedImage && (
          <Modal
            closeModal={() => this.setSelectedImage(null)}
            largeImageURL={selectedImage}
          />
        )}
        {error &&
          Report.failure('Error!', `${error}`, 'Okay', this.removeError)}
      </div>
    );
  }
}
