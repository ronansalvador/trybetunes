import React, { Component } from 'react';
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
      </header>
    );
  }
}

export default Header;
