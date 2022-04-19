import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      loading: false,
    };
  }

  addFavorite = async ({ target }) => {
    this.setState({
      checked: true,
      loading: true,
    });
    console.log(target.parentElement.parentElement.parentElement);
    console.log('clicou');
    await addSong(this.props);
    this.setState({
      loading: false,
    });
  }

  render() {
    const { musicName, previewUrl, trackId } = this.props;
    const { checked, loading } = this.state;
    return (

      <section>
        {loading ? <Loading /> : (
          <>
            <p>{musicName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              <code>audio</code>
              .
            </audio>
            <form>
              <label htmlFor="favorite">
                Favorita
                <input
                  name="favorite"
                  type="checkbox"
                  data-testid={ `checkbox-music-${trackId}` }
                  checked={ checked }
                  onChange={ this.addFavorite }
                />
              </label>
            </form>
          </>)}
      </section>
    );
  }
}

MusicCard.propTypes = {
  musicName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};

export default MusicCard;
