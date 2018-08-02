import React, { Component } from 'react';
import './App.css'
import { connect } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import * as actions from './store/actions/authActions'
import PopOverModel from './views/PopOverModal'
import { auth } from './config/firebase'
import AuthView from './views/AuthView'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#9366d4',
      main: '#623aa2',
      dark: '#310e72',
      contrastText: 'ffffff',
    },
    secondary: {
      light: '#ffa9c4',
      main: '#f97794',
      dark: '#c34666',
      contrastText: '#000',
    },
  },
});

class App extends Component {
    state = {
      isSignedIn: false
    }
    componentDidMount(){
      this.props.attemptingSignIn()
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.props.signInWithUserInfo(user)
        } else {
          this.props.failedSignIn()
        }
      })
    }
    
    static getDerivedStateFromProps(props, state) {
      if(props.isSignedIn !== state.isSignedIn){
        if (props.isSignedIn === true){
          props.accountSignedIn()
        }
        return {isSignedIn: props.isSignedIn}
      }
    }

    render(){
      return (
        <ConnectedRouter history={this.props.history}>
          <MuiThemeProvider theme={theme}>
              <PopOverModel />
              <AuthView isSignedIn={this.props.isSignedIn} loginFlow={this.props.loginFlow}/>
          </MuiThemeProvider>
        </ConnectedRouter>
      );
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isSignedIn: state.user.isSignedIn,
    isSigningIn: state.user.isSigningIn,
    loginFlow: state.loginFlow
  }
}

export default connect(mapStateToProps, actions)(App)