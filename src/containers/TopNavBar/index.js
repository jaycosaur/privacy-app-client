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
import NotificationsIcon from '@material-ui/icons/Notifications';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import moment from 'moment'

import RightIcon from '@material-ui/icons/KeyboardArrowRight'
import LeftIcon from '@material-ui/icons/KeyboardArrowLeft'

import AlgoliaSearch from './components/AlgoliaSearch'
import TopBarAvatar from './components/TopBarAvatar'

import { Link } from 'react-router-dom'

import streamers from './../../assets/Streamers.png'
import Hidden from '@material-ui/core/Hidden';
import classnames from 'classnames'

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
      marginLeft: 0,
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
        position: "absolute",
        borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
    },
    appBarExpanded: {
        marginLeft: 240
    },
    toolbarPadding: {
        paddingLeft: theme.spacing.unit*4,
    } ,
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        minWidth: 0, // So the Typography noWrap works
        height: "92vh",
        overflow: "scroll"
    },
    drawerPaper: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen*1,
          }),
        width: drawerWidth,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRight:  "1px solid rgba(0, 0, 0, 0.12)",
        height: "100%"
    },
    drawerPaperClose: {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen*1,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing.unit * 9,
        },
    }
  })

class NavBar extends React.Component {
    state = {
        anchorEl: null,
        dialogueOpen: false,
        scroll: 'body',
        menuOpen: false
    }

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget, menuOpen: true });
    };

    handleClose = () => {
        this.setState({ anchorEl: null, menuOpen: false });
    }

    handleDialogueOpen = scroll => () => {
        this.setState({ dialogueOpen: true});
      };
    
    handleDialogueClose = () => {
        this.setState({ dialogueOpen: false });
    };
    
    render(){
        const { classes, isSignedIn, isSideDrawerExpanded, isFullScreen, organisation } = this.props
        const { anchorEl } = this.state
        const open = Boolean(anchorEl)

        return (
            <AppBar className={classes.appBar} position="fixed" color={isSignedIn?"default":"primary"} style={{background: (isSignedIn)?"white":"none", borderBottom: (isSignedIn&&!isFullScreen)&&"1px solid #ddd"}} elevation={!isSignedIn?0:1} elevation={0}>
                <Toolbar style={{paddingLeft: 0}}>
                    <div style={{flex: 1, display: "flex", alignItems: "center", height: "100%"}}>
                        <div className={classnames(classes.drawerPaper, !isSideDrawerExpanded&&classes.drawerPaperClose)}>
                            <Hidden xsDown>
                                {isSideDrawerExpanded?(
                                    <Link to="/" className={classnames(classes.toolbarPadding, classes.flex)}><Typography variant="title" color={(isSignedIn&&!isFullScreen)?"primary":"secondary"}>
                                        <strong>PRIVTALK</strong>
                                    </Typography></Link>
                                ):<Link to="/"><img src={require("../../assets/WhiteCircleLogo.png")} width={50}/></Link>}
                            </Hidden>
                        </div>
                    </div>
                    <Hidden smUp>
                        <div style={{flex: 1, display: "flex", alignItems: "center"}}>
                        <Link to="/" className={classes.flex}><Typography variant="title" color={(isSignedIn&&!isFullScreen)?"primary":"secondary"}>
                                <strong>PRIVTALK</strong>
                            </Typography></Link>
                        </div>
                    </Hidden>
                    {false&&<Hidden smDown>
                        <div style={{alignItems: "center", justifyContent: "center"}}>
                            {isSignedIn&&<div style={{flexGrow: 1}}><AlgoliaSearch/></div>}
                        </div>
                    </Hidden>}
                    <div style={{flex: 1, display: "flex", alignItems: "center"}}>
                        <div style={{flex: 1}} />
                        <Hidden xsDown>
                            {isSignedIn&&this.props.organisation&&this.props.organisation.plan==="TRIAL"&&
                                <Link to="/team?upgradeplan=open"><Button 
                                    color="secondary" 
                                    variant="outlined" 
                                    size="medium" 
                                    style={{marginRight: 16, borderColor: "#f97794", color: "#f97794"}}
                                    >
                                    TRIAL ({moment().isAfter(moment(this.props.organisation.createdOn).add(30,"d"))?"EXPIRED":moment(this.props.organisation.createdOn).add(30,"d").fromNow(true)} LEFT)
                                    </Button></Link>}
                        </Hidden>

                        {isSignedIn && (<div>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : null}
                                aria-haspopup="true"
                                onClick={(e)=>this.handleMenu(e)}
                                color="inherit"
                            >
                                <TopBarAvatar />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                open={this.state.menuOpen}
                                onClose={this.handleClose}
                            >
                                {organisation.organisationId&&<Link to="/myaccount"><MenuItem onClick={this.handleClose}>MY ACCOUNT</MenuItem></Link>}
                                <MenuItem onClick={this.props.doSignOut}>LOGOUT</MenuItem>
                            </Menu>
                            </div>)}
                            {isSignedIn && <IconButton onClick={()=>this.props.toggleActivityViewSideDrawer()}><NotificationsIcon color={this.props.isActivityLogHidden?"default":"secondary"}/></IconButton>}
                            {false&&!isSignedIn && (
                                <span style={{float: 'right', margin: "auto"}}>
                                    <Link to="/signin"><Button variant="contained" color="secondary"><strong>SIGN-IN</strong></Button></Link>                        
                                </span>)
                            }
                    </div>
                </Toolbar>
            </AppBar>)
    }
}

  
  const mapStateToProps = (state) => {
      return {
        isSignedIn: state.user.isSignedIn,
        isSigningIn: state.user.isSigningIn,
        isSideDrawerExpanded: state.view.isSideDrawerExpanded,
        organisation: state.organisation,
        isFullScreen: state.view.isFullScreen,
        isActivityLogHidden: state.view.isActivityLogHidden
      }
  }
  
  export default connect(mapStateToProps, {...menuActions, ...authActions})(withStyles(styles)(NavBar))