import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';


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
        marginBottom: theme.spacing.unit*2,
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
        <Card className={classes.bottomMargin} style={{height: "40vh"}}>
            <AppBar position="static" color="default">
                <Toolbar variant="dense">
                    <Typography variant="subheading" color="inherit" style={{flex: 1}}>
                        Publications and Government News
                    </Typography>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div style={{height: "100%", overflow: "scroll",}}>
                <List component="nav" dense>
                    <ListItem button>
                        <ListItemIcon>
                            <StarIcon />
                        </ListItemIcon>
                        <ListItemText primary="Chelsea Otakan" />
                    </ListItem>
                        <ListItem button>
                        <ListItemText primary="Eric Hoffman" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <StarIcon />
                        </ListItemIcon>
                        <ListItemText primary="Chelsea Otakan" />
                    </ListItem>
                        <ListItem button>
                        <ListItemText primary="Eric Hoffman" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <StarIcon />
                        </ListItemIcon>
                        <ListItemText primary="Chelsea Otakan" />
                    </ListItem>
                        <ListItem button>
                        <ListItemText primary="Eric Hoffman" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <StarIcon />
                        </ListItemIcon>
                        <ListItemText primary="Chelsea Otakan" />
                    </ListItem>
                        <ListItem button>
                        <ListItemText primary="Eric Hoffman" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <StarIcon />
                        </ListItemIcon>
                        <ListItemText primary="Chelsea Otakan" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Eric Hoffman" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Eric Hoffman" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Eric Hoffman" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Eric Hoffman" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Eric Hoffman" />
                    </ListItem>
                    <ListItem button>
                        <ListItemText primary="Eric Hoffman" />
                    </ListItem>
                </List>
            </div>
        </Card>
                    )}

export default withStyles(styles)(HomeView)