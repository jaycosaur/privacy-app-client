import React from 'react'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchTopBar from './../../components/SearchTopBar'
import PolicySiderKeywordSearchInput from './../../components/PolicySiderKeywordSearchInput'
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AlarmIcon from '@material-ui/icons/Alarm'
import TableIcon from '@material-ui/icons/ViewList'
import DateRangeIcon from '@material-ui/icons/DateRange';
import TimelineIcon from '@material-ui/icons/Timeline';

import AddIcon from '@material-ui/icons/Add';
import FilterIcon from '@material-ui/icons/FilterList';

import { connect } from 'react-redux'
import * as actions from './../../store/actions/accountActions'
import * as filterActions from './../../store/actions/filterActions'

const styles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    strongTitle: {
        fontWeight: 300,
        flex: 1,
        color: "white"
    },
    buttonSelected: {
        color: "white"
    },
    button: {

    }
})

const Index = (props) => {
    const { classes, shouldShowFilter, selectedView } = props
  return (
    <AppBar position="static" color="secondary" style={{flexGrow: 1}}>
        <Toolbar>
            <TimelineIcon style={{color: "white", marginRight:8}}/> 
            <Typography className={classes.strongTitle} variant="subheading">
                Regulatory Developments <small>(343 results, 15 new)</small>
            </Typography>
            {false&&<PolicySiderKeywordSearchInput />}
            {false&&<SearchTopBar />}
            <IconButton className={shouldShowFilter?classes.buttonSelected:classes.button} aria-label="Show filters" onClick={e => props.toggleFilterPanel()}>
                <FilterIcon/>
            </IconButton>
            <IconButton className={selectedView==="table"?classes.buttonSelected:classes.button} aria-label="Switch to table view" onClick={() => props.changeSearchPageView("table")}>
                <TableIcon />
            </IconButton>
            <IconButton className={selectedView==="date"?classes.buttonSelected:classes.button} aria-label="Switch to date view" onClick={() => props.changeSearchPageView("date")}>
                <DateRangeIcon />
            </IconButton>
            <IconButton className={classes.button} aria-label="Add an alert alarm" disabled>
                <AlarmIcon/>
            </IconButton>
            <IconButton className={classes.button} aria-label="Add to watchlist" onClick={e => props.doSelectItem("create-watch")}>
                <AddIcon />
            </IconButton>
        </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = (state, ownProps) => {
    return {
        shouldShowFilter: state.filter.showFilter,
        selectedView: state.filter.selectedView
    }
}

export default connect(mapStateToProps, {...actions, ...filterActions})(withStyles(styles)(Index))
