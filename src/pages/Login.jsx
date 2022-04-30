import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      button: true,
      loading: false,
      redirect: false,
    };
  }

  inputName = ({ target }) => {
    this.setState({
      name: target.value,
    }, () => {
      this.buttonCheck();
    });
  }

  buttonCheck = () => {
    const { name } = this.state;
    if (name.length > 2) {
      this.setState({
        button: false,
      });
    } else {
      this.setState({
        button: true,
      });
    }
  }

  testeChamada = async () => {
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    await createUser({ name });
    this.setState({
      redirect: true,
    });
  }

  render() {
    const { name, button, loading, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/search" />;
    }
    return (

      <div data-testid="page-login">
        {loading ? <Loading />
          : (
            <section>
              <h1>Login</h1>
              <form>
                <input
                  type="text"
                  data-testid="login-name-input"
                  placeholder="User"
                  value={ name }
                  onChange={ this.inputName }
                />
                <button
                  type="submit"
                  data-testid="login-submit-button"
                  value="Nome"
                  // onClick={ async () => { await createUser(this.state); } }
                  onClick={ this.testeChamada }
                  disabled={ button }
                >
                  Entrar
                </button>
              </form>
            </section>)}
      </div>
    );
  }
}

export default Login;
