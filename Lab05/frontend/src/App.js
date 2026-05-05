import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { BiCameraMovie } from 'react-icons/bi';

import AddReview from './components/add-review';
import MoviesList from './components/movies-list';
import Movie from './components/movie';
import Login from './components/login';

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) { // default user to null
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div className="App">
      <Navbar expand="lg" className="navbar-custom">
        <Container>
          <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
            <span className="brand-icon"><BiCameraMovie /></span>
            Movie Reviews
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user ? (
                <Nav.Link className="nav-link-custom" onClick={logout}>
                  Logout ({user.name})
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/login" className="nav-link-custom nav-link-login">
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="main-content">
        <Switch>
          <Route exact path={["/", "/movies"]} component={MoviesList}>
          </Route>
          <Route path="/movies/:id/review" render={(props) =>
            <AddReview {...props} user={user} />
          }>
          </Route>
          <Route path="/movies/:id/" render={(props) =>
            <Movie {...props} user={user} />
          }>
          </Route>
          <Route path="/login" render={(props) =>
            <Login {...props} login={login} />
          }>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
