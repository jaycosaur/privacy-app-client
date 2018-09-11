import React from 'react'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import ViewIcon from '@material-ui/icons/ViewHeadline';
import Tooltip from '@material-ui/core/Tooltip';

import DoneIcon from '@material-ui/icons/Check';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import UrgentIcon from '@material-ui/icons/Whatshot';
import TimerIcon from '@material-ui/icons/Timer';

import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import moment from 'moment'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

import * as actions from './../../store/actions/actionManagerActions'
import { Scrollbars } from 'react-custom-scrollbars';

import classnames from 'classnames'

const heightOfCard = "40vh"

const styles = (theme) => ({
    root: {
        padding: theme.spacing.unit*4,
        height: "92vh",
        overflowX: "scroll"
    },
    buttonCard: {

    },
    bigAvatar: {
        width: 60,
        height: 60,
    },
    cover: {
        width: 90,
        height: 90,
        borderRadius: 10
    },
    coverBig: {
        width: 120,
        height: 120,
    },
    updateContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: theme.spacing.unit*2,
        paddingBottom: theme.spacing.unit*2
    },
    fixedSide: {

    },
    bottomMargin: {
        marginBottom: theme.spacing.unit*2,
    },
    summaryInnerCard: {
        
    },
    cardFlex: {
        display: 'flex',
        marginBottom: theme.spacing.unit*4,
    },
    menuButton: {
        color: "white"
    },
    scrollbarContainer: {
        height: `calc(${heightOfCard} - ${theme.mixins.toolbar.minHeight}px)`,
        display: "flex", justifyContent: "center"
    },
    cardContainer: {
        height: heightOfCard
    },
    cardContainerMobile: {
        height: "100%" 
    },

})

const O2A = (o) => Object.keys(o).map(k=>o[k])

class HomeView extends React.Component {
    componentDidUpdate() {
        !this.props.hasSubscribed&&this.props.getCurrentUserAssignedTasksAndActions()
    }

    componentDidMount(){
        !this.props.hasSubscribed&&this.props.getCurrentUserAssignedTasksAndActions()
    }

    render(){
        const { classes, actionManager: { projectsStatus }, hideNavButton, isMobile } = this.props
        const isFetching = projectsStatus.isLoadingCurrentAssignedTasksAndActions

        const ObligationItem = (attrs) => {
            let highlightColor = null
            let message = null
            switch(true){
                case (attrs.status==="DONE"):
                    highlightColor = green[500]
                    message = [<DoneIcon />, "DONE"]
                    break
                case (moment(attrs.dueDate).isBefore(moment())):
                    highlightColor = red[500]
                    message = [<ErrorIcon />, "OVERDUE"]
                    break
                case (attrs.isUrgent):
                    highlightColor = "#f97794"
                    message = [<UrgentIcon />, "URGENT"]
                    break
                case (attrs.status==="INPROGRESS"):
                    highlightColor = "#623aa2"
                    message = [<TimerIcon />, "DOING"]
                    break
                default:
                    highlightColor = "#623aa2"
                    message = [<TimerIcon />, "TODO"]
            }
            return (
                <Link to={`/compliance-workspace/${attrs.projectId}/${attrs.actionId}/`}>
                    <ListItem button>
                        <div style={{height: 40, width: 4, borderRadius: 4, opacity: 0.7, background: highlightColor}}/>
                        <ListItemText primary={attrs.title} secondary={`${attrs.dueDate?`Due ${moment(attrs.dueDate).fromNow()}`:"No due date"} - ${attrs.taskCount||"No"} tasks.`}/>
                        <Chip
                            style={{color: highlightColor}}
                            avatar={<Avatar style={{color: highlightColor}}>{message[0]}</Avatar>}
                            label={message[1]} />
                    </ListItem>
                </Link>
            )
        }

        const bg = "#ddd"

        const ListItemLoader = () => (<ListItem button>
            <div style={{ height: 40, width: 4, borderRadius: 4, opacity: 0.7, background: bg }} />
            <div style={{ marginLeft: 16, marginRight: 16, flex: 1 }}>
                <div style={{ width: 220, height: 18, marginBottom: 4, background: bg, borderRadius: 5 }} />
                <div style={{ width: 160, height: 18, background: bg, borderRadius: 5 }} />
            </div>
            <Chip avatar={<Avatar style={{ background: "#eee" }} />} label={<div style={{ width: 40, height: 20 }} />} />
        </ListItem>)

        const tasksArray = projectsStatus&&projectsStatus.currentAssignedActions&&O2A(projectsStatus.currentAssignedActions).sort((a,b)=>moment(b.dueDate).isBefore(moment(a.dueDate))).filter(i=>i.status!=="DONE")
        
        return (
            !isMobile?<Card square={this.props.square} className={classnames(classes.bottomMargin,classes.cardContainer)} style={{marginTop: this.props.marginTop}}>
                <AppBar position="static" color="secondary">
                    <Toolbar variant="dense">
                        <Typography variant="subheading" color="inherit" style={{flex: 1, color: "white"}}>
                            Your Assigned Obligations
                        </Typography>
                        {!hideNavButton&&<Tooltip title="View in compliance workspace">
                            <Link to="/compliance-workspace">
                                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                    <ViewIcon />
                                </IconButton>
                            </Link>
                        </Tooltip>}
                    </Toolbar>
                </AppBar>
                <Scrollbars className={classes.scrollbarContainer}>
                    {!isFetching&&tasksArray&&tasksArray.length===0&&<div style={{padding: 32, height: "100%", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: -32}}>
                        <Typography variant="subheading" marginBottom style={{marginBottom: 16}} align="center">Savour this moment. You have no assigned obligations.</Typography>
                        <Typography variant="caption" align="center">Your assigned actions, their status and their due dates will be shown here. You currently don't have any assigned actions, you can assign actions through projects.</Typography>
                    </div>}
                    <List component="nav" dense>
                        {(isFetching)&&[...Array(6)].map((k)=><ListItemLoader key={k}/>)}
                        {(tasksArray&&tasksArray.length>0&&!isFetching)&&tasksArray.map(i=><ObligationItem key={i.actionId} {...i}/>)}
                    </List>
                </Scrollbars>
            </Card>:
            <div>
                <Typography align="center" variant="subheading">Your Assigned Obligations</Typography>
                {!isFetching&&tasksArray&&tasksArray.length===0&&<div style={{padding: 32, height: "100%", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: -32}}>
                    <Typography variant="subheading" marginBottom style={{marginBottom: 16}} align="center">Savour this moment. You have no assigned obligations.</Typography>
                    <Typography variant="caption" align="center">Your assigned actions, their status and their due dates will be shown here. You currently don't have any assigned actions, you can assign actions through projects.</Typography>
                </div>}
                <List component="nav" dense>
                    {(isFetching)&&[...Array(6)].map((k)=><ListItemLoader key={k}/>)}
                    {(tasksArray&&tasksArray.length>0&&!isFetching)&&tasksArray.map(i=><Card style={{margin: 8}}><ObligationItem key={i.actionId} {...i}/></Card>)}
                </List>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        actionManager: state.actionManager,
        hasSubscribed: state.actionManager.projectsStatus.isSubscribedCurrentAssignedTasksAndActions,
        isLoading: state.actionManager.projectsStatus.isLoadingCurrentAssignedTasksAndActions
    }
}
export default connect( mapStateToProps, actions)(withStyles(styles)(HomeView))