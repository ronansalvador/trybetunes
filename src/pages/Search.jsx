import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import './search.css';

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
        <Header />
        {loading ? <Loading /> : (
          <form>
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
          </form>)}
        {result.length > 0
          && (
            <div>
              <p>
                { `Resultado de álbuns de: ${buscado}` }
              </p>
              <section className="albuns">
                {result.map((element, index) => (
                  <div key={ index } className="album">
                    <Link
                      to={ `/album/${element.collectionId}` }
                      data-testid={ `link-to-album-${element.collectionId}` }
                      className="link-album"
                    >
                      <img
                        src={ element.artworkUrl100 }
                        alt={ `imagem do album ${element.collectionName}` }
                      />
                      <p>{element.collectionName}</p>
                      <p>{ element.artistName }</p>
                    </Link>
                  </div>))}
              </section>
            </div>)}
        {(result.length < 1 && buscado.length > 0)
          && (
            <div>
              <p>Nenhum álbum foi encontrado</p>
            </div>)}
      </div>
    );
  }
}

export default Search;
