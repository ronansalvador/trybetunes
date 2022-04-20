import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      loading: false,
      listFavorite: [],
    };
  }

  async componentDidMount() {
    const { trackId } = this.props;
    const listFavorite = await getFavoriteSongs();
    const isfavorite = listFavorite.some((music) => music.trackId === trackId);
    if (isfavorite) {
      this.setState({
        checked: true,
      });
    }
    // console.log(this.props.trackId);
    // console.log(this.state.checked);
    this.setState({
      listFavorite,
    });
  }

  async componentDidUpdate() {
    await removeSong(this.props);
  }

  addFavorite = async () => {
    this.setState((prevState) => ({
      checked: !prevState.checked,
      loading: !prevState.loading,
    }));
    await addSong(this.props);
    this.setState((prevState) => ({
      loading: !prevState.loading,
    }));
  }

  render() {
    const { musicName, previewUrl, trackId } = this.props;
    const { checked, loading, listFavorite } = this.state;
    console.log(listFavorite);
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
