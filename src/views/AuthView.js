import React from 'react'

import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListIcon from '@material-ui/icons/List'
import HomeIcon from '@material-ui/icons/Home'
import GroupIcon from '@material-ui/icons/Group'
import Collapse from '@material-ui/core/Collapse';
import StorageIcon from '@material-ui/icons/Storage';
import BookmarksIcon from '@material-ui/icons/CollectionsBookmark';
import DraftsIcon from '@material-ui/icons/Drafts';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import HelpIcon from '@material-ui/icons/Help';
import Icon from '@material-ui/core/Icon';
import TopNavBar from './../containers/TopNavBar'
import { connect } from 'react-redux'
import Routes from './../Routes'
import { Link } from 'react-router-dom'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import * as menuActions from './../store/actions/menuActions'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import CircularProgress from '@material-ui/core/CircularProgress';
import Hidden from '@material-ui/core/Hidden';
import classnames from 'classnames'
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import CardContent from '@material-ui/core/CardContent';

import SecurityIcon from '@material-ui/icons/Security';
import WorkspaceIcon from '@material-ui/icons/Apps';
import ConfigureIcon from '@material-ui/icons/DeveloperBoard';
import IntegrateIcon from '@material-ui/icons/DeviceHub';
import TrackIcon from '@material-ui/icons/TrackChanges';
import ChartIcon from '@material-ui/icons/InsertChart';
import ActivityIcon from '@material-ui/icons/InsertComment';
import ArrowRight from '@material-ui/icons/ChevronRight';
import ArrowLeft from '@material-ui/icons/ChevronLeft';

import Card from '@material-ui/core/Card';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import moment from 'moment'




const disclaimer = "All material linked or otherwise accessible on this site is sourced for the sole purpose of enabling the provision of professional advice as per fair usage requirements. Content is not a reproduction or copy but rather a portal to source material from where further insights can be derived at the users own discretion as referred on."


class InfoModal extends React.Component {
    state = {
        open: false
    }
    handleOpen = () => {
        this.setState({open: true})
    }
    handleClose = () => {
        this.setState({open: false})
    }
    render() {
        return (
            [<span onClick={this.handleOpen}>
                {this.props.children}
            </span>,
            <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Polibase Disclaimer"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {disclaimer}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        Close
                    </Button>
                </DialogActions>
            </Dialog>]
        )
    }
}

const Footer = ({isSideDrawerExpanded}) => (
    <div style={{textAlign: "center", flexGrow: 1, margin: 8}}>
        {!isSideDrawerExpanded&&<InfoModal><IconButton><SecurityIcon color="secondary"/></IconButton></InfoModal>}
        {isSideDrawerExpanded&&<p style={{fontWeight: 700, fontSize: "1.2em", margin: 0, color: "#623aa2"}}>POLIBASE</p>}
        {isSideDrawerExpanded&&<p style={{margin: 0}}><small>© 2018 ExamineChange Pty. Ltd. <br/>All rights reserved.</small></p>}
        {isSideDrawerExpanded&&<p style={{margin: 0}}><small><InfoModal><a style={{color: "#f97794"}}>Polibase Disclaimer</a></InfoModal></small></p>}
    </div>
)

const drawerWidth = 240;
const activityDrawerWidth = 400;


