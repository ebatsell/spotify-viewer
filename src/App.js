import React, { Component } from 'react';
import { Header } from 'semantic-ui-react';
import logo from './images/logo.png';
import Content from './components/Content';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h3 className="App-title">Spotify</h3>
        </Header>
        <Content/>
      </div>
    );
  }
}

export default App;
