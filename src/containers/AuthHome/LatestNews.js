import React from 'react'
import Card from '@material-ui/core/Card'

import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { connect } from 'react-redux'
import * as actions from './../../store/actions/actionManagerActions'

import { Scrollbars } from 'react-custom-scrollbars';

import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom'

import CreateIcon from '@material-ui/icons/Create';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteIcon from '@material-ui/icons/Delete';
import CompleteIcon from '@material-ui/icons/Done';
import UrgentIcon from '@material-ui/icons/Whatshot';
import AssignedIcon from '@material-ui/icons/PersonAdd';
import UploadIcon from '@material-ui/icons/Cloud';
import InviteIcon from '@material-ui/icons/GroupAdd';
import ScheduleIcon from '@material-ui/icons/Schedule';
import UserIcon from '@material-ui/icons/Person';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment'
import Button from '@material-ui/core/Button';


const TeamUserIcon = (props) => {
    const displayName = props.userId&&props.users&&props.users.filter(i=>i.userId===props.userId).length>0&&props.users.filter(i=>i.userId===props.userId)[0].displayName
    const initials = displayName&&displayName.split(" ").map(i=>[...i][0]).join("")
    const email = props.userId&&props.users&&props.users.filter(i=>i.userId===props.userId).length>0&&props.users.filter(i=>i.userId===props.userId)[0].email
    if (props.displayName){
        return displayName || email || "A team member"
    } else  {
        return initials || <UserIcon />
    }
}

const mapState2Props = (state) => {
    return {
        users: state.organisation&&state.organisation.users,
    }
}

const TeamUser = connect( mapState2Props )(TeamUserIcon)

const getEventDisplay = (type) => {
    switch(type){
        case "CREATE_PROJECT":
            return {icon: <CreateIcon />, text: ({ data:{ title }})=>`created a new project ${title}.`}
        case "UPDATE_PROJECT":
            return {icon: <UpdateIcon />, text: ({ data:{ title }})=>`updated the project ${title}`}
        case "DELETE_PROJECT":
            return {icon: <DeleteIcon />, text: ({ data:{ title }})=>`deleted the project ${title}.`}
        case "CREATE_ACTION":
            return {icon: <CreateIcon />, text: ()=>`created a new action!`}
        case "UPDATE_ACTION":
            return {icon: <UpdateIcon />, text: ()=>`updated an action.`}
        case "DELETE_ACTION":
            return {icon: <DeleteIcon />, text: ()=>"deleted an action."}
        case "COMPLETED_ACTION":
            return {icon: <CompleteIcon />, text: ()=>"marked an action as complete."}
        case "MARK_AS_URGENT_ACTION":
            return {icon: <UrgentIcon />, text: ()=>"marked an action as urgent."}
        case "ASSIGN_TO_ACTION":
            return {icon: <AssignedIcon />, text: (props)=><span>assigned <TeamUser userId={props.data.ownerId} displayName/> to an obligation.</span>}
        case "SCHEDULE_ACTION":
            return {icon: <ScheduleIcon />, text: ()=>"scheduled an action to recur."}
        case "UPLOADED_FILE":
            return {icon: <UploadIcon />, text: ()=>"uploaded a new file."}
        case "CREATE_TASK":
            return {icon: <CreateIcon />, text: ()=>"created a new task."}
        case "UPDATE_TASK":
            return {icon: <UpdateIcon />, text: ()=>"updated a task."}
        case "DELETE_TASK":
            return {icon: <DeleteIcon />, text: ()=>"deleted a task"}
        case "COMPLETED_TASK":
            return {icon: <CompleteIcon />, text: ()=>"marked a task as complete."}
        case "INVITED_TO_TEAM":
            return {icon: <InviteIcon />, text: ()=>""}
        default: 
            return {icon: null, text: ""}
    }

}

const EventItem = (props) => {
    const type = getEventDisplay(props["EVENT_TYPE"])
    return ([type&&<ListItem>
        <Avatar style={{background: "#ffa9c4", color: "#c34666"}}>
            {type.icon}
        </Avatar>
        <ListItemText primary={<span><TeamUser userId={props.data.updatedBy||props.data.createdBy} displayName/> {type.text(props)}</span>} secondary={moment(props.createdAt).fromNow()} />
        <ListItemSecondaryAction style={{paddingRight: 24 }}>
            <Avatar style={{background:"#623aa2", fontSize: 14, fontWeight: 300}}>
                <TeamUser userId={props.data.updatedBy||props.data.createdBy} />
            </Avatar>
        </ListItemSecondaryAction>
    </ListItem>,
    <Divider />])
}
  /*
        created a project, CREATE
        updated a project, UPDATE
        deleted a project, DELETE_OUTLINE
        added an action, CREATE
        updated an action, UPDATE
        deleted an action, DELETE_OUTLINE
        marked an action as complete, DONE
        marked an action as urgent, WHATSHOT
        assigned XX to an action, PERSON_ADD
        scheduled an action to occur every XX, SCHEDULE
        uploaded a file, CLOUD
        added a task, CREATE
        updated a task, UPDATE
        deleted a task, DELETE_OUTLINE
        marked a task as complete, DONE
        invited XX to the team GROUP_ADD
    */

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
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit
    },
    fixedSide: {

    },
    bottomMargin: {
        marginBottom: theme.spacing.unit*4,
    },
    summaryInnerCard: {
        
    },
    cardFlex: {
        display: 'flex',
        marginBottom: theme.spacing.unit*4,
    },
})

const O2A = (o) => Object.keys(o).map(k=>o[k])

class EventContainer extends React.Component {
    componentDidUpdate() {
        !this.props.hasSubscribed&&this.props.getComplianceManagerLatestEvents()
    }

    componentDidMount(){
        this.props.hasOrganisation&&!this.props.hasSubscribed&&this.props.getComplianceManagerLatestEvents()
    }

    render(){
        const { classes, actionManager: { events }, isLoadingLatestEvents, isMobile } = this.props
        const bg = "#ddd"
        const LoadingItem = () => (
            <div className={classes.updateContainer}>
                <div
                    className={classes.cover}
                    style={{background: bg}}
                />
                <div style={{flex: 1, marginLeft: 20}}>
                    <div
                        style={{background: bg, height: 24, width: 300, borderRadius: 5, marginBottom: 4}}
                    />
                    <div
                        style={{background: bg, height: 21, width: 160, borderRadius: 5, marginBottom: 4}}
                    />
                    <div
                        style={{background: bg, height: 32, width: 700, borderRadius: 5}}
                    />
                </div>
            </div>
        )
  
        const eventsArray = events?O2A(events).sort((a,b)=>b.createdAtUNIX-a.createdAtUNIX):[]
        const hasEvents = eventsArray.length>0
        return (
            !isMobile?<Card style={{height: "82vh", overflow: "hidden", width: "100%"}}>
                    <AppBar position="static" color="default">
                        <Toolbar variant="dense">
                            <Typography variant="subheading" color="inherit" style={{flex: 1}}>
                                Latest Team Activity
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Scrollbars
                        style={{ height: "93%", padding: 16 }}>
                        {!hasEvents&&<div style={{padding: 64, height: "100%", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginTop: -32}}>
                        <img src="https://www.freeiconspng.com/uploads/rocket-png-26.png" alt="" width="200px" style={{filter: "grayscale(100%)"}}/>
                        <Typography variant="subheading" marginBottom style={{marginBottom: 16, marginTop: 16}} align="center">It looks like your team is all setup but you have no events yet.</Typography>
                        <Typography variant="body" align="center" marginBottom >Events are created from creating, deleting and updating projects, actions and tasks in your teams compliance workspace.</Typography>
                        <Link to="/compliance-workspace"><Button variant="extendedFab" color="secondary" style={{marginTop:32, color: "white"}}>Let's get started</Button></Link>
                    </div>}
                        {hasEvents&&<List dense>
                            {eventsArray.map(i=><EventItem key={i.eventId} {...i}/>)}
                        </List>}
                    </Scrollbars>
                </Card>
                :
                <div>
                    <Typography align="center" variant="subheading">Latest Team Activity</Typography>
                    {hasEvents&&<List dense>
                        {eventsArray.map(i=><Card style={{margin: 8}}><EventItem key={i.eventId} {...i}/></Card>)}
                    </List>}
                </div>
            )
    }
}

const mapStateToProps = (state) => {
    return {
        actionManager: state.actionManager,
        hasSubscribed: state.actionManager.projectsStatus.isSubscribedToLatestEvents,
        isLoadingLatestEvents: state.actionManager.projectsStatus.isLoadingLatestEvents,
        hasOrganisation: state.organisation.organisationId
    }
}
export default connect( mapStateToProps, actions )(withStyles(styles)(EventContainer))