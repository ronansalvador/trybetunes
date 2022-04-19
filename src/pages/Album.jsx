import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicas: [],
      artistName: '',
      collectionName: '',

    };
  }

  async componentDidMount() {
    const { history } = this.props;
    const id = history.location.pathname;
    const albumId = id.replace(/[^0-9]/g, '');
    const musics = await getMusics(albumId);
    const info = musics.find((element) => element.wrapperType === 'collection');
    const tracks = musics.filter((element) => element.wrapperType === 'track');
    this.setState({
      musicas: tracks,
      artistName: info.artistName,
      collectionName: info.collectionName,
    });
  }

  render() {
    const { musicas, artistName, collectionName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{artistName}</p>
        <p data-testid="album-name">{collectionName}</p>
        {musicas.map((element, index) => (
          <div key={ index }>
            <MusicCard
              musicName={ element.trackName }
              previewUrl={ element.previewUrl }
            />
          </div>
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  history: PropTypes.shape.isRequired,
};

export default Album;
