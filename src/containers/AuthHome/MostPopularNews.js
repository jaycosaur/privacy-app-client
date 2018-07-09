import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
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
            <Card>
                <div style={{padding: 8}}>
                    <Typography variant="subheading" color="default">
                        Most Popular News
                    </Typography>
                </div>
                <Divider />
                <LinearProgress color="secondary" />
                <CardContent>
                    <div className={classes.updateContainer}>
                        <CardMedia
                            className={classes.cover}
                            image="https://placeimg.com/90/90/any"
                            title="Live from space album cover"
                        />
                        <div style={{flex: 1, marginLeft: 20}}>
                            <Typography variant="title" color="inherit">
                                Shoe Startups Aren’t Dragging Their Feet
                            </Typography>
                            <Typography variant="subtitle" color="inherit">
                                July 05, 2018
                            </Typography>
                            <Typography variant="caption" color="inherit">
                                Good thing Carrie Bradshaw, the shoe-loving heroine of Sex and the City, wasn’t a footwear venture capitalist. The high-heeled, high-priced, and hard-to-walk-in pairs beloved by the TV icon are pretty much the least fundable concept in the shoe startup space lately.
                            </Typography>
                        </div>
                    </div>
                    <Divider />
                    <div className={classes.updateContainer}>
                        <CardMedia
                            className={classes.cover}
                            image="https://placeimg.com/90/90/any"
                            title="Live from space album cover"
                        />
                        <div style={{flex: 1, marginLeft: 20}}>
                            <Typography variant="title" color="inherit">
                                Shoe Startups Aren’t Dragging Their Feet
                            </Typography>
                            <Typography variant="subtitle" color="inherit">
                                July 05, 2018
                            </Typography>
                            <Typography variant="caption" color="inherit">
                                Good thing Carrie Bradshaw, the shoe-loving heroine of Sex and the City, wasn’t a footwear venture capitalist. The high-heeled, high-priced, and hard-to-walk-in pairs beloved by the TV icon are pretty much the least fundable concept in the shoe startup space lately.
                            </Typography>
                        </div>
                    </div>
                    <Divider />
                    <div className={classes.updateContainer}>
                        <CardMedia
                            className={classes.cover}
                            image="https://placeimg.com/90/90/any"
                            title="Live from space album cover"
                        />
                        <div style={{flex: 1, marginLeft: 20}}>
                            <Typography variant="title" color="inherit">
                                Shoe Startups Aren’t Dragging Their Feet
                            </Typography>
                            <Typography variant="subtitle" color="inherit">
                                July 05, 2018
                            </Typography>
                            <Typography variant="caption" color="inherit">
                                Good thing Carrie Bradshaw, the shoe-loving heroine of Sex and the City, wasn’t a footwear venture capitalist. The high-heeled, high-priced, and hard-to-walk-in pairs beloved by the TV icon are pretty much the least fundable concept in the shoe startup space lately.
                            </Typography>
                        </div>
                    </div>
                    <Divider />
                    <div className={classes.updateContainer}>
                        <CardMedia
                            className={classes.cover}
                            image="https://placeimg.com/90/90/any"
                            title="Live from space album cover"
                        />
                        <div style={{flex: 1, marginLeft: 20}}>
                            <Typography variant="title" color="inherit">
                                Shoe Startups Aren’t Dragging Their Feet
                            </Typography>
                            <Typography variant="subtitle" color="inherit">
                                July 05, 2018
                            </Typography>
                            <Typography variant="caption" color="inherit">
                                Good thing Carrie Bradshaw, the shoe-loving heroine of Sex and the City, wasn’t a footwear venture capitalist. The high-heeled, high-priced, and hard-to-walk-in pairs beloved by the TV icon are pretty much the least fundable concept in the shoe startup space lately.
                            </Typography>
                        </div>
                    </div>
                    <Divider />
                    <div className={classes.updateContainer}>
                        <CardMedia
                            className={classes.cover}
                            image="https://placeimg.com/90/90/any"
                            title="Live from space album cover"
                        />
                        <div style={{flex: 1, marginLeft: 20}}>
                            <Typography variant="title" color="primary">
                                Shoe Startups Aren’t Dragging Their Feet
                            </Typography>
                            <Typography variant="subtitle" color="inherit">
                                July 05, 2018
                            </Typography>
                            <Typography variant="caption" color="inherit">
                                Good thing Carrie Bradshaw, the shoe-loving heroine of Sex and the City, wasn’t a footwear venture capitalist. The high-heeled, high-priced, and hard-to-walk-in pairs beloved by the TV icon are pretty much the least fundable concept in the shoe startup space lately.
                            </Typography>
                        </div>
                    </div>
                    <Divider />
                    <div className={classes.updateContainer}>
                        <CardMedia
                            className={classes.coverBig}
                            image="https://placeimg.com/90/90/any"
                            title="Live from space album cover"
                        />
                        <div style={{flex: 1, marginLeft: 20}}>
                            <Typography variant="title" color="inherit">
                                Shoe Startups Aren’t Dragging Their Feet
                            </Typography>
                            <Typography variant="subtitle" color="inherit">
                                July 05, 2018
                            </Typography>
                            <Typography variant="caption" color="inherit">
                                Good thing Carrie Bradshaw, the shoe-loving heroine of Sex and the City, wasn’t a footwear venture capitalist. The high-heeled, high-priced, and hard-to-walk-in pairs beloved by the TV icon are pretty much the least fundable concept in the shoe startup space lately.
                            </Typography>
                        </div>
                    </div>
                </CardContent>
            </Card>
                )}

export default withStyles(styles)(HomeView)