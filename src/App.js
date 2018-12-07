import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// Components
import UserData from './UserData.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Alex Patton Code Test</h1>
        <UserData />
      </div>
    );
  }
}

export default App;
