import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = {
      busca: '',
      button: true,

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

  render() {
    const { busca, button } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            placeholder="Pesquisa"
            value={ busca }
            onChange={ this.inputSearch }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            value="Nome"
            onClick={ () => console.log('button searsh') }
            disabled={ button }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
