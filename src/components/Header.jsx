import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import styles from './Header.module.css';
import logoHeader from '../images/logo_header.svg';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      loading: false,
    };
  }

  componentDidMount() {
    this.user();
  }

  user = async () => {
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
      <div>
        { loading ? <Loading />
          : (
            <section>
              <header data-testid="header-component">
                <div className={ styles.header }>
                  <Link to="/">
                    <img src={ logoHeader } alt="logo trybeTune" />
                  </Link>

                  <p
                    data-testid="header-user-name"
                    className={ styles.userName }
                  >
                    {user.name}
                  </p>

                </div>

              </header>
              <nav>
                <ul>
                  <li>
                    <Link to="/search" data-testid="link-to-search">Search</Link>
                  </li>
                  <li>
                    <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
                  </li>
                  <li>
                    <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
                  </li>
                </ul>
              </nav>
            </section>
          )}
      </div>
    );
  }
}

export default Header;
