import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListIcon from '@material-ui/icons/List'
import HomeIcon from '@material-ui/icons/Home'
import GroupIcon from '@material-ui/icons/Group'
import StarIcon from '@material-ui/icons/Star';
import FlagIcon from '@material-ui/icons/Flag';
import HistoryIcon from '@material-ui/icons/History';
import Icon from '@material-ui/core/Icon';
import TopNavBar from './../containers/TopNavBar'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Routes from './../Routes'
import { Link } from 'react-router-dom'
import {emojify} from 'react-emojione';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import * as menuActions from './../store/actions/menuActions'
import Hidden from '@material-ui/core/Hidden';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import CircularProgress from '@material-ui/core/CircularProgress';

const Footer = ({isSideDrawerExpanded}) => (
    <div style={{textAlign: "center", flexGrow: 1, margin: 8}}>
        {isSideDrawerExpanded&&<p style={{fontWeight: 700, fontSize: "1.2em", margin: 0, color: "#623aa2"}}>POLIBASE</p>}
        {isSideDrawerExpanded&&<p style={{margin: 0}}>Powered by avocados <a href="https://en.wikipedia.org/wiki/Avocado">{emojify(':avocado:',{style: {height: 16}})}</a></p>}
        {isSideDrawerExpanded&&<p style={{margin: 0}}><small>© 2018 ExamineChange Pty. Ltd. <br/>All rights reserved.</small></p>}
        {!isSideDrawerExpanded&&<p style={{margin: 0}}><a href="https://en.wikipedia.org/wiki/Avocado">{emojify(':avocado:',{style: {height: 16}})}</a></p>}
    </div>
)

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
        height: "100vh",
        overflow: "scroll"
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
    },
      drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing.unit * 9,
        },
    },
    icon: {
       fontSize: 18,
       width: 24,
       height: 24,
       textAlign: "center"
    },
  })

const SideDrawerToggleContainer = (props) => {
    const { classes, isSideDrawerExpanded, width } = props
    const sidebarList = (
        <div className={classes.sidebarList}>
            <List
                dense={true}
            >
                <Link to="/home">
                    <ListItem button>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText inset primary="Home" />
                    </ListItem>
                </Link>
                <Link to="/action-manager">
                    <ListItem button>
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                            <ListItemText inset primary="Action Manager" />
                    </ListItem>
                </Link>
                <Link to="/contacts">
                    <ListItem button>
                            <ListItemIcon>
                                <Icon className={classes.icon+" "+'fas fa-address-book'} />
                            </ListItemIcon>
                            <ListItemText inset primary="Contacts" />
                    </ListItem>
                </Link>
                <Link to="/team">
                    <ListItem button>
                            <ListItemIcon>
                            <GroupIcon />
                            </ListItemIcon>
                            <ListItemText inset primary="Team" />
                    </ListItem>
                </Link>
                <Divider className={classes.divider}/>
                <Link to="/search/">
                <ListItem button>
                    <ListItemIcon>
                        <Icon className={classes.icon+" "+'fas fa-search'} />
                    </ListItemIcon>
                    <ListItemText inset primary="Track and Watch" />
                </ListItem>
                </Link>
                <Link to="/search/regulation">
                    <ListItem button>
                        <ListItemIcon><Icon className={classes.icon+" "+'fas fa-balance-scale'} /></ListItemIcon>
                        <ListItemText primary="Regulatory Developments" />
                    </ListItem>
                </Link>
                <Link to="/search/media-and-commentary">
                    <ListItem button>
                        <ListItemIcon><Icon className={classes.icon+" "+'fas fa-newspaper'} /></ListItemIcon>
                        <ListItemText primary="Media & Commentary" />
                    </ListItem>
                </Link>
                <ListItem button disabled>
                    <ListItemIcon><Icon className={classes.icon+" "+'fas fa-book'} /></ListItemIcon>
                    <ListItemText primary="Research & Reports" />
                </ListItem>
                <Divider />
                <Link to="/watchlist">
                    <ListItem button>
                        <ListItemIcon><StarIcon /></ListItemIcon>
                        <ListItemText primary="Your Watchlists" />
                    </ListItem>
                </Link>
                <ListItem button disabled>
                    <ListItemIcon><FlagIcon /></ListItemIcon>
                    <ListItemText primary="Flagged Items" />
                </ListItem>
                <ListItem button disabled>
                    <ListItemIcon><HistoryIcon /></ListItemIcon>
                    <ListItemText primary="Recent Searches" />
                </ListItem>
            </List>
            <div className={classes.sidebarFooter}>
                <Divider />
                <div className={classes.padding}>
                    <Footer isSideDrawerExpanded={isSideDrawerExpanded}/>
                </div>
            </div>
        </div>
        )
    return (
        //Just make Drawer to test
        isWidthUp("lg",width)?
        <Drawer
            classes={{
                paper: isSideDrawerExpanded?classes.drawerPaper:[classes.drawerPaper,classes.drawerPaperClose].join(" "),
            }}
            variant="permanent"
            open={isSideDrawerExpanded}
            >
            <div className={classes.toolbar}>
                {width}
            </div>
            <div
                tabIndex={0}
                role="button"
            >
                {sidebarList}
            </div>
        </Drawer>
        :<SwipeableDrawer
            classes={{
                paper: isSideDrawerExpanded?classes.drawerPaper:[classes.drawerPaper,classes.drawerPaperClose].join(" "),
            }}
            onClose={()=>props.toggleAuthViewSideDrawer()}
            onOpen={()=>props.toggleAuthViewSideDrawer()}
            open={isSideDrawerExpanded}
            >
            <div className={classes.toolbar}>
                {width==="lg"?"Lg":"no"}
            </div>
            <div
                tabIndex={0}
                role="button"
            >
                {sidebarList}
            </div>
        </SwipeableDrawer>
    )
}

const mapStateToProps = (state) => {
    return {
        isSideDrawerExpanded: state.view.isSideDrawerExpanded
    }}

const SideDrawerToggleContainerWithStore = connect(mapStateToProps, menuActions)(withWidth()(withStyles(styles, { withTheme: true })(SideDrawerToggleContainer)))

const OverLoginFlowPanel = (props) => {
    const { loginFlow } = props
    return (
        !loginFlow.isComplete&&<div style={{background: "#623aa3", zIndex: 1000, position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", justifyContent: "center", alignItems: "center", flexDirection:"column"}}>
            <CircularProgress
                className={props.classes.progress}
                color="secondary"
                size={100}
                />
            <h4 style={{color: "white", fontWeight: 300, marginTop: 32}}>{loginFlow.message}</h4>
        </div>
        )
}


const AuthView = (props) => {
    const { classes, isSignedIn, loginFlow } = props
    return (
        <div className={classes.root}>
            <OverLoginFlowPanel loginFlow={loginFlow} classes={classes}/>
            <TopNavBar />
            {isSignedIn&&loginFlow.isComplete&&<SideDrawerToggleContainerWithStore/>}
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Routes isSignedIn={isSignedIn}/>
            </main>
        </div>
    )
}

export default withStyles(styles)(AuthView)