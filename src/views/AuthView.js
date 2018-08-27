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
import StarIcon from '@material-ui/icons/Star';
import BookmarksIcon from '@material-ui/icons/CollectionsBookmark';
import HistoryIcon from '@material-ui/icons/History';
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
        {isSideDrawerExpanded&&<p style={{fontWeight: 700, fontSize: "1.2em", margin: 0, color: "#623aa2"}}>POLIBASE</p>}
        {isSideDrawerExpanded&&<p style={{margin: 0}}><small>© 2018 ExamineChange Pty. Ltd. <br/>All rights reserved.</small></p>}
        {isSideDrawerExpanded&&<p style={{margin: 0}}><small><InfoModal><a style={{color: "#f97794"}}>Polibase Disclaimer</a></InfoModal></small></p>}
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
        overflow: "hidden",
        zIndex: 0
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
  })

class ComplianceDropDown extends React.Component{
    state = {
        open: false
    }

    toggleMenu = () => {
        this.setState(state=>({open: !state.open}))
    }
    render(){
        const { hasOrganisation, projects, isSideDrawerExpanded } = this.props

        const projectsArray = projects&&Object.keys(projects).map(key=>projects[key])

        const cropToMax = (string) => `${[...string].slice(0,25).join("")}${string.length>25?"...":""}`

        return (
            [ <Link to="/compliance-workspace"><ListItem button>
                        
                            <ListItemIcon>
                                <ListIcon />
                            </ListItemIcon>
                            <ListItemText inset primary="Workspace" />
                            {hasOrganisation&&<ListItemSecondaryAction>
                                <IconButton aria-label="Show Projects" onClick={this.toggleMenu} style={{marginRight: 8}}>
                                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                                </IconButton>
                        </ListItemSecondaryAction>}
                    </ListItem></Link>,
                <Collapse in={isSideDrawerExpanded&&this.state.open} timeout="auto" unmountOnExit>
                    <div style={{paddingLeft: 16}}>
                        {
                            projectsArray&&projectsArray.map(i=>(
                                <Link to={`/compliance-workspace/${i.projectId}`}>
                                    <ListItem button dense>
                                        <ListItemText primary={cropToMax(i.title)} />
                                    </ListItem>
                                </Link>
                            ))
                        }
                       
                    </div>
                </Collapse>]
        )
    }
}

const withProjects = (state) => {
    return {
        projects: state.actionManager.projects,
        hasOrganisation: state.organisation&&state.organisation.organisationId,
        isSideDrawerExpanded: state.view.isSideDrawerExpanded
    }
}

const ComplianceDropDownWithStore = connect(withProjects)(ComplianceDropDown)

