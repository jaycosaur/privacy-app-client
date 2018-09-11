import React from 'react'
import { Link } from 'react-router-dom'
import yellow from '@material-ui/core/colors/yellow';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import Moment from 'react-moment'
import moment from 'moment'
import { withStyles } from '@material-ui/core/styles';
import YoutubeDialogView from './YoutubeDialogView'
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
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import { connect } from 'react-redux'
import * as reduxActions from './../store/actions/actionManagerActions'

import DueTasks from './../containers/AuthHome/DueWeeklyTasks'
import ProjectOverview from './../containers/AuthHome/ProjectOverview'
import Hidden from '@material-ui/core/Hidden';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import { Scrollbars } from 'react-custom-scrollbars';

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
        padding: theme.spacing.unit*2,
        [theme.breakpoints.down('sm')]: {
            padding: 0
        }
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
    },
    blankRoot: {
        height: "80vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
  });

class ProjectCard extends React.Component {
    componentWillMount(){
        this.props.getActionsInSpecificProject({projectId: this.props.data.projectId})
    }

    render(){
        const {data, number, classes} = this.props
        const overdueActions = data.actions&&Object.keys(data.actions).map(key=>data.actions[key]).filter(i=>i.status!=="DONE"&&moment(i.dueDate).isBefore(moment()))
        return (
        <Link to={`/compliance-workspace/${data.projectId}`}>
        <Card square elevation={0} style={{ border: "1px solid #ddd", marginBottom: 16, opacity: data.isDeleting&&0.6, position: 'relative', }} key={data.projectId}>
        {data.isDeleting&&<CircularProgress style={{
                color: red[500],
                position: 'absolute',
                top: '50%',
                left: '50%',
                marginTop: -30,
                marginLeft: -30,}} size={60} />}
        <div className={classes.projectCardRoot}>
            <Card className={classes.projectCardColor} elevation={0} square>
                <div style={{ display: "flex", justifyContent: "center", marginTop: 8, color: "white", borderRadius: 100 }}>
                    {/* <ToggleState initialState={data.isFavorited} render={(is) => is ? <StarIcon /> : <StarBorderIcon />} /> */}
                    {number}
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
                    <Link to={`/compliance-workspace/${data.projectId}`}>
                        <Button size="small" color="primary" disabled={data.isDeleting}>
                            EXPLORE
                        </Button>
                    </Link>
                    <div style={{ flexGrow: 1, justifyContent: "flex-end", display: "flex" }}>
                        
                    </div>
                </CardActions>
            </div>
            <Card className={classes.projectCardInfoPanel} style={{borderLeft: "1px solid #eee"}} elevation={0}>
                <CardContent style={{ height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <Link to={`/compliance-workspace/${data.projectId}?status=overdue&sort=none`}>
                        <Badge color="secondary" badgeContent={(overdueActions&&overdueActions.length) || 0} className={classes.margin}>
                            <Button size="small" variant="contained" style={{ flexGrow: 1, borderRadius: 50 }}>
                                OVERDUE
                            </Button>
                        </Badge>
                    </Link>
                    <Button size="small" variant="contained" style={{ flexGrow: 1, borderRadius: 50, marginBottom: 8 }}>
                        {`${data.actionCount || 0} ACTIONS`}
                    </Button>
                    <Button size="small" variant="contained" style={{ flexGrow: 1, borderRadius: 50 }}>
                        {`${data.taskCount || 0} TASKS`}
                    </Button>
                </CardContent>
            </Card>
        </div>
    </Card></Link>
        )
    }
}

class ActionManager extends React.Component {
    componentDidUpdate(){
        if (this.props.organisation.hasFetched){
            !this.props.isSubscribed&&this.props.getProjectsInManager()
        }
    }

    componentDidMount(){
        if (this.props.organisation.hasFetched){
            !this.props.isSubscribed&&this.props.getProjectsInManager()
        }
    }

  render() {
    const { classes, organisation, projects, projectsStatus: { isLoadingProjects, isFetchingCurrentAssignedTasksAndActions, isSubscribedToProjects } } = this.props
    const { organisationId } = organisation

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

    const hasProjects = projects.length!==0

    return (
        <AuthViewRouteContainer topbar={<ActionManagerTopActionBar/>}>
            <div className={classes.root}>
                {!organisationId&&(
                    <div className={classes.blankRoot}>
                        <div style={{maxWidth: "800px", marginTop: -100, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                            <Typography variant="display2" gutterBottom  color="secondary" paragraph align="center">Oh no! You don't seem to have a team yet.</Typography>
                            <Typography variant="title" gutterBottom paragraph>If you would like to create your own team please click the button below. If you are waiting on an invite to join a team it will be sent via email, so sit tight.</Typography>
                            <Link to="create-new-team"><Button variant="extendedFab" color="secondary" style={{marginTop: 32, marginBottom: 32}}>Create a new team</Button></Link>
                            <Typography variant="body1">Having trouble or haven't recieved the invite link? Please contact team@polibase.com.au to let us know.</Typography>
                        </div>
                    </div>
                )}
                {organisationId&&<Grid container spacing={isWidthUp('md', this.props.width)?24:0}>
                    <Hidden smDown>
                        <Grid item xs={12} md={8}>
                            <Scrollbars style={{height: "83vh"}}>
                                {isLoadingProjects&&!hasProjects&&[<ProjectCardLoader />,
                                <ProjectCardLoader />,
                                <ProjectCardLoader />]}
                                {hasProjects&&projects.sort((a,b)=>moment(a.created).isBefore(b.created)).map((i,j)=><ProjectCard getActionsInSpecificProject={this.props.getActionsInSpecificProject} classes={classes} data={i} key={i.projectId} number={j+1}/>)}
                                {!isLoadingProjects&&!hasProjects&&(
                                    <div style={{height: "100%", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                                        <img src="https://www.freeiconspng.com/uploads/rocket-png-26.png" alt="" width="260px" style={{filter: "grayscale(100%)", marginTop: 64}}/>
                                        <Typography style={{margin: "32px 0 32px"}} variant="headline">Hold up! It looks like you have no projects.</Typography>
                                        <div style={{display: "flex", justifyContent: "space-between", flex: 1}}>
                                            <YoutubeDialogView videoId="coUzIhirhm0"><Button variant="extendedFab" color="primary" style={{color: "white", marginRight: 16, background: "#2ECC71"}}>Watch a tutorial</Button></YoutubeDialogView>
                                            <Button variant="extendedFab" color="secondary" style={{color: "white"}} onClick={()=>this.props.openCreateProjectsInManagerDialogue()}>Add project </Button>
                                        </div>
                                        
                                    </div>
                                )}
                            </Scrollbars>
                        </Grid>
                    </Hidden>
                    <Grid item xs={12} md={4}>
                        <ProjectOverview square hideNavButton isMobile={!isWidthUp('md', this.props.width)}/>
                        <DueTasks square marginTop={16} hideNavButton isMobile={!isWidthUp('md', this.props.width)}/>
                    </Grid>
                </Grid>}
            </div>
        </AuthViewRouteContainer>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        projects: Object.keys(state.actionManager.projects).map(key=>state.actionManager.projects[key]).sort((a,b)=>b.created-a.created),
        projectsStatus: state.actionManager.projectsStatus,
        organisation: state.organisation,
        isSubscribed: state.actionManager.projectsStatus.isSubscribedToProjects
    }
}

export default connect(mapStateToProps, {...reduxActions})(withWidth()(withStyles(styles)(ActionManager)))
