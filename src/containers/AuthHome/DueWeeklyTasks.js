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

const styles = (theme) => ({
    root: {
        padding: theme.spacing.unit*4,
        height: "92vh",
        overflow: "scroll"
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
    }
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
        const { classes, actionManager: { projectsStatus }, hideNavButton } = this.props
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
                <ListItem button>
                    <div style={{height: 40, width: 4, borderRadius: 4, opacity: 0.7, background: highlightColor}}/>
                    <ListItemText primary={attrs.title} secondary={`${attrs.dueDate?`Due ${moment(attrs.dueDate).fromNow()}`:"No due date"} - ${attrs.taskCount||"No"} tasks.`}/>
                    <Chip
                        style={{color: highlightColor}}
                        avatar={<Avatar style={{color: highlightColor}}>{message[0]}</Avatar>}
                        label={message[1]} />
                </ListItem>
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

        const tasksArray = projectsStatus&&O2A(projectsStatus.currentAssignedActions).sort((a,b)=>moment(b.dueDate).isBefore(a.dueDate))

        return (
            <Card className={classes.bottomMargin} style={{height: "40vh", marginTop: this.props.marginTop}}>
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
                <div style={{height: "85%", overflow: "scroll", display: "flex", justifyContent: "center", alignItems: "center"}}>
                    {!isFetching&&tasksArray.length===0&&<Typography variant="caption">Savour this moment. You have no assigned obligations.</Typography>}
                    <List component="nav" dense>
                        {(isFetching)&&[...Array(6)].map((k)=><ListItemLoader key={k}/>)}
                        {(tasksArray.length>0&&!isFetching)&&tasksArray.map(i=><ObligationItem key={i.id} {...i}/>)}
                    </List>
                </div>
            </Card>
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