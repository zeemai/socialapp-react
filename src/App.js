import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';

import Navbar from './components/layout/Navbar'

import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user'

import AuthRoute from './util/AuthRoute';
//redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
import axios from 'axios';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    }
  },
  typography: {
    useNextVariants: true
  }
})

const token = localStorage.FBIdToken;

if(token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()){
    store.dispatch(logoutUser())
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData())
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={home} />
                <AuthRoute exact path="/login" component={login}  />
                <AuthRoute exact path="/signup" component={signup}  />
                <Route exact path="/users/:handle" component={user}  />
                <Route exact path="/users/:handle/scream/:screamId" component={user} />
              </Switch>
            </div>
          </Router>
        </div>        
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
