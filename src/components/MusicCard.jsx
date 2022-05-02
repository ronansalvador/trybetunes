import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import styles from './MusicCard.module.css';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = {
      checked: false,
      loading: false,
      // listFavorite: [],
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
    // this.setState({
    //   listFavorite,
    // });
  }

  /*  async componentDidUpdate() {
    console.log(this.props);
    await removeSong(this.props);
  } */

  addFavorite = async () => {
    const { getFavorite } = this.props;
    this.setState((prevState) => ({
      checked: !prevState.checked,
      loading: !prevState.loading,
    }));
    await addSong(this.props);
    this.setState((prevState) => ({
      loading: !prevState.loading,
    }));
    const { checked } = this.state;
    if (!checked) {
      removeSong(this.props);
      // console.log('apos remove');
      // window.location.reload(false);
    }
    if (typeof getFavorite === 'function') {
      getFavorite();
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    console.log(this.props);
    const { checked, loading } = this.state;
    // console.log(this.props);
    // console.log(listFavorite);
    return (

      <section className={ styles.musicCard }>
        {loading ? <Loading /> : (
          <>
            <p>{trackName}</p>
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
                  id="favorite"
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
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  getFavorite: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.string,
  ]),
};

MusicCard.defaultProps = {
  getFavorite: '',
};

export default MusicCard;
