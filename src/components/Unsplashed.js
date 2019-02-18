import React, { Component } from 'react';
import Unsplash, { toJson } from 'unsplash-js';
import InfiniteScroll from 'react-infinite-scroll-component';
import Photo from './Photo';

const unsplash = new Unsplash({
  applicationId: process.env.REACT_APP_API_KEY,
  secret: process.env.REACT_APP_API_KEY_SECRET,
  callbackUrl: 'http://localhost:3000',
});

class Unsplashed extends Component {
  state = {
    photos: [],
    page: 1,
    perPage: 15,
  };

  async componentDidMount() {
    this.setState({ photos: await this.fetchPhotos() });
  }

  fetchPhotos = () => {
    const { page, perPage } = this.state;

    return unsplash.photos
      .listPhotos(page, perPage, 'latest')
      .then(toJson)
      .then(photos => photos);
  };

  fetchMore = async () => {
    const { photos } = this.state;
    this.setState(({ page }) => ({
      page: page + 1,
    }));

    this.setState({
      photos: [...photos, ...(await this.fetchPhotos())],
    });
  };

  render() {
    const { photos } = this.state;
    return (
      <InfiniteScroll
        dataLength={photos.length}
        next={this.fetchMore}
        loader={
          <img
            src="https://res.cloudinary.com/chuloo/image/upload/v1550093026/scotch-logo-gif_jq4tgr.gif"
            alt="loading"
          />
        }
        hasMore={true}
      >
        <div className="images">
          {photos.map((photo, i) => (
            <Photo photo={photo} key={i} />
          ))}
        </div>
      </InfiniteScroll>
    );
  }
}

export default Unsplashed;
