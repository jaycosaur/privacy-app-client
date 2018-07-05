import React from 'react'
import ItemList from './../containers/ItemList'
import SearchFilter from './../components/SearchFilter'
import SearchTopBar from './../components/SearchTopBar'
import Drawer from '@material-ui/core/Drawer';
import PolicySiderKeywordSearchInput from './../components/PolicySiderKeywordSearchInput'
import { getWatchlistItem, clearFilterData } from './../store/actions/watchlistActions'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/IconButton';
import LinkIcon from '@material-ui/icons/Link';
import SettingsIcon from '@material-ui/icons/Settings';
import ShareIcon from '@material-ui/icons/Share';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

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
        width: 300,   },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        minWidth: 0, // So the Typography noWrap works
        height: "85vh", overflowY: "scroll",
        zIndex: 1
      },
    trendingCardContainer: {
        padding: theme.spacing.unit,
    },
    trendingCard: {
        marginBottom: theme.spacing.unit,
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
        const { classes } = this.props
        return (
            <div className={classes.root}>
                <Drawer 
                    variant="permanent" 
                    className={classes.sider}
                    classes={{
                        paper: classes.drawerPaper,
                        }}>
                        <AppBar position="static" color="default">
                            <Toolbar>
                                <Typography variant="subheading" color="inherit">
                                    Trending Legislation
                                </Typography>
                            </Toolbar>
                        </AppBar>
                        <div className={classes.actionContainer}>
                            <Tooltip title="Link to this page">
                                <Button variant="contained" color="primary" aria-label="add" className={classes.button}>
                                    <LinkIcon />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Share this watchlist">
                                <Button variant="contained" color="primary" aria-label="add" className={classes.button}>
                                    <ShareIcon />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Star this watchlist">
                                <Button variant="contained" color="primary" aria-label="add" className={classes.button}>
                                    <StarBorderIcon />
                                </Button>
                            </Tooltip>
                            <Tooltip title="Watchlist settings">
                                <Button variant="contained" color="primary" aria-label="add" className={classes.button}>
                                    <SettingsIcon />
                                </Button>
                            </Tooltip>
                        </div>
                        <Divider/>
                        <div className={classes.trendingCardContainer}>
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
                        </div>
                </Drawer>
                <div>
                    <AppBar position="static" color="default">
                        <Toolbar>
                            <Typography variant="subheading" color="inherit">
                                Policy and Legisation Tracker
                            </Typography>
                            <div>
                                <PolicySiderKeywordSearchInput />
                            </div>
                            <SearchTopBar />
                        </Toolbar>
                    </AppBar>
                    <main className={classes.content}>
                        <SearchFilter />
                        <ItemList />
                    </main>
                </div>
            </div>
          )
    }
}

const SearchViewWithStyles = withStyles(styles)(SearchView)

export default connect(null, {getWatchlistItem, clearFilterData})(SearchViewWithStyles)