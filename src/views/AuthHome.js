import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LatestNews from './../containers/AuthHome/LatestNews'
import WeeklySummary from './../containers/AuthHome/WeeklySummary';
import LatestBlogPosts from './../containers/AuthHome/LatestBlogPosts';

import MostPopularNews from './../containers/AuthHome/MostPopularNews';
import HomeShortcuts from './../containers/AuthHome/HomeShortcuts';
import MainViewTopActionBarContainer from './../containers/MainViewTopActionBarContainer'

import AuthViewRouteContainer from './AuthViewRouteContainer'

const styles = (theme) => ({
    root: {
        padding: theme.spacing.unit*2,
        height: "100%",
        overflow: "scroll"
    },
    coverBig: {
        width: 120,
        height: 120,
    },
    fixedSide: {

    },
    cardFlex: {
        display: 'flex',
        marginBottom: theme.spacing.unit*4,
    },
})


const HomeView = (props) => {
    const { classes } = props
    const TopBar = <MainViewTopActionBarContainer>
        <Typography style={{color: "white", flex: 1}} variant="title">{"Stay on-top of policy and regulatory change."}</Typography>
    </MainViewTopActionBarContainer>
    return (
        <AuthViewRouteContainer topbar={TopBar}>
            <Grid container spacing={24}  className={classes.root}>
                <Grid item xs={6}>
                    <LatestNews />
                    <MostPopularNews />
                </Grid>
                <Grid item xs={6} className={classes.fixedSide}>
                    <Card className={classes.cardFlex}>
                        <CardMedia
                            className={classes.coverBig}
                            image="https://image.ibb.co/hzJQU8/Slack_Logo.png"
                            title="Live from space album cover"
                        />
                        <CardContent className={classes.content}>
                            <Typography variant="headline" gutterBottom={true}>Welcome to Polity</Typography>
                            <Typography variant="subheading" color="textSecondary">
                                Polity analyses thousands of government, political and media documents to discover the insights that matter to your organisation.   
                            </Typography>
                        </CardContent>
                    </Card>
                    <WeeklySummary />
                    <LatestBlogPosts />
                    <HomeShortcuts />
                </Grid>
            </Grid>
        </AuthViewRouteContainer>)}

export default withStyles(styles)(HomeView)