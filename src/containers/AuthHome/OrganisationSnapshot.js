import React from 'react'
import Card from '@material-ui/core/Card'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Chip from '@material-ui/core/Chip';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


import { connect } from 'react-redux'

const heightOfCard = "40vh"

const styles = (theme) => {
    return ({
    expand: {
        overflow: "scroll",
        height: `calc(${heightOfCard} - ${theme.mixins.toolbar.minHeight}px)`,
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

const HomeView = (props) => {
    const { classes  } = props

    return (
        <Card className={classes.bottomMargin} style={{ background: props.isLoading&&"#eee", opacity: props.isLoading&&0.6  }} elevation={props.isLoading?0:4}>
            <AppBar position="static" color="primary">
                <Toolbar variant="dense">
                    <Typography variant="subheading" color="inherit" style={{flex: 1, color: "white"}}>
                        Organisation Snapshot
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.expand}>
                {!props.isLoading&&!props.projects&&<div style={{width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                    <img src="https://cdn.pixabay.com/photo/2017/09/12/21/07/solar-system-2743669_1280.png" width="30%" style={{opacity: 0.7, filter: "grayscale(100%)", marginBottom: 32}}/>
                    <Typography variant="subtitle">Your have no projects.</Typography>
                </div>}
                {!props.isLoading&&props.projects&&
                    <List>
                        <ListItem>
                            <ListItemText primary="Number of Projects"/>
                            <ListItemSecondaryAction>
                                <Chip label={props.projects} />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Number of Actions"/>
                            <ListItemSecondaryAction>
                                <Chip label={props.actions} />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Number of Tasks"/>
                            <ListItemSecondaryAction>
                                <Chip label={props.tasks} />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Number of Done Actions"/>
                            <ListItemSecondaryAction>
                                <Chip label={props.doneActions} />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Number of Overdue Actions"/>
                            <ListItemSecondaryAction>
                                <Chip label={props.overdueActions} />
                            </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="Number of Alert Actions"/>
                            <ListItemSecondaryAction>
                                <Chip label={props.alertActions} />
                            </ListItemSecondaryAction>
                        </ListItem>
                    </List>}
            </div>
        </Card>
    )}

const mapStateToProps = (state) => {
    return {
        actionManager: state.actionManager
    }
}

export default connect( mapStateToProps )(withStyles(styles)(HomeView))