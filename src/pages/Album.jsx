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
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
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
              trackId={ element.trackId }
            />
          </section>
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  // match: PropTypes.string,
  match: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  params: PropTypes.string,
  id: PropTypes.string,
};

Album.defaultProps = {
  match: '',
  params: '',
  id: '',
};

export default Album;
