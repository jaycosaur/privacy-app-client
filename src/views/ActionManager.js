import React from 'react'
import { Link } from 'react-router-dom'
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import Moment from 'react-moment'
import moment from 'moment'
import { withStyles } from '@material-ui/core/styles';

import ActionManagerTopActionBar from '../containers/ActionManagerTopActionBar'
import AddIcon from '@material-ui/icons/Add';

import AuthViewRouteContainer from './AuthViewRouteContainer'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CardActions from '@material-ui/core/CardActions';
import Badge from '@material-ui/core/Badge'
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ButtonBase from '@material-ui/core/ButtonBase'
import StarIcon from '@material-ui/icons/Star'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import LaunchIcon from '@material-ui/icons/Launch'
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux'
import * as reduxActions from './../store/actions/actionManagerActions'

const styles = theme => ({
    card: {
        minWidth: 275,
        background: theme.palette.secondary.light//lighten(theme.palette.secondary.light, 1),
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: theme.spacing.unit*4,
    },
    root: {
        padding: theme.spacing.unit*4
    },
    projectCardRoot: {
        display: "flex",
    },
    projectCardColor: {
        width: theme.spacing.unit*4,
        background: theme.palette.secondary.main,
        alignSelf: "stretch",
        borderRadius: 0
    },
    projectCardInfoPanel: {
        borderRadius: 0
    },
    projectCardMainPanel: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    margin: {
        margin: theme.spacing.unit,
    },
    buttonGreen: {
        background: green[500]
    },
    buttonYellow: {
        background: yellow[500]
    },
    buttonRed: {
        background: red[500]
    }
  });


class ToggleState extends React.Component {
    state = {
        isToggled: this.props.initialState || false
    }
    handleToggle = () => {
        this.setState(state=>({isToggled: !state.isToggled}))
    }
    render() {
        return (
            <ButtonBase style={{borderRadius: 100}} onClick={this.handleToggle}>
                {this.props.render(this.state.isToggled,this.handleToggle)}
            </ButtonBase >
        )
    }
}

class ActionManager extends React.Component {


    componentDidUpdate(){
        if (this.props.organisation.hasFetched&&!this.props.projectsStatus.lastLoadTime&&!this.props.projectsStatus.isLoadingProjects){
            this.props.getProjectsInManager()
            this.props.getTeamSnapshotStatistics()
            this.props.getCurrentUserAssignedTasksAndActions()
        }
    }

    componentDidMount(){
        if (this.props.organisation.hasFetched){
            this.props.getProjectsInManager()
            this.props.getTeamSnapshotStatistics()
            this.props.getCurrentUserAssignedTasksAndActions()
        }
    }

  render() {
    const { classes, projects, projectsStatus: { isLoadingProjects, isFetchingCurrentAssignedTasksAndActions, currentAssignedActions, currentAssignedTasks } } = this.props

    const Dummy = (props) => <div {...props} style={{...props.style, background: props.alt?"#eee":"#ddd"}} />

    const ProjectCardLoader = () => (
        <Card style={{ marginBottom: 16, opacity:0.6, position: 'relative', background: "#eee"}} elevation={0}>
            <div className={classes.projectCardRoot}>
                <Card className={classes.projectCardColor} elevation={0} style={{background: "#ddd"}}>
                    <div style={{ display: "flex", justifyContent: "center", marginTop: 8, color: "white", borderRadius: 100 }}>
                        <Dummy alt style={{width: 24, height: 24, borderRadius: 50}}/>
                    </div>
                </Card>
                <div className={classes.projectCardMainPanel}>
                    <CardContent>                        
                        <Dummy style={{width: 400, height: 24, borderRadius: 4, marginBottom: 8}}/>
                        <Dummy style={{width: 300, height: 42, borderRadius: 4, marginBottom: 14}}/>
                        <Dummy style={{width: 200, height: 21, borderRadius: 4, marginBottom: 14}}/>
                        <Dummy style={{width: 200, height: 21, borderRadius: 4, marginBottom: 14}}/>
                    </CardContent>
                    <CardActions>
                        <Dummy style={{width: 80, height: 32, borderRadius: 4, marginRight: 8}}/>
                        <Dummy style={{width: 80, height: 32, borderRadius: 4}}/>
                        <div style={{ flexGrow: 1, justifyContent: "flex-end", display: "flex" }}>
                            <Dummy style={{width: 90, height: 32, borderRadius: 40, marginRight: 8}}/>
                            <Dummy style={{width: 90, height: 32, borderRadius: 40}}/>
                        </div>
                    </CardActions>
                </div>
                <Card className={classes.projectCardInfoPanel} elevation={1} style={{background: "#eee"}}>
                    <CardContent style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <Dummy style={{width: 90, height: 32, borderRadius: 4, marginTop: 8}}/>
                        <Dummy style={{width: 90, height: 32, borderRadius: 4, marginTop: 8}}/>
                        <Dummy style={{width: 90, height: 32, borderRadius: 4, marginTop: 8}}/>
                    </CardContent>
                </Card>
            </div>
        </Card>)
    
    const ProjectCard = ({data}) => (<Card style={{ marginBottom: 16, opacity: data.isDeleting&&0.6, position: 'relative', }} key={data.projectId}>
        {data.isDeleting&&<CircularProgress style={{
                color: red[500],
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: -30,
                marginLeft: -30,}} size={60} />}
        <div className={classes.projectCardRoot}>
            <Card className={classes.projectCardColor} elevation={4}>
                <div style={{ display: "flex", justifyContent: "center", marginTop: 8, color: "white", borderRadius: 100 }}>
                    <ToggleState initialState={data.isFavorited} render={(is) => is ? <StarIcon /> : <StarBorderIcon />} />
                </div>
            </Card>
            <div className={classes.projectCardMainPanel}>
                <CardContent style={{display: "flex", alignSelf: "stretch", flexDirection: "column", justifyContent: "space-between", flexGrow: 1}}>
                    <div>
                        <Typography variant="title" gutterBottom>{data.title}</Typography>
                        <Typography variant="subheading">{data.description}</Typography>
                    </div>
                    <Typography variant="caption">Created: <Moment fromNow>{data.created}</Moment></Typography>
                </CardContent>
                <CardActions>
                    <Link to={`/action-manager/${data.projectId}`} onClick={()=> this.props.selectProjectInManager({projectId: data.projectId})}>
                        <Button size="small" color="primary" disabled={data.isDeleting}>
                            EXPLORE
                        </Button>
                    </Link>
                    <Button size="small" color="primary" disabled>
                        SHARE
                    </Button>
                    <div style={{ flexGrow: 1, justifyContent: "flex-end", display: "flex" }}>
                        <Chip label={`${data.actionCount || 0} ACTIONS`} style={{marginRight: 8}}/><Chip label={`${data.taskCount || 0} TASKS`} />
                    </div>
                </CardActions>
            </div>
            <Card className={classes.projectCardInfoPanel} elevation={4}>
                <CardContent style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Link to={`/action-manager/${data.projectId}?status=done&sort=none`} onClick={()=> this.props.selectProjectInManager({projectId: data.projectId})}>
                        <Badge color="secondary" badgeContent={data.doneCount || 0} className={classes.margin}>
                            <Button size="small" variant="contained" style={{ flexGrow: 1 }}>
                                DONE
                            </Button>
                        </Badge>
                    </Link>
                    <Link to={`/action-manager/${data.projectId}?status=overdue&sort=none`}>
                        <Badge color="secondary" badgeContent={data.overdueCount || 0} className={classes.margin} onClick={()=> this.props.selectProjectInManager({projectId: data.projectId})}>
                            <Button size="small" variant="contained" style={{ flexGrow: 1 }}>
                                OVERDUE
                            </Button>
                        </Badge>
                    </Link>
                    <Link to={`/action-manager/${data.projectId}?status=alert&sort=none`}>
                        <Badge color="secondary" badgeContent={data.alertCount || 0} className={classes.margin} onClick={()=> this.props.selectProjectInManager({projectId: data.projectId})}>
                            <Button size="small" variant="contained" style={{ flexGrow: 1 }}>
                                ALERTS
                            </Button>
                        </Badge>
                    </Link>
                </CardContent>
            </Card>
        </div>
    </Card>)

    const TaskListContainer = ({ isLoading, assignedTasks, assignedActions }) => {
        return (
            <Card style={{ marginTop: 16, height: "40vh", overflow: "scroll", background: isLoading&&"#eee", opacity: isLoading&&0.6 }} elevation={isLoading?0:4}>
                {!isLoading&&(assignedTasks.length>0||assignedActions.length>0?(
                    <List>
                        {assignedActions.map(a=><TaskListItem status={"0"} {...a} link={`action-manager/${a.projectId}/${a.id}`}/>)}
                        {assignedTasks.map(() => <TaskListItem status={"1"} />)}
                    </List>
                ):<div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <img src="https://cdn.pixabay.com/photo/2017/09/12/21/07/solar-system-2743669_1280.png" width="30%" style={{opacity: 0.7, filter: "grayscale(100%)", marginBottom: 32}}/>
                    <Typography variant="subtitle">You have no actions or tasks</Typography>
                </div>)
            }
            </Card>
        )
    }

    const TaskListItem = (attr) => (
        <ListItem button dense>
            <div style={{background: attr.status==="DONE"?green['A100']:attr.status==="1"?amber["A100"]:red["A100"], width: 4, alignSelf: "stretch", borderRadius: 6}}/>
            <ListItemText primary={attr.title||"New Action!"} secondary={`Has ${attr.taskCount||"no"} tasks - `}/>
            <ListItemSecondaryAction>
                <Link to={attr.link}>
                    <IconButton aria-label="Comments">
                        <LaunchIcon />
                    </IconButton>
                </Link>
            </ListItemSecondaryAction>
        </ListItem>
    )

    const SummaryCard = (attr) => (
        <Card style={{ height: "35vh", overflow: "scroll", background: attr.isLoading&&"#eee", opacity: attr.isLoading&&0.6  }} elevation={attr.isLoading?0:4}>
            {!attr.isLoading&&!attr.projects&&<div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <img src="https://cdn.pixabay.com/photo/2017/09/12/21/07/solar-system-2743669_1280.png" width="30%" style={{opacity: 0.7, filter: "grayscale(100%)", marginBottom: 32}}/>
                <Typography variant="subtitle">Your have no projects.</Typography>
            </div>}

            {!attr.isLoading&&attr.projects&&<CardContent>
                <Typography variant="headline">Team Snapshot</Typography>
                <List dense>
                    <ListItem>
                        <ListItemText primary="Number of Projects"/>
                        <ListItemSecondaryAction>
                            <Chip label={attr.projects} />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Number of Actions"/>
                        <ListItemSecondaryAction>
                            <Chip label={attr.actions} />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Number of Tasks"/>
                        <ListItemSecondaryAction>
                            <Chip label={attr.tasks} />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Number of Done Actions"/>
                        <ListItemSecondaryAction>
                            <Chip label={attr.doneActions} />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Number of Overdue Actions"/>
                        <ListItemSecondaryAction>
                            <Chip label={attr.overdueActions} />
                        </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Number of Alert Actions"/>
                        <ListItemSecondaryAction>
                            <Chip label={attr.alertActions} />
                        </ListItemSecondaryAction>
                    </ListItem>
                </List> 
            </CardContent>}
        </Card>
    )
    const hasProjects = projects.length!==0
    const transformO2A = (o) => Object.keys(o).map(k=>o[k])

    return (
        <AuthViewRouteContainer topbar={<ActionManagerTopActionBar/>}>
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={8} style={{height: "85vh", overflow: "scroll"}}>
                        {isLoadingProjects&&!hasProjects&&[<ProjectCardLoader />,
                        <ProjectCardLoader />,
                        <ProjectCardLoader />]}
                        {hasProjects&&projects.sort((a,b)=>moment(a.created).isBefore(b.created)).map(i=><ProjectCard data={i} key={i.projectId}/>)}
                        {!isLoadingProjects&&!hasProjects&&(
                            <div style={{height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                                <img src="https://www.freeiconspng.com/uploads/rocket-png-26.png" width="260px" style={{filter: "grayscale(100%)"}}/>
                                <Typography style={{margin: "32px 0 16px"}} variant="headline">Hold up! It looks like you have no projects.</Typography>
                                <Typography style={{margin: "0px 0 48px", color: "#9e9e9e"}} variant="title"> Click on the + button to get started</Typography>
                                <Button variant="extendedFab" color="secondary" onClick={()=>this.props.openCreateProjectsInManagerDialogue()}><AddIcon /> Add new project </Button>
                            </div>
                        )}
                    </Grid>
                    <Grid item xs={4}>
                        <SummaryCard 
                            isLoading={isFetchingCurrentAssignedTasksAndActions}
                            projects={projects.length} 
                            tasks={projects.map(i=>i.taskCount).filter(i=>i).reduce((t,i)=>t+i,0)} 
                            actions={projects.map(i=>i.actionCount).filter(i=>i).reduce((t,i)=>t+i,0)} 
                            doneActions={projects.map(i=>i.doneCount).filter(i=>i).reduce((t,i)=>t+i,0)} 
                            overdueActions={projects.map(i=>i.overdueCount).filter(i=>i).reduce((t,i)=>t+i,0)} 
                            alertActions={projects.map(i=>i.alertCount).filter(i=>i).reduce((t,i)=>t+i,0)} 
                            />
                        <TaskListContainer 
                            isLoading={isFetchingCurrentAssignedTasksAndActions} 
                            assignedTasks={transformO2A(currentAssignedTasks)} 
                            assignedActions={transformO2A(currentAssignedActions)} 
                            />
                    </Grid>
                </Grid>
            </div>
        </AuthViewRouteContainer>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        projects: Object.keys(state.actionManager.projects).map(key=>state.actionManager.projects[key]).sort((a,b)=>b.created-a.created),
        projectsStatus: state.actionManager.projectsStatus,
        organisation: state.organisation
    }
}

export default connect(mapStateToProps, {...reduxActions})(withStyles(styles)(ActionManager))
