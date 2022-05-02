import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import styles from './Search.module.css';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      busca: '',
      buscado: '',
      button: true,
      loading: false,
      result: [],

    };
  }

  inputSearch = ({ target }) => {
    this.setState({
      busca: target.value,
    }, () => {
      this.buttonCheck();
    });
  }

  buttonCheck = () => {
    const { busca } = this.state;
    if (busca.length > 1) {
      this.setState({
        button: false,
      });
    } else {
      this.setState({
        button: true,
      });
    }
  }

  pesquisar = async () => {
    const { busca } = this.state;
    this.setState({
      loading: true,
    });
    const retorno = await searchAlbumsAPI(busca);
    this.setState((prevstate) => ({
      busca: '',
      buscado: prevstate.busca,
      loading: false,
      result: retorno,
    }));
  }

  render() {
    const { busca, button, loading, result, buscado } = this.state;
    return (
      <div data-testid="page-search">
        {loading ? <Loading /> : (
          <section>
            <Header />
            <form className={ styles.search }>
              <input
                type="text"
                data-testid="search-artist-input"
                placeholder="Pesquisa"
                value={ busca }
                onChange={ this.inputSearch }
              />
              <button
                type="submit"
                data-testid="search-artist-button"
                value="Nome"
                onClick={ this.pesquisar }
                disabled={ button }
              >
                Pesquisar
              </button>
            </form>
          </section>)}
        {result.length > 0
          && (
            <div className={ styles.results }>
              <h2>
                { `Resultado de álbuns de: ${buscado}` }
              </h2>
              <section className={ styles.albuns }>
                {result.map((element, index) => (
                  <div key={ index } className={ styles.album }>
                    <Link
                      to={ `/album/${element.collectionId}` }
                      data-testid={ `link-to-album-${element.collectionId}` }
                      className={ styles.linkAlbum }
                    >
                      <img
                        src={ element.artworkUrl100 }
                        alt={ `imagem do album ${element.collectionName}` }
                      />
                      <p className={ styles.albunName }>{element.collectionName}</p>
                      <p className={ styles.artistName }>{ element.artistName }</p>
                    </Link>
                  </div>))}
              </section>
            </div>)}
        {(result.length < 1 && buscado.length > 0)
          && (
            <div className={ styles.results }>
              <h2>Nenhum álbum foi encontrado</h2>
            </div>)}
      </div>
    );
  }
}

export default Search;
