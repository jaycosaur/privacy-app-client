import React from 'react'

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import classnames from 'classnames'
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

const styles = theme => {
    console.log(theme)
    return ({
    main: {
        background: "white",
        position: "fixed",
        backgroundSize: "cover",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    root: {
      flexGrow: 1,
      height: "100vh"
    },
    overflow: {
        overflow: "auto"
    },
    formContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "2em",
        background: theme.palette.secondary.main,
        transition: theme.transitions.create('background', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
        }),
    },
    titleContainer: {
        background: theme.palette.primary.main,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: "8em",
        [theme.breakpoints.down('sm')]: {
            padding: "4em"
        },
        transition: theme.transitions.create('background', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
        }),
    },
    formCard: {
        maxWidth: 500,
        [theme.breakpoints.down('xs')]: {
            height: "60%"
        },
    },
    formContainerAlt : {
        background: theme.palette.primary.main,
        transition: theme.transitions.create('background', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
        }),
    },
    titleContainerAlt : {
        background: "#fff",
        transition: theme.transitions.create('background', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.standard,
        }),
    },
    white: {
        background: "white"
    },
    mobile: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
        padding: "2em",
        paddingTop: 100,
        height: "100%",
        overflow: "auto"
    }
  })};

const EntryFlowView = (props) => {
    const { classes, alternate, leftWhite,  rightWhite } = props
    const isMobile = !isWidthUp('md', props.width)
    return (
      <div className={classes.main}>
        <Grid container className={classnames(classes.root, isMobile&&classes.overflow)} spacing={0}>
            <Hidden xsDown>
                <Grid item sm={12} md={6} className={classnames(classes.titleContainer, alternate&&classes.titleContainerAlt, leftWhite&&classes.white)}>
                    {props.leftCard}
                </Grid>
            </Hidden>
            <Grid item sm={12} md={6} className={classnames(classes.formContainer, alternate&&classes.formContainerAlt, rightWhite&&classes.white, isMobile&&classes.titleContainer, isMobile&&classes.mobile)}>
                <div className={classes.formCard}>
                    {props.rightCard}
                </div>
            </Grid>
        </Grid>
      </div>
    )
}

export default withWidth()(withStyles(styles)(EntryFlowView))
