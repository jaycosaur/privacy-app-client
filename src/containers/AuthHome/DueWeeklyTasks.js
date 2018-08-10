import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ViewIcon from '@material-ui/icons/ViewHeadline';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';

import DoneIcon from '@material-ui/icons/Check';
import HourglassIcon from '@material-ui/icons/HourglassEmpty';
import ErrorIcon from '@material-ui/icons/ErrorOutline';
import UrgentIcon from '@material-ui/icons/Whatshot';
import TimerIcon from '@material-ui/icons/Timer';

import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'
import yellow from '@material-ui/core/colors/yellow'

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import moment from 'moment'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

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

const HomeView = (props) => {
    const { classes, actionManager: { projects, projectsStatus } } = props

    const isFetching = projectsStatus.isFetchingCurrentAssignedTasksAndActions

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

    const ListItemLoader = (attrs) => (
        <ListItem button>
            <div style={{height: 40, width: 4, borderRadius: 4, opacity: 0.7, background: bg}}/>
            <div style={{marginLeft: 16, marginRight: 16, flex: 1}}>
                <div style={{width: 220, height: 18, marginBottom: 4, background: bg, borderRadius: 5}}/>
                <div style={{width: 160, height: 18, background: bg, borderRadius: 5}}/>
            </div>
            <Chip
                avatar={<Avatar style={{background: "#eee"}}/>}
                label={<div style={{width: 40, height: 20}}/>} />
        </ListItem>
    )

    const tasksArray = projectsStatus&&O2A(projectsStatus.currentAssignedActions).sort((a,b)=>moment(b.dueDate).isBefore(a.dueDate))

    return (
        <Card className={classes.bottomMargin} style={{height: "40vh", marginTop: props.marginTop}}>
            <AppBar position="static" color="secondary">
                <Toolbar variant="dense">
                    <Typography variant="subheading" color="inherit" style={{flex: 1, color: "white"}}>
                        Your Assigned Obligations
                    </Typography>
                    {!props.hideNavButton&&<Tooltip title="View in compliance workspace">
                        <Link to="/compliance-workspace">
                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                <ViewIcon />
                            </IconButton>
                        </Link>
                    </Tooltip>}
                </Toolbar>
            </AppBar>
            <div style={{height: "85%", overflow: "scroll"}}>
                <List component="nav" dense>
                    {(isFetching)&&[...Array(6)].map((i,k)=><ListItemLoader key={k}/>)}
                    {(tasksArray&&!isFetching)&&tasksArray.map(i=><ObligationItem key={i.id} {...i}/>)}
                </List>
            </div>
        </Card>
    )}

const mapStateToProps = (state, ownProps) => {
    return {
        actionManager: state.actionManager
    }
}
export default connect( mapStateToProps )(withStyles(styles)(HomeView))