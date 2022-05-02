import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import styles from './Album.module.css';

class Album extends Component {
  constructor() {
    super();
    this.state = {
      musicas: [],
      artistName: '',
      collectionName: '',
      artworkUrl100: '',

    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({
      musicas: musics,
      artistName: musics[0].artistName,
      collectionName: musics[0].collectionName,
      artworkUrl100: musics[0].artworkUrl100,
    });
  }

  render() {
    const { musicas, artistName, collectionName, artworkUrl100 } = this.state;
    const tracks = musicas.filter((element) => element.kind === 'song');
    return (
      <div data-testid="page-album">
        <Header />
        <div className={ styles.album }>
          <section className={ styles.albumInfo }>
            <img src={ artworkUrl100 } alt="imagem no album" />
            <h2 data-testid="album-name">{collectionName}</h2>
            <h3 data-testid="artist-name">{artistName}</h3>
          </section>
          <div>
            {tracks.map((element, index) => (
              <section key={ index } className={ styles.music }>
                <MusicCard
                  trackName={ element.trackName }
                  previewUrl={ element.previewUrl }
                  trackId={ element.trackId }
                />
              </section>
            ))}
          </div>
        </div>
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
