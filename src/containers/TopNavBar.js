import React from 'react'
import { connect } from 'react-redux'
import * as actions from './../store/actions/authActions'

import { Layout, Menu, Breadcrumb, Button, Row, Col, Card, Avatar, Icon, Input, BackTop } from 'antd';
import { Link } from 'react-router-dom'
import { themeColors } from './../theme'

const { Header } = Layout;

const NavBar = (props) => {
    return (
        <Header style={{background: props.isSignedIn?themeColors[0]:"white", position: "fixed", width: "100%", zIndex: 1000, boxShadow: "0 5px 5px -5px #333"}}>
            <Menu
            theme={props.isSignedIn?"dark":"light"}
            mode="horizontal"
            defaultSelectedKeys={['1']}
            style={{ 
                lineHeight: '64px', 
                background: props.isSignedIn?themeColors[0]:"white",
                border: "none"
                }}
            >
            {props.isSignedIn
                ?
                <Link to="/"><span style={{float: "left", fontSize: "2em", color: "white", marginRight: "3em"}}><strong>POLITY</strong></span></Link>
                :
                <Link to="/"><span style={{float: "left", fontSize: "2em", color: themeColors[0], marginRight: "3em"}}><img src="img/poliglot-logo-small.png" height={40} /></span></Link>
            }
            {props.isSignedIn&&<Menu.Item key="1"><Link to="/policy-tracker"><Icon type="global" /> TRACK POLICY</Link></Menu.Item>}
            {props.isSignedIn&&<Menu.Item key="twitter-tracker"><Link to="/twitter-tracker"><Icon type="twitter" /> TRACK TWITTER</Link></Menu.Item>}
            {props.isSignedIn&&<Menu.Item key="watchlist"><Link to="/watching"><Icon type="schedule" /> YOUR WATCHLIST</Link></Menu.Item>}
            {props.isSignedIn&&<Menu.Item key="4"><Link to="/myaccount"><Icon type="user" /> ACCOUNT</Link></Menu.Item>}
            <span style={{float: 'right', margin: "auto"}}>
                {!props.isSignedIn?
                    <Link to="/signin"><Button size="large" style={{borderColor: "#61FFAE", background: "#15FF87"}}><strong>SIGN-IN</strong></Button></Link>
                    :
                    <Button onClick={props.doSignOut} size="large" style={{borderColor: "#61FFAE", background: "#15FF87"}}><strong>LOGOUT</strong></Button>
                }
            </span>
            </Menu>
        </Header>
    )
  }
  
  const mapStateToProps = (state, ownProps) => {
      return {
        isSignedIn: state.user.isSignedIn
      }
  }
  
  export default connect(mapStateToProps, actions)(NavBar)