import React from 'react'
import { Link } from 'react-router-dom'
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import Moment from 'react-moment'

import { withStyles } from '@material-ui/core/styles';

import ActionManagerTopActionBar from '../containers/ActionManagerTopActionBar'

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
        flex: 1
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

const View = (props) => {
    const { classes, projects, projectsStatus: { isLoadingProjects }, organisation } = props

    // loading projects if none exist yet
    function isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }
    const hasNoProjects = isEmpty(projects)
    if(hasNoProjects&&!isLoadingProjects&&organisation.hasFetched){
        props.getProjectsInManager()
    }
    

    const ProjectCard = ({data}) => (<Card style={{ marginBottom: 16 }} key={data.projectId}>
        <div className={classes.projectCardRoot}>
            <Card className={classes.projectCardColor} elevation={4}>
                <div style={{ display: "flex", justifyContent: "center", marginTop: 8, color: "white", borderRadius: 100 }}>
                    <ToggleState initialState={data.isFavorited} render={(is) => is ? <StarIcon /> : <StarBorderIcon />} />
                </div>
            </Card>
            <div className={classes.projectCardMainPanel}>
                <CardContent>
                    <div><h3>{data.title}</h3></div>
                    <p>{data.description}</p>
                    <p><small>Created: <Moment fromNow>{data.created}</Moment></small></p>
                    <p><small>Last Updated: <Moment fromNow>{data.updated}</Moment></small></p>
                </CardContent>
                <CardActions>
                    <Link to={`/action-manager/${data.projectId}`} onClick={()=> props.selectProjectInManager({projectId: data.projectId})}>
                        <Button size="small" color="primary">
                            EXPLORE
                        </Button>
                    </Link>
                    <Button size="small" color="primary" onClick={() => props.createProjectInManager()}>
                        SHARE
                    </Button>
                    <div style={{ flexGrow: 1, justifyContent: "flex-end", display: "flex" }}>
                        <Chip label={`${data.actionCount || 0} ACTIONS`} /><Chip label={`${data.taskCount || 0} TASKS`} />
                    </div>
                </CardActions>
            </div>
            <Card className={classes.projectCardInfoPanel} elevation={4}>
                <CardContent style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Link to={`/action-manager/${data.projectId}?status=done&sort=none`} onClick={()=> props.selectProjectInManager({projectId: data.projectId})}>
                        <Badge color="secondary" badgeContent={data.doneCount || 0} className={classes.margin}>
                            <Button size="small" variant="contained" style={{ flexGrow: 1 }}>
                                DONE
                            </Button>
                        </Badge>
                    </Link>
                    <Link to={`/action-manager/${data.projectId}?status=overdue&sort=none`}>
                        <Badge color="secondary" badgeContent={data.overdueCount || 0} className={classes.margin} onClick={()=> props.selectProjectInManager({projectId: data.projectId})}>
                            <Button size="small" variant="contained" style={{ flexGrow: 1 }}>
                                OVERDUE
                            </Button>
                        </Badge>
                    </Link>
                    <Link to={`/action-manager/${data.projectId}?status=alert&sort=none`}>
                        <Badge color="secondary" badgeContent={data.alertCount || 0} className={classes.margin} onClick={()=> props.selectProjectInManager({projectId: data.projectId})}>
                            <Button size="small" variant="contained" style={{ flexGrow: 1 }}>
                                ALERTS
                            </Button>
                        </Badge>
                    </Link>
                </CardContent>
            </Card>
        </div>
    </Card>)

    const TaskListContainer = () => (<Card style={{ marginTop: 16, maxHeight: "75vh", overflow: "scroll" }} elevation={1}>
        <List>
            <TaskListItem status={"0"} />
            <TaskListItem status={"2"} />
            <TaskListItem status={"1"} />
            <TaskListItem status={"2"} />
            <TaskListItem status={"1"} />
            <TaskListItem status={"0"} />
            <TaskListItem status={"2"} />
            <TaskListItem status={"1"} />
            <TaskListItem status={"2"} />
            <TaskListItem status={"1"} />
            <TaskListItem status={"0"} />
            <TaskListItem status={"2"} />
            <TaskListItem status={"1"} />
            <TaskListItem status={"2"} />
            <TaskListItem status={"1"} />
        </List>
    </Card>)

    const TaskListItem = (attr) => (
        <ListItem button dense>
            <div style={{background: attr.status==="0"?green['A100']:attr.status==="1"?amber["A100"]:red["A100"], width: 4, alignSelf: "stretch", borderRadius: 6}}/>
            <ListItemText primary="Action Item Name" secondary="Has 14 Tasks - Due Jan 9, 2014" />
            <ListItemSecondaryAction>
                <IconButton aria-label="Comments">
                    <LaunchIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )

    return (
        <AuthViewRouteContainer topbar={<ActionManagerTopActionBar/>}>
            <div className={classes.root}>
                <Grid container spacing={24}>
                    <Grid item xs={8} style={{maxHeight: "85vh", overflow: "scroll"}}>
                        {isLoadingProjects&&"Loading..."}
                        {!isLoadingProjects&&(projects.length===0?"No Projects":projects.map(i=><ProjectCard data={i} key={i.projectId}/>))}
                    </Grid>
                    <Grid item xs={4}>
                        <div>Your Actions <span style={{float:"right"}}>23 this week</span></div>
                        <TaskListContainer />
                    </Grid>
                </Grid>
            </div>
        </AuthViewRouteContainer>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        projects: Object.keys(state.actionManager.projects).map(key=>state.actionManager.projects[key]).sort((a,b)=>b.created-a.created),
        projectsStatus: state.actionManager.projectsStatus,
        organisation: state.organisation
    }
}

export default connect(mapStateToProps, {...reduxActions})(withStyles(styles)(View))
