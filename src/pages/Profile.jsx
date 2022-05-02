import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';
import styles from './Profile.module.css';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      descriptionSaved: '',
      emailSaved: '',
      imageSaved: '',
      nameSaved: '',
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

  render() {
    const { loading, descriptionSaved, emailSaved, imageSaved, nameSaved } = this.state;
    return (

      <div data-testid="page-profile">
        { loading && <Loading /> }
        <Header />
        <section className={ styles.container }>
          <img src={ imageSaved } alt="imagem de perfil" data-testid="profile-image" />
          <h3>Nome</h3>
          <p className={ styles.conteudo }>{nameSaved}</p>
          <h3>E-mail</h3>
          <p className={ styles.conteudo }>{emailSaved}</p>
          <h3>Descrição</h3>
          <p className={ styles.conteudo }>{descriptionSaved}</p>
          <Link to="/profile/edit" className={ styles.editbutton }>
            Editar perfil
          </Link>
        </section>

      </div>
    );
  }
}

export default Profile;
