import React, { Component } from 'react';
import styles from './Loading.module.css';

class Loading extends Component {
  render() {
    return (
      <div className={ styles.loading }>
        <p>Carregando...</p>
      </div>
    );
  }
}

export default Loading;
