import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';

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

  componentDidMount() {
    console.log('mudou DidMount');
  }

  componentDidUpdate() {
    console.log('update');
  }

  componentWillUnmount() {
    console.log('willUN');
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
        {loading ? <p>Carregando...</p>
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
                  type="button"
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
