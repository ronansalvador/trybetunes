import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loading: false,
    };
  }

  async componentDidMount() {
    console.log('esta sendo montado');

    this.setState({
      loading: true,
    });
    const usuario = await getUser();
    this.setState({
      user: usuario,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;
    return (

      <header data-testid="header-component">
        { loading ? <Loading />
          : <p data-testid="header-user-name">{user.name}</p> }
        <Link to="/search" data-testid="link-to-search">Search</Link>
        <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
        <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
      </header>
    );
  }
}

export default Header;