const styles = theme => ({
    root: {
        flexGrow: 1,
        height: "100vh",
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex'
    },
    flex: {
      flex: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    sidebarList: {
        overflow: "hidden"
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
        padding: theme.spacing.unit,
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"
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
        backgroundColor: theme.palette.background.paper,
        minWidth: 0, // So the Typography noWrap works
        height: "100vh",
        overflow: "hidden",
        zIndex: 0
    },
    activityDrawerPaper: {
        zIndex: 10,
        position: 'relative',
        whiteSpace: 'nowrap',
        width: activityDrawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        background: "white",
        borderLeft: "1px solid #ddd"
    },
    activityDrawerPaperClose: {
        overflow: 'hidden',
        height: "100%",
        width: 0,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
    },
    drawerPaper: {
        zIndex: 10,
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        background: theme.palette.primary.dark
    },
      drawerPaperClose: {
        overflow: 'hidden',
        height: "100%",
        width: "100%",
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
    selected: {
        background: "red"
    }
  })

const SideDrawerToggleContainer = (props) => {
    const { path, classes, isSideDrawerExpanded, width, isFullScreen } = props

    const SideBarItem = (props) => {
        const { selected, to, disabled, icon, primary, secondary, children, beta, dense } = props
        const textColor =  selected?"white":"rgba(255,255,255,0.5)"
        return (
            disabled?
                <ListItem button dense={dense} disabled style={{color: textColor}}>
                    <ListItemIcon style={{color: textColor}}>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{color: "inherit"}} inset primary={primary} style={{color: textColor, fontWeight: 300}}/>
                    {children}
                    {beta&&<Button color="secondary" size="small" variant="contained">BETA</Button>}
                </ListItem>
            :<Link to={to}>
                <ListItem button dense={dense}  style={{color: textColor}}>
                    <ListItemIcon style={{color: textColor}}>
                        {icon}
                    </ListItemIcon>
                    <ListItemText primaryTypographyProps={{color: "inherit"}} inset primary={primary} style={{color: textColor, fontWeight: 300}}/>
                    {children}
                    {beta&&<Button color="secondary" size="small" variant="contained">BETA</Button>}
                </ListItem>
            </Link>
        )
    }
    const sidebarList = (
        <div className={classes.sidebarList}>
            <List>
                <SideBarItem
                    selected={path==="/sites"}
                    to="/sites"
                    icon={<WorkspaceIcon />}
                    primary="Your Sites"
                    />
                <SideBarItem 
                    selected={path==="/configure"}
                    to="/configure"
                    icon={<ConfigureIcon />}
                    primary="Configure"
                    />
                <SideBarItem 
                    selected={path==="/track"}
                    to="/track"
                    icon={<TrackIcon />}
                    primary="Track"
                    />
                <SideBarItem
                    selected={path==="/integrations"}
                    to="/integrations"
                    icon={<IntegrateIcon />}
                    primary="Integrations"
                    />
                <SideBarItem
                    selected={path==="/help"} 
                    to="/help"
                    icon={<HelpIcon />}
                    primary="Help and FAQ"
                    />
                <Divider className={classes.divider}/>
                <SideBarItem
                    selected={path==="/activity"} 
                    disabled
                    to="/activity"
                    icon={<ActivityIcon />}
                    primary="Activity"
                    beta
                    />
                <SideBarItem
                    selected={path==="/stats"} 
                    disabled
                    to="/stats"
                    icon={<ChartIcon  />}
                    primary="Statistics"
                    beta
                    />
            </List>
            <div className={classes.sidebarFooter} style={{borderTop: "1px solid #ddd", background: "none", display: "flex", flexDirection: "column"}}>
                <Footer isSideDrawerExpanded={isSideDrawerExpanded}/>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", flex: 1}}>
                    <IconButton onClick={()=>props.toggleAuthViewSideDrawer()}>{!isSideDrawerExpanded?<ArrowRight color="secondary"/>:<ArrowLeft  color="secondary"/>}</IconButton>
                    {isSideDrawerExpanded&&<span style={{flex: 1, fontAlign: "center"}}>Collapse</span>}
                </div>
            </div>
        </div>
        )
    return (
        //Just make Drawer to test
        //!isFullScreen&&(isWidthUp("lg",width)?
        (isWidthUp("lg",width)?
        <Drawer
            classes={{
                paper: isSideDrawerExpanded?classes.drawerPaper:[classes.drawerPaper,classes.drawerPaperClose].join(" "),
            }}
            variant="permanent"
            open={isSideDrawerExpanded}
            elevation={20}
            >
            <div className={classes.toolbar} />
            <div
                tabIndex={0}
                role="button"
                style={{height: "100%", width: "100%", overflow: "hidden"}}
            >
                {sidebarList}
            </div>
        </Drawer>
        :<SwipeableDrawer
            classes={{
                paper: classes.drawerPaper,
            }}
            onClose={()=>props.toggleAuthViewSideDrawer()}
            onOpen={()=>props.toggleAuthViewSideDrawer()}
            open={isSideDrawerExpanded}
            >
            <div
                tabIndex={0}
                role="button"
            >
                {sidebarList}
            </div>
        </SwipeableDrawer>)
    )
}

const mapStateToProps = (state) => {
    return {
        isSideDrawerExpanded: state.view.isSideDrawerExpanded,
        isFullScreen: state.view.isFullScreen,
        path: state.router.pathname
    }}

const SideDrawerToggleContainerWithStore = connect(mapStateToProps, menuActions)(withWidth()(withStyles(styles, { withTheme: true })(SideDrawerToggleContainer)))

const ActivityContainer = (props) => {
    const { classes, isActivityLogHidden, width, isFullScreen } = props
    const ActivityLog = () =>  (
        <Card style={{border: "1px solid #ddd", background: "#fefefe", margin: 8}} elevation={0}>
            <CardContent style={{padding: "8px 16px", display: "flex", alignItems: "center"}}>
                <div style={{flex: 1}}>
                    <Typography variant="button">EVENT NAME</Typography>
                    <Typography variant="caption">{moment().format("hh:mm:SS DD/MM/YY")}</Typography>
                </div>
                <Button size="small" variant="outlined">VIEW</Button>
            </CardContent>
        </Card>)

    const sidebarList = (
        <div className={classes.sidebarList}>
            <AppBar position="static" style={{background: "none", borderBottom: "1px solid #ddd"}} elevation={0}>
                <Toolbar variant="dense">
                    <Typography variant="title" color="primaryText">
                        Site Events
                    </Typography>
                    <div style={{flex: 1}}/>
                    <Link to="/track?range=latest">
                        <Button variant="contained" size="small" color="secondary">
                            View
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <ActivityLog />
            <ActivityLog />
            <ActivityLog />
            <ActivityLog />
            <ActivityLog />
            <ActivityLog />
            <ActivityLog />
            <ActivityLog />
            <ActivityLog />
            <ActivityLog />
            <ActivityLog />
            <ActivityLog />
            <ActivityLog />
            <ActivityLog />
            <ActivityLog />
            <div className={classes.sidebarFooter} style={{zIndex: 100, borderTop: "1px solid #ddd", background: "#fefefe"}}>
                <IconButton onClick={()=>props.toggleActivityViewSideDrawer()}><ArrowRight /></IconButton>
                <span style={{flex: 1, fontAlign: "center"}}>Collapse</span>
            </div>
        </div>
        )
    return (
        //Just make Drawer to test
        //!isFullScreen&&(isWidthUp("lg",width)?
        <Drawer
            classes={{
                paper: classnames(classes.activityDrawerPaper, isActivityLogHidden&&classes.activityDrawerPaperClose),
            }}
            variant="permanent"
            open={!isActivityLogHidden}
            elevation={20}
            >
            <div className={classes.toolbar} />
            <div
                tabIndex={0}
                role="button"
                style={{height: "100%", width: "100%", overflow: "hidden"}}
            >
                {sidebarList}
            </div>
        </Drawer>
    )
}

const mapSToProps = (state) => {
    return {
        isActivityLogHidden: state.view.isActivityLogHidden,
        isFullScreen: state.view.isFullScreen
    }}

const ActivityContainerWithStore = connect(mapSToProps, menuActions)(withWidth()(withStyles(styles, { withTheme: true })(ActivityContainer)))

const OverLoginFlowPanel = (props) => {
    const { loginFlow } = props
    return (
        (!loginFlow.isComplete&&!loginFlow.hasFailed)&&<div style={{background: "#623aa3", zIndex: 1000, position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", justifyContent: "center", alignItems: "center", flexDirection:"column"}}>
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
    const { classes, isSignedIn, loginFlow, isNavHidden, isSideHidden, isFullScreen } = props
    return (
        <div className={classes.root}>
            <OverLoginFlowPanel loginFlow={loginFlow} classes={classes}/>
            <TopNavBar />
            {isSignedIn&&<SideDrawerToggleContainerWithStore/>}
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Routes isSignedIn={isSignedIn}/>
            </main>
            {isSignedIn&&<ActivityContainerWithStore/>}
        </div>
    )
}

export default withStyles(styles)(AuthView)