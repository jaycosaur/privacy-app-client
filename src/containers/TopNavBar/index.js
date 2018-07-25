import React from 'react'
import { connect } from 'react-redux'

import * as authActions from '../../store/actions/authActions'
import * as menuActions from '../../store/actions/menuActions'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import TopNavMasterSearch from './components/TopNavMasterSearch'
import AlgoliaSearch from './components/AlgoliaSearch'
import TopBarAvatar from './components/TopBarAvatar'

import { Link } from 'react-router-dom'

const drawerWidth = 240;

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: "100vh",
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    flex: {
      flex: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    sidebarList: {
        width: 250,
    },
    padding: {
        padding: theme.spacing.unit
    },
    sidebarFooter: {
        bottom: 0,
        left: 0,
        position: "absolute",
        flexGrow: 1,
        width: "100%",
        padding: theme.spacing.unit
    },
    nested: {
        paddingLeft: theme.spacing.unit * 8,
    },
    margin: {
        marginRight: theme.spacing.unit*8,
    },
    divider: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit
    },
    input: {
        width: 400
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        minWidth: 0, // So the Typography noWrap works
        height: "92vh",
        overflow: "scroll"
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
  })

class NavBar extends React.Component {
    state = {
        anchorEl: null,
    }
    handleChange = (checked) => {
        this.setState({ auth: checked });
      };
    
      handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      }
    
    render(){
        const { classes, isSignedIn } = this.props
        const { anchorEl } = this.state
        const open = Boolean(anchorEl)

        return (
            <AppBar className={classes.appBar} position="fixed" color={isSignedIn?"default":"primary"} elevation={1}>
                <Toolbar>
                    {isSignedIn&&<IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={()=>this.props.toggleAuthViewSideDrawer()}>
                        <MenuIcon />
                    </IconButton>}
                    <Typography variant="title" color={isSignedIn?"primary":"inherit"} className={classes.flex}>
                        <strong>POLIBASE</strong>
                    </Typography>
                    {!isSignedIn && <span style={{float: 'right', margin: "auto"}}>
                        <Link to="/signin"><Button variant="contained" color="secondary"><strong>SIGN-IN</strong></Button></Link>                        
                    </span>}
                    {isSignedIn&&<div style={{flexGrow: 1}}><AlgoliaSearch/></div>}
                    {isSignedIn && (<div>
                        <IconButton
                            aria-owns={open ? 'menu-appbar' : null}
                            aria-haspopup="true"
                            onClick={this.handleMenu}
                            color="inherdit"
                        >
                            <TopBarAvatar />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            open={open}
                            onClose={this.handleClose}
                        >
                            <Link to="/myaccount"><MenuItem onClick={this.handleClose}>MY ACCOUNT</MenuItem></Link>
                            <MenuItem onClick={this.props.doSignOut}>LOGOUT</MenuItem>
                        </Menu>
                    </div>)}
                </Toolbar>
            </AppBar>)
    }
}

  
  const mapStateToProps = (state) => {
      return {
        isSignedIn: state.user.isSignedIn,
        isSigningIn: state.user.isSigningIn,
        isSideDrawerExpanded: state.view.isSideDrawerExpanded
      }
  }
  
  export default connect(mapStateToProps, {...menuActions, ...authActions})(withStyles(styles)(NavBar))