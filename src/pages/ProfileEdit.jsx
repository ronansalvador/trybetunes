import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import styles from './ProfileEdit.module.css';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      descriptionSaved: '',
      emailSaved: '',
      imageSaved: '',
      nameSaved: '',
      isDisabled: true,
    };
  }

  async componentDidMount() {
    const { description, email, image, name } = await getUser();
    this.setState({
      loading: false,
      descriptionSaved: description,
      emailSaved: email,
      imageSaved: image,
      nameSaved: name,
    });
  }

  changeProfile = ({ target }) => {
    const { name } = target;
    this.setState({
      [name]: target.value,
    }, () => this.buttonVerify());
  }

  buttonVerify = () => {
    const { descriptionSaved, emailSaved, imageSaved, nameSaved } = this.state;
    if (nameSaved !== ''
    && emailSaved !== '' && imageSaved !== '' && descriptionSaved !== '') {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  saveUser = async () => {
    const { descriptionSaved, emailSaved, imageSaved, nameSaved } = this.state;
    const { history } = this.props;
    const userUpdate = { name: nameSaved,
      email: emailSaved,
      image: imageSaved,
      description: descriptionSaved };
    this.setState({
      loading: true,
    });
    await updateUser(userUpdate);
    history.push('/profile');
    this.setState({
      loading: false,
    });
  }

  render() {
    const { loading,
      descriptionSaved,
      emailSaved, imageSaved, nameSaved, isDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <section className={ styles.container }>
          <h1>ProfileEdit</h1>
          <form>
            <label htmlFor="name-user">
              Nome
              <input
                data-testid="edit-input-name"
                type="text"
                id="name-user"
                name="nameSaved"
                value={ nameSaved }
                onChange={ this.changeProfile }
              />
            </label>
            <br />
            <label htmlFor="email-user">
              E-mail
              <input
                data-testid="edit-input-email"
                type="email"
                id="email-user"
                name="emailSaved"
                value={ emailSaved }
                onChange={ this.changeProfile }
              />
              <br />
            </label>
            <label htmlFor="description-user">
              Descrição
              <textarea
                data-testid="edit-input-description"
                id="description-user"
                name="descriptionSaved"
                value={ descriptionSaved }
                onChange={ this.changeProfile }
              />
              <br />
            </label>
            <label htmlFor="image-user">
              Alterar Imagem
              <input
                data-testid="edit-input-image"
                type="text"
                id="image-user"
                name="imageSaved"
                value={ imageSaved }
                onChange={ this.changeProfile }
              />
              <br />
            </label>
            <button
              data-testid="edit-button-save"
              type="button"
              disabled={ isDisabled }
              onClick={ this.saveUser }
            >
              Editar perfil
            </button>
            {/* {redirect && <Redirect to="/profile" />} */}
          </form>
        </section>
        {loading && <Loading />}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  // match: PropTypes.string,
  history: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]).isRequired,
};

export default ProfileEdit;
