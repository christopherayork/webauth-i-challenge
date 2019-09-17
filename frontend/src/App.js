import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
      <nav>
        <NavLink to='/register'>Register</NavLink>
        <NavLink to='/login'>Login</NavLink>
      </nav>
      <Route exact path='/' component={Home} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/login' component={Login} />
    </div>
  );
}

export default App;
