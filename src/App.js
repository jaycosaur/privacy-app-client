import React, { Component } from 'react';
import './App.css';
import { Layout, Menu, Breadcrumb, Button, Row, Col, Card, Avatar, Icon, Input, BackTop } from 'antd';
import { Link } from 'react-router-dom'
import { themeColors } from './theme'
import Routes from './Routes'
import ItemList from './containers/ItemList'
import CardWrapper from './components/CardWrapper'
import {emojify} from 'react-emojione';
import { connect } from 'react-redux'
import TopNavBar from './containers/TopNavBar'
import { ConnectedRouter } from 'react-router-redux'
import * as actions from './store/actions/authActions'
import PopOverModel from './views/PopOverModal'
import {auth} from './config/firebase'


const { Header, Content, Footer } = Layout;

class App extends Component {
    componentWillMount(){
      this.props.attemptingSignIn()
      auth.onAuthStateChanged((user) => {
        if (user) {
          this.props.signInWithUserInfo(user)
        } else {
          this.props.failedSignIn()
        }
      })
    }
    render(){
      return (
        <ConnectedRouter history={this.props.history}>
          <Layout className="layout" style={{background: this.props.isSignedIn?null:themeColors[0] }}>
            <BackTop />
            <TopNavBar />
            <Content style={{paddingTop: 64, minHeight: 650}}>
              <PopOverModel />
              <Routes isSignedIn={this.props.isSignedIn}/>
            </Content>
            <FooterComponent />
          </Layout>
        </ConnectedRouter>
      );
    }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isSignedIn: state.user.isSignedIn,
    isSigningIn: state.user.isSigningIn,
  }
}

export default connect(mapStateToProps, actions)(App)


const FooterComponent = (props) => (
  <Footer style={{ textAlign: 'center', background: "#0B3C7F", color: "#61FFAE" }}>
    <div>
    </div>
    <div>
      <p style={{fontWeight: 700, fontSize: "2em", margin: 0, color: "white"}}>POLITY</p>
      <p style={{margin: 0}}>Powered by avocados <a href="https://en.wikipedia.org/wiki/Avocado">{emojify(':avocado:',{style: {height: 16}})}</a></p>
      <p style={{margin: 0}}><small>Copyright © 2018 ExamineChange Pty. Ltd. All rights reserved.</small></p>
    </div>
    <div>
    </div>
  </Footer>
)