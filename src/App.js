import React, { Component} from 'react';
import { Button, Header, Container } from 'semantic-ui-react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch,
  withRouter
} from 'react-router-dom';
import logo from './images/logo.png';
import Content from './components/Content';
import './App.css';

function encodeQueryData(data) {
  let ret = [];
  for (let d in data)
    ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
  return ret.join('&');
}

const q = {
  client_id: '2325bcb50f0d48a0b410908c63ec2468',
  response_type: 'token',
  redirect_uri: 'http://localhost:3000/callback',
  scope: 'user-top-read'
  //state: someState (optional)
}
const url = 'https://accounts.spotify.com/authorize?' + encodeQueryData(q);

const login = () => <Button secondary> <a href={url}>LOG IN</a></Button>;


class Body extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
      route: '',
    };
  }

  componentWillMount() {
    if (document.location.pathname.length > 7) {
      this.setState({route: 'callback'});
      this.getToken();
    }
  }

  getToken() {
    let hashString = document.location.hash; 
    let substr = hashString.substring(14);
    let values = substr.split('&');
    let token = values[0];
    this.setState({token});
  }

  render() {
    const content = () => <Content token={this.state.token} />;

    
    console.log(content);
    if (!this.state.token && this.state.route !== 'login') {
      this.setState({route: 'login'});
      return <Redirect to={{pathname: '/login'}} />;
    } else if (this.state.route === 'callback') {
      this.setState({route: 'home'}); // setState line is key to re-render component
      return <Redirect to={{pathname: '/'}} />;
    }

    return (
      <div>
      <Switch> 
        <Route exact path='/login' component={login} />
        <Route path='/callback' component={content} />
        <Route exact path='/' component={content} />
      </Switch>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      token: '',
    }
  }

  render() { 
    return (
      <Router>
        <div className="App">
          <Header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h3 className="App-title">Spotify</h3>
          </Header>
          <Body />
        </div>
      </Router>
    );
            // <Button secondary onClick={console.log('fuck you')}>Get Token</Button>
  }
}

export default App;
