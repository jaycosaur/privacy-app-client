import React from 'react'
import ItemList from '../containers/ItemList/'
import SearchFilter from './../components/SearchFilter'
import Drawer from '@material-ui/core/Drawer';
import { getWatchlistItem, clearFilterData } from './../store/actions/watchlistActions'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import LinkIcon from '@material-ui/icons/Link';
import SearchIcon from '@material-ui/icons/Search';

import SettingsIcon from '@material-ui/icons/Settings';
import ShareIcon from '@material-ui/icons/Share';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import DescriptionIcon from '@material-ui/icons/Description';
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes';
import TimelineIcon from '@material-ui/icons/Timeline';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import PolicyTrackerTopActionBar from './../containers/PolicyTrackerTopActionBar'
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: "92vh",
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
      },
    siderContainer: {
        height: "100vh",
        boxShadow: "5px 0 5px -5px #333",
        zIndex: 50, overflowY: "scroll"
    },
    button: {
    },
    actionContainer: {
        display: "flex",
        justifyContent: "space-between",
        padding: theme.spacing.unit
    },
    instructions: {
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit,
    },
    drawerPaper: {
        position: 'relative',
        width: 250,   },
    content: {
        flexGrow: 1,
        minWidth: 0, // So the Typography noWrap works
        height: "85vh", overflowY: "scroll",
        zIndex: 1
      },
    contentMaxWidth: {
        maxWidth: 1600
    },
    trendingCardContainer: {
        padding: theme.spacing.unit,
    },
    trendingCard: {
        marginBottom: theme.spacing.unit,
    },
    contentPadded: {
        padding: theme.spacing.unit * 3,
    },
    drawerBottomNav: {
        width: "100%"
    }

    
  });
  

class SearchView extends React.Component{
    componentDidMount(){
        if (this.props.match.params.watchlistId){
            this.props.getWatchlistItem(this.props.match.params.watchlistId)
        } else {
            this.props.clearFilterData()
        }
    }

    render(){
        const { classes, shouldShowFilter } = this.props
        return (
            <div className={classes.root}>
                <Drawer 
                    variant="permanent" 
                    className={classes.sider}
                    classes={{
                        paper: classes.drawerPaper,
                    }}>
                    <AppBar position="static" color="secondary" elevation={0}>
                        <Toolbar>
                            <SearchIcon />
                            <Typography variant="subheading" color="inherit">
                                Polity Search
                            </Typography>
                        </Toolbar>
                    </AppBar>
                        <List dense={true}>
                            <ListItem button>
                                <ListItemIcon><TimelineIcon /></ListItemIcon>
                                <ListItemText primary="Regulatory Developments" />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon><SpeakerNotesIcon /></ListItemIcon>
                                <ListItemText primary="Media & Commentary" />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon><DescriptionIcon /></ListItemIcon>
                                <ListItemText primary="Research & Reports" />
                            </ListItem>
                            <Divider />
                            <ListItem button>
                                <ListItemIcon><StarIcon /></ListItemIcon>
                                <ListItemText primary="Your Watchlists" />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon><StarIcon /></ListItemIcon>
                                <ListItemText primary="Flagged Items" />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon><StarIcon /></ListItemIcon>
                                <ListItemText primary="Recent Searches" />
                            </ListItem>
                        </List>
                        <Divider/>
                        <BottomNavigation
                            value={1}
                            onChange={(e)=>console.log(e)}
                            showLabels
                            className={classes.drawerBottomNav}
                        >
                            <BottomNavigationAction label="Link" icon={<LinkIcon />} />
                            <BottomNavigationAction label="Share" icon={<ShareIcon />} />
                            <BottomNavigationAction label="Favourite" icon={<StarBorderIcon />} />
                            <BottomNavigationAction label="Settings" icon={<SettingsIcon />} />

                        </BottomNavigation>
                        
                        {false&&<div className={classes.trendingCardContainer}>
                            {[...Array(5)].map((i,j)=>(
                                <Card key={j} className={classes.trendingCard}>
                                    <CardHeader
                                        action={
                                        <IconButton>
                                            <MoreVertIcon />
                                        </IconButton>
                                        }
                                        subheader="National Redress Scheme for Institutional Child Sexual Abuse (Consequential Amendments) Bill 20186"
                                    />
                                </Card>
                            ))}
                        </div>}
                </Drawer>
                <div style={{flexGrow: 1}}>
                    <PolicyTrackerTopActionBar />
                    <main className={classes.content}>
                        {shouldShowFilter&&<div className={classes.contentPadded}>
                            <SearchFilter />
                        </div>}
                        <div className={classes.contentMaxWidth}>
                            <ItemList />
                        </div>
                    </main>
                </div>
            </div>
          )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        shouldShowFilter: state.filter.showFilter
    }
}

const SearchViewWithStyles = withStyles(styles)(SearchView)

export default connect(mapStateToProps, {getWatchlistItem, clearFilterData})(SearchViewWithStyles)