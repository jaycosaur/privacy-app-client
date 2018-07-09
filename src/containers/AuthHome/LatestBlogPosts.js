import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
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
        paddingTop: theme.spacing.unit*2,
        paddingBottom: theme.spacing.unit*2
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
    return (
        <Card className={classes.bottomMargin}>
            <div style={{padding: 8}}>
                <Typography variant="subheading" color="default">
                        Latest Blog Post
                </Typography>
            </div>
            <Divider />
            <CardContent>
                <Grid container spacing={24}>
                    <Grid item xs={6}>
                        <Card elevation={4}>
                            <CardContent>Test</CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card elevation={4}>
                            <CardContent>Test</CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card elevation={4}>
                            <CardContent>Test</CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card elevation={4}>
                            <CardContent>Test</CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
                    )}

export default withStyles(styles)(HomeView)