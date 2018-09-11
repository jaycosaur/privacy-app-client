import React from 'react'
import ItemList from '../containers/ItemList/'
import SearchFilter from './../components/SearchFilter'
import { getWatchlistItem, clearFilterData } from './../store/actions/watchlistActions'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import Paper from '@material-ui/core/Paper';
import SearchTopActionBar from './../containers/SearchTopActionBar'

import AuthViewRouteContainer from './AuthViewRouteContainer'

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
    state = {
        numberOfResults: null,
        numberOfResultsTotal: null,
        numberOfNew: null,
        fetchedIn: null
    }

    setNumberOfResults = (val) => {
        this.setState({numberOfResults: val})
    }

    setNumberOfResultsTotal = (val) => {
        this.setState({numberOfResultsTotal: val})
    }

    setNumberOfNew = (val) => {
        this.setState({numberOfNew: val})
    }

    setFetchedIn = (val) => {
        this.setState({fetchedIn: val})
    }

    componentDidMount(){
        if (this.props.match.params.watchlistId){
            this.props.getWatchlistItem(this.props.match.params.watchlistId)
        } else {
            this.props.clearFilterData()
        }
    }

    render(){
        const { classes, shouldShowFilter, match: { params: { searchCategory } } } = this.props
        return (
            <AuthViewRouteContainer topbar={<SearchTopActionBar type={searchCategory} numberOfResults={this.state.numberOfResults} numberOfResultsTotal={this.state.numberOfResultsTotal} numberOfNew={this.state.numberOfNew} fetchedIn={this.state.fetchedIn}/>}>
                <Collapse in={shouldShowFilter}>
                    <Paper square className={classes.contentPadded}>
                        <SearchFilter type={searchCategory} />
                    </Paper>
                </Collapse>
                <ItemList key={searchCategory} searchCategory={searchCategory} setNumberOfResults={this.setNumberOfResults} setNumberOfResultsTotal={this.setNumberOfResultsTotal} setFetchedIn={this.setFetchedIn}/>
            </AuthViewRouteContainer>
          )
    }
}

const mapStateToProps = (state) => {
    return {
        shouldShowFilter: state.filter.showFilter
    }
}

const SearchViewWithStyles = withStyles(styles)(SearchView)

export default connect(mapStateToProps, {getWatchlistItem, clearFilterData})(SearchViewWithStyles)