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
    console.log(musics.filter((element) => element.kind === 'song'));
    this.setState({
      musicas: musics,
      artistName: musics[0].artistName,
      collectionName: musics[0].collectionName,
    });
  }

  render() {
    const { musicas, artistName, collectionName } = this.state;
    const tracks = musicas.filter((element) => element.kind === 'song');
    return (
      <div data-testid="page-album">
        <Header />
        Album
        <p data-testid="artist-name">{artistName}</p>
        <p data-testid="album-name">{collectionName}</p>
        {tracks.map((element, index) => (
          <section key={ index }>
            <MusicCard
              musicName={ element.trackName }
              previewUrl={ element.previewUrl }
            />
          </section>
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Album;
