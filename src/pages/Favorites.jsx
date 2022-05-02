import React, { Component } from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
// import getMusics from '../services/musicsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      favoritas: [],
      test: false,
      loading: false,
    };
  }

  async componentDidMount() {
    await this.getFavorite();
    // const musics = await getMusics('726373144');
    // console.log(musics[0].trackName);
    /*  this.setState({ loading: true });
    const favoritas = await getFavoriteSongs();
    this.setState({
      favoritas,
      loading: false,
    }, () => this.verificaVazio()); */
  }

   getFavorite = async () => {
     this.setState({ loading: true });
     const favoritas = await getFavoriteSongs();
     console.log(favoritas);
     this.setState({
       favoritas,
       loading: false,
     });
   }

  verificaVazio = () => {
    const { favoritas } = this.state;
    if (favoritas.length < 1) {
      this.setState({
        test: true,
      });
    } else {
      this.setState({
        test: false,
      });
    }
  }

  render() {
    // console.log(this.props);
    const { favoritas, test, loading } = this.state;
    // console.log(favoritas);
    return (
      <div data-testid="page-favorites">
        <Header />
        {loading && <Loading /> }
        { test ? <span>Nenhuma musica favorita</span> : (
          <section>
            {favoritas.map((element, index) => (
              <section key={ index }>
                <MusicCard
                  trackName={ element.trackName }
                  previewUrl={ element.previewUrl }
                  trackId={ element.trackId }
                  getFavorite={ this.getFavorite }
                />
              </section>

            ))}
          </section>
        )}
      </div>
    );
  }
}

export default Favorites;
