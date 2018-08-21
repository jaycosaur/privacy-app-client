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

import DoneAllIcon from '@material-ui/icons/DoneAll';
import HourglassIcon from '@material-ui/icons/HourglassEmpty';
import ErrorIcon from '@material-ui/icons/ErrorOutline';

import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'
import LinearProgress from '@material-ui/core/LinearProgress';

import * as actions from './../../store/actions/actionManagerActions'

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'

const heightOfCard = "40vh"

const styles = (theme) => {
    return ({
    expand: {
        overflow: "scroll",
        height: `calc(${heightOfCard} - ${theme.mixins.toolbar.minHeight}px)`,
        display: "flex",
        justifyContent: "center",
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
        height: heightOfCard,
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
})}

const O2A = (o) => Object.keys(o).map(k=>o[k])

class HomeView extends React.Component {
    componentDidUpdate() {
        !this.props.hasSubscribed&&this.props.getProjectsInManager()
    }

    componentDidMount(){
        this.props.hasOrganisation&&!this.props.hasSubscribed&&this.props.getProjectsInManager()
    }

    render(){
        const { classes, actionManager: { projects }, hideNavButton,  isLoadingProjects } = this.props


        

        const ProjectItem = (attrs) => {
            const highlightColor = attrs.isOverdue?red[500]:attrs.isDone?green[500]:"#ddd"
            const message = attrs.isOverdue?[<ErrorIcon/>, "OVERDUE"]:attrs.isDone?[<DoneAllIcon/>, "DONE"]:[<HourglassIcon/>, "ON TRACK"]
            return (
                <ListItem button component={Link} to={`compliance-workspace/${attrs.projectId}`}>
                    <div style={{height: 40, width: 4, borderRadius: 4, opacity: 0.7, background: highlightColor}}/>
                    <ListItemText primary={attrs.title} secondary={attrs.description}/>
                    <div style={{color: highlightColor, display: "flex", alignItems: "center"}}>
                        {message}
                    </div>
                </ListItem>
            )
        }

        const projectsArray = projects?O2A(projects):[]
        const hasProjects = projectsArray.length>0

        return (
            <Card className={classes.bottomMargin}>
                <AppBar position="static" color="primary">
                    <Toolbar variant="dense">
                        <Typography variant="subheading" color="inherit" style={{flex: 1, color: "white"}}>
                            Compliance Workspace
                        </Typography>
                        {hideNavButton&&<Tooltip title="View in compliance workspace">
                            <Link to="/compliance-workspace">
                                <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                                    <ViewIcon />
                                </IconButton>
                            </Link>
                        </Tooltip>}
                    </Toolbar>
                </AppBar>
                <div className={classes.expand}>
                    {isLoadingProjects&&!hasProjects&&<div style={{height: "100%", width: "100%", display: "flex", flexDirection: "column"}}>
                        <LinearProgress variant="query" color="secondary" style={{width: "100%"}}/>
                        <div style={{flex: 1}}/>
                    </div>}
                    {!isLoadingProjects&&!hasProjects&&<Typography variant="caption">No Projects Yet.</Typography>}
                    {!isLoadingProjects&&hasProjects&&<List component="nav" dense>
                        {projectsArray.map(i=><ProjectItem key={i.projectId} {...i}/>)}
                    </List>}
                </div>
            </Card>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        actionManager: state.actionManager,
        hasSubscribed: state.actionManager.projectsStatus.isSubscribedToProjects,
        isLoadingProjects: state.actionManager.projectsStatus.isLoadingProjects,
        hasOrganisation: state.organisation.organisationId
    }
}
export default connect( mapStateToProps, actions )(withStyles(styles)(HomeView))