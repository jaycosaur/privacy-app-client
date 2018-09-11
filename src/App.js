import React, { Component } from 'react';
import './App.css'
import { connect } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import * as actions from './store/actions/authActions'
import PopOverModel from './views/PopOverModal'
import Talk from './views/Talk'
import { auth } from './config/firebase'
import AuthView from './views/AuthView'
import Raven from 'raven-js'

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

/* const theme = createMuiTheme({
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
}); */

const theme = createMuiTheme({
  typography: {
    fontFamily: ['Work Sans', 'sans-serif']
  }
});

if(process.env.NODE_ENV === "production"){
  //Raven.config('https://6757ef1240c14116835a7f2a5e05875f@sentry.io/1264321').install()
}

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

    componentDidUpdate(prevProps, prevState){
      if (this.props.user.isSignedIn&&prevProps.user.info!==this.props.user.info){
        /* Raven.setUserContext({
          email: this.props.user.info.email,
          uid: this.props.user.info.uid
        }); */
      }
      if (prevProps.user.isSignedIn!==this.props.user.isSignedIn&&!this.props.user.isSignedIn){
        /* Raven.clearContext() */
      }
    }

    render(){
      const user = this.props.user&&this.props.user.info&&{
        user_id: this.props.user.info.uid,
        email: this.props.user.info.email,
        name: this.props.user.info.displayName
      }

      return (
        <ConnectedRouter history={this.props.history}>
          <MuiThemeProvider theme={theme}>
            {false&&<Talk />}
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
    loginFlow: state.loginFlow,
    user: state.user.accountInformation
  }
}

export default connect(mapStateToProps, actions)(App)

/* <ConnectedRouter history={this.props.history}>
          <MuiThemeProvider theme={theme}>
              <PopOverModel />
              <AuthView isSignedIn={this.props.isSignedIn} loginFlow={this.props.loginFlow}/>
          </MuiThemeProvider>
        </ConnectedRouter> */