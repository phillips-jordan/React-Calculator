import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Keys from './components/keys.js'
import Nav from './components/nav.js'

class App extends Component {
  render() {
    return (<div>
      <Nav/>
      <Keys/>
      </div>
    );
  }
}

export default App;
