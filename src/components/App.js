import React from 'react';
import Signup from './authentification/Signup';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './authentification/Login';
import PrivateRoute from './authentification/PrivateRoute'
import ForgotPassword from './authentification/ForgotPassword'
import UpdateProfile from './authentification/UpdateProfile';
import Game from './Game';
import GameOptions from './GameOptions'

function App() {
  return (
  
    <Container 
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh"}}
    >
      <div className="w-100" syle={{ maxWidth: "400px"}}>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <PrivateRoute path="/game-options" component={GameOptions} />
              <PrivateRoute path="/game" component={Game} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  
  )
}

export default App;