const SideDrawerToggleContainer = (props) => {
    const { classes, isSideDrawerExpanded, width, isFullScreen } = props
    const sidebarList = (
        <div className={classes.sidebarList}>
            <List
            >
                <Link to="/home">
                    <ListItem button>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText inset primary="Home" />
                    </ListItem>
                </Link>
                <ComplianceDropDownWithStore />
                <Link to="/team">
                    <ListItem button>
                            <ListItemIcon>
                            <GroupIcon />
                            </ListItemIcon>
                            <ListItemText inset primary="Team" />
                    </ListItem>
                </Link>
                <Link to="/help">
                    <ListItem button>
                            <ListItemIcon>
                                <HelpIcon />
                            </ListItemIcon>
                            <ListItemText inset primary="Help and FAQ" />
                    </ListItem>
                </Link>
                <Divider className={classes.divider}/>
                {/* 
                    <ListItem button disabled>
                        <ListItemIcon>
                            <Icon className={classnames(classes.icon,'fas fa-search')} />
                        </ListItemIcon>
                        <ListItemText inset primary="Track and Watch" />
                    </ListItem>
                
                
                    <ListItem button disabled>
                        <ListItemIcon><Icon className={classnames(classes.icon, 'fas fa-balance-scale')} /></ListItemIcon>
                        <ListItemText primary="Regulatory Developments" />
                    </ListItem>
                
                
                    <ListItem button disabled>
                        <ListItemIcon><Icon className={classnames(classes.icon,'fas fa-newspaper')} /></ListItemIcon>
                        <ListItemText primary="Media & Commentary" />
                    </ListItem>
                
                <ListItem button disabled>
                    <ListItemIcon><Icon className={classnames(classes.icon,'fas fa-book')} /></ListItemIcon>
                    <ListItemText primary="Research & Reports" />
                </ListItem>
                <Divider />
                
                    <ListItem button disabled>
                        <ListItemIcon><StarIcon /></ListItemIcon>
                        <ListItemText primary="Your Watchlists" />
                    </ListItem>
                
                
                    <ListItem button disabled>
                        <ListItemIcon><BookmarksIcon /></ListItemIcon>
                        <ListItemText primary="Reading List" />
                    </ListItem>
                <ListItem button disabled>
                    <ListItemIcon><HistoryIcon /></ListItemIcon>
                    <ListItemText primary="Recent Searches" />
                </ListItem>
                <ListItem button disabled>
                    <ListItemIcon><DraftsIcon /></ListItemIcon>
                    <ListItemText primary="Your Mail List" />
                </ListItem> */}
                {/*
                <Link to="/search/">
                    <ListItem button>
                        <ListItemIcon>
                            <Icon className={classnames(classes.icon,'fas fa-search')} />
                        </ListItemIcon>
                        <ListItemText inset primary="Track and Watch" />
                    </ListItem>
                </Link>
                <Link to="/search/regulation">
                    <ListItem button>
                        <ListItemIcon><Icon className={classnames(classes.icon, 'fas fa-balance-scale')} /></ListItemIcon>
                        <ListItemText primary="Regulatory Developments" />
                    </ListItem>
                </Link>
                <Link to="/search/media-and-commentary">
                    <ListItem button>
                        <ListItemIcon><Icon className={classnames(classes.icon,'fas fa-newspaper')} /></ListItemIcon>
                        <ListItemText primary="Media & Commentary" />
                    </ListItem>
                </Link>
                <ListItem button disabled>
                    <ListItemIcon><Icon className={classnames(classes.icon,'fas fa-book')} /></ListItemIcon>
                    <ListItemText primary="Research & Reports" />
                </ListItem>
                <Divider />
                <Link to="/watchlist">
                    <ListItem button>
                        <ListItemIcon><StarIcon /></ListItemIcon>
                        <ListItemText primary="Your Watchlists" />
                    </ListItem>
                </Link>
                <Link to="/reading-list">
                    <ListItem button>
                        <ListItemIcon><BookmarksIcon /></ListItemIcon>
                        <ListItemText primary="Reading List" />
                    </ListItem>
                </Link>
                <ListItem button disabled>
                    <ListItemIcon><HistoryIcon /></ListItemIcon>
                    <ListItemText primary="Recent Searches" />
                </ListItem>
                <ListItem button disabled>
                    <ListItemIcon><DraftsIcon /></ListItemIcon>
                    <ListItemText primary="Your Mail List" />
                </ListItem>
                */}
            </List>
            <Hidden mdDown>
                <div className={classes.sidebarFooter}>
                    <Divider />
                    <div className={classes.padding}>
                        <Footer isSideDrawerExpanded={isSideDrawerExpanded}/>
                    </div>
                </div>
            </Hidden>
        </div>
        )
    return (
        //Just make Drawer to test
        !isFullScreen&&(isWidthUp("lg",width)?
        <Drawer
            classes={{
                paper: isSideDrawerExpanded?classes.drawerPaper:[classes.drawerPaper,classes.drawerPaperClose].join(" "),
            }}
            variant="permanent"
            open={isSideDrawerExpanded}
            elevation={20}
            >
            <div className={classes.toolbar}>

            </div>
            <div
                tabIndex={0}
                role="button"
                style={{height: "100%", widht: "100%", overflow: "hidden"}}
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
        isFullScreen: state.view.isFullScreen
    }}

const SideDrawerToggleContainerWithStore = connect(mapStateToProps, menuActions)(withWidth()(withStyles(styles, { withTheme: true })(SideDrawerToggleContainer)))

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
            {isSignedIn&&loginFlow.isComplete&&<SideDrawerToggleContainerWithStore/>}
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Routes isSignedIn={isSignedIn}/>
            </main>
        </div>
    )
}

export default withStyles(styles)(AuthView)