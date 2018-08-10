import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import TurnedInIcon from '@material-ui/icons/TurnedIn';
import Typography from '@material-ui/core/Typography';

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


const HomeView = (props) => {
    const { classes } = props
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
    return (
            <Card style={{height: "82vh", overflow: "scroll"}}>
                <AppBar position="static" color="default">
                    <Toolbar variant="dense">
                        <Typography variant="subheading" color="inherit" style={{flex: 1}}>
                            Your Latest Updates
                        </Typography>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <TurnedInIcon /> 
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <CardContent style={{height: "93%", overflow: "scroll"}}>
                    <LoadingItem/>
                    <Divider />
                    <LoadingItem/>
                    <Divider />
                    <LoadingItem/>
                    <Divider />
                    <LoadingItem/>
                    <Divider />
                    <LoadingItem/>
                    <Divider />
                    <LoadingItem/>
                    <Divider />
                    <LoadingItem/>
                    <Divider />
                    <LoadingItem/>
                    <Divider />
                    <LoadingItem/>
                    <Divider />
                    <LoadingItem/>
                    <Divider />
                </CardContent>
            </Card>
                    )}

export default withStyles(styles)(HomeView)