import React from 'react'
import { connect } from 'react-redux'
import * as actions from './../store/actions/authActions'

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ListIcon from '@material-ui/icons/List'
import HomeIcon from '@material-ui/icons/Home'
import GroupIcon from '@material-ui/icons/Group'
import WhatsHotIcon from '@material-ui/icons/Whatshot'
import DomainIcon from '@material-ui/icons/Domain'
import PublicIcon from '@material-ui/icons/Public'
import PollIcon from '@material-ui/icons/Poll'
import SearchIcon from '@material-ui/icons/Search'

import SchoolIcon from '@material-ui/icons/School'
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

import ListSubheader from '@material-ui/core/ListSubheader';
import { Link } from 'react-router-dom'
import {emojify} from 'react-emojione';

const Footer = (props) => (
        <div style={{textAlign: "center", flexGrow: 1}}>
            <p style={{fontWeight: 700, fontSize: "2em", margin: 0, color: "#623aa2"}}>POLITY</p>
            <p style={{margin: 0}}>Powered by avocados <a href="https://en.wikipedia.org/wiki/Avocado">{emojify(':avocado:',{style: {height: 16}})}</a></p>
            <p style={{margin: 0}}><small>Copyright © 2018 ExamineChange Pty. Ltd. <br/>All rights reserved.</small></p>
        </div>
)

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    flex: {
      flex: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    sidebarList: {
        width: 350,
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
    }
  })

class NavBar extends React.Component {
    state = {
        anchorEl: null,
        drawer: false
    }
    handleChange = (event, checked) => {
        this.setState({ auth: checked });
      };
    
      handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };

      toggleDrawer = (open) => () => {
        this.setState({
          drawer: open,
        });
      };
    
    render(){
        const { classes, isSignedIn } = this.props
        const { anchorEl } = this.state
        const open = Boolean(anchorEl)
        
        const sidebarList = (
            <div className={classes.sidebarList}>
                <List
                    subheader={<ListSubheader component="div">Polity Navigation Menu</ListSubheader>}
                >
                    <Link to="/home">
                        <ListItem button>
                            
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText inset primary="Home" />
                        </ListItem>
                    </Link>
                    <Link to="/tasklist">
                        <ListItem button>
                                <ListItemIcon>
                                    <ListIcon />
                                </ListItemIcon>
                                <ListItemText inset primary="Projects" />
                        </ListItem>
                    </Link>
                    <Link to="/contacts">
                        <ListItem button>
                                <ListItemIcon>
                                    <GroupIcon />
                                </ListItemIcon>
                                <ListItemText inset primary="Contacts" />
                        </ListItem>
                    </Link>
                    <Divider className={classes.divider}/>
                    <ListItem>
                        <ListItemIcon>
                            <WhatsHotIcon />
                        </ListItemIcon>
                        <ListItemText inset primary="Track and Watch" />
                    </ListItem>
                    <Collapse in={true} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <Link to="/watchlist">
                                <ListItem button className={classes.nested}>
                                        <ListItemIcon>
                                            <PublicIcon />
                                        </ListItemIcon>
                                        <ListItemText inset primary="Your Watchlists" />
                                </ListItem>
                            </Link>
                            <Link to="/policy-tracker">
                                <ListItem button className={classes.nested}>
                                        <ListItemIcon>
                                            <PollIcon />
                                        </ListItemIcon>
                                        <ListItemText inset primary="Track Policy" />
                                </ListItem>
                            </Link>
                            <Link to="/news">
                                <ListItem button className={classes.nested}>
                                        <ListItemIcon>
                                            <DomainIcon />
                                        </ListItemIcon>
                                        <ListItemText inset primary="Track News" />
                                </ListItem>
                            </Link>
                        </List>
                    </Collapse>
                    <Divider className={classes.divider}/>
                    <Link to="/team">
                        <ListItem button>
                                <ListItemIcon>
                                    <SchoolIcon />
                                </ListItemIcon>
                                <ListItemText inset primary="My Team" />
                        </ListItem>
                    </Link>
                </List>
                <div className={classes.sidebarFooter}>
                    <Divider />
                    <div className={classes.padding}>
                        <Footer />
                    </div>
                </div>
            </div>
          )

        return (
            <div className={classes.root}>
                <AppBar position="fixed" color={isSignedIn?"default":"primary"}>
                    <Toolbar>
                        
                        {isSignedIn&&<IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer(true)}>
                            <MenuIcon />
                        </IconButton>}
                        <Typography variant="title" color={isSignedIn?"primary":"inherit"} className={classes.flex}>
                            <strong>POLITY</strong>
                        </Typography>
                        {!isSignedIn && <span style={{float: 'right', margin: "auto"}}>
                            <Link to="/signin"><Button variant="contained" color="secondary"><strong>SIGN-IN</strong></Button></Link>                        
                        </span>}
                        {isSignedIn&&<FormControl className={classes.margin}>
                            <Input
                                id="input-with-icon-adornment"
                                placeholder="Looking for something?"
                                startAdornment={
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>}
                        {isSignedIn && (<div>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : null}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherdit"
                            >
                                <Avatar alt="Profile Picture" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(13).jpg" className={classes.avatar} />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleClose}
                            >
                                <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                <Link to="/myaccount"><MenuItem onClick={this.handleClose}>MY ACCOUNT</MenuItem></Link>
                                <MenuItem onClick={this.props.doSignOut}>LOGOUT</MenuItem>
                            </Menu>
                        </div>)}
                    </Toolbar>
                </AppBar>
                <Drawer anchor="left" open={this.state.drawer} onClose={this.toggleDrawer(false)}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer(false)}
                        onKeyDown={this.toggleDrawer(false)}
                    >
                        {sidebarList}
                    </div>
                </Drawer>
            </div>)
    }
}

  
  const mapStateToProps = (state, ownProps) => {
      return {
        isSignedIn: state.user.isSignedIn
      }
  }
  
  export default connect(mapStateToProps, actions)(withStyles(styles)(NavBar))