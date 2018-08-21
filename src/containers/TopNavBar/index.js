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

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import AlgoliaSearch from './components/AlgoliaSearch'
import TopBarAvatar from './components/TopBarAvatar'

import { Link } from 'react-router-dom'

import streamers from './../../assets/Streamers.png'
import Hidden from '@material-ui/core/Hidden';

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
        const { classes, isSignedIn } = this.props
        const { anchorEl } = this.state
        const open = Boolean(anchorEl)

        return (
            <AppBar className={classes.appBar} position="fixed" color={isSignedIn?"default":"primary"} style={{background: isSignedIn?"white":"none", borderBottom: isSignedIn&&"1px solid #ddd"}} elevation={!isSignedIn?0:1} elevation={0}>
                <Toolbar>
                    <div style={{flex: 1, display: "flex", alignItems: "center"}}>
                        {isSignedIn&&<IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={()=>this.props.toggleAuthViewSideDrawer()}>
                            <MenuIcon />
                        </IconButton>}
                        <Hidden xsDown>
                            <Typography variant="title" color={isSignedIn?"primary":"secondary"} className={classes.flex}>
                                <strong>POLIBASE</strong>
                            </Typography>
                        </Hidden>
                    </div>
                    <Hidden smUp>
                        <div style={{flex: 1, display: "flex", alignItems: "center"}}>
                            <Typography variant="title" color={isSignedIn?"primary":"secondary"} className={classes.flex}>
                                <strong>POLIBASE</strong>
                            </Typography>
                        </div>
                    </Hidden>
                    <Hidden smDown>
                        <div style={{alignItems: "center", justifyContent: "center"}}>
                            {isSignedIn&&<div style={{flexGrow: 1}}><AlgoliaSearch/></div>}
                        </div>
                    </Hidden>
                    <div style={{flex: 1, display: "flex", alignItems: "center"}}>
                        <div style={{flex: 1}} />
                        <Hidden xsDown>
                            {isSignedIn&&<Button onClick={this.handleDialogueOpen()} color="secondary" variant="outlined" size="medium" style={{marginRight: 16}}>ABOUT PILOT</Button>}
                        </Hidden>

                        {isSignedIn && (<div>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : null}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"
                            >
                                <TopBarAvatar />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                open={open&&this.state.menuOpen}
                                onClose={this.handleClose}
                            >
                                <Link to="/myaccount"><MenuItem onClick={this.handleClose}>MY ACCOUNT</MenuItem></Link>
                                <MenuItem onClick={this.props.doSignOut}>LOGOUT</MenuItem>
                            </Menu>
                            </div>)}
                            {!isSignedIn && (
                                <span style={{float: 'right', margin: "auto"}}>
                                    <Link to="/signin"><Button variant="contained" color="secondary"><strong>SIGN-IN</strong></Button></Link>                        
                                </span>)
                            }
                    </div>
                </Toolbar>
                <Dialog
                    open={this.state.dialogueOpen}
                    onClose={this.handleDialogueClose}
                    scroll={this.state.scroll}
                    aria-labelledby="scroll-dialog-title"
                    >
                    <img src={streamers} width={"100%"} alt="" style={{position: "absolute", top: 0, left: 0, right: 0, zIndex: 0, opacity: 0.2}}/>
                    <DialogTitle id="scroll-dialog-title" style={{zIndex: 50}}>Welcome to the Polibase Pilot! </DialogTitle>
                    <DialogContent style={{zIndex: 50}}>
                        <DialogContentText style={{zIndex: 50, color: "black"}}>
                            We're hoping to get valuable feedback from our Pilot Partners on what works and what doesn't. We're working on the platform throughout the entire pilot period - so don't be alarmed if a buttons change, pages get added, and new features arrive.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleDialogueClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
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