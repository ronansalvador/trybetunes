import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
// iniciando o projeto

class App extends React.Component {
  render() {
    return (
      <div>
        <p>TrybeTunes</p>
        <Switch>
          <Route path="/" component={ Login } exact />
          <Route path="/search" component={ Search } exact />
          <Route path="/album/:id" component={ Album } />
          {/* <Route path="/favorites" component={ Favorites } exact /> */}
          <Route
            path="/favorites"
            render={ (props) => (
              <Favorites { ...props } />
            ) }
          />
          <Route path="/profile" component={ Profile } exact />
          <Route
            path="/profile/edit"
            render={ (props) => (<ProfileEdit { ...props } />) }
          />
          <Route path="*" component={ NotFound } exact />
        </Switch>
      </div>
    );
  }
}

export default App;
