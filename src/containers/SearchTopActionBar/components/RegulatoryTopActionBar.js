import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AlarmIcon from '@material-ui/icons/Alarm'
import TableIcon from '@material-ui/icons/ViewList'
import DateRangeIcon from '@material-ui/icons/DateRange';

import AddIcon from '@material-ui/icons/Add';
import FilterIcon from '@material-ui/icons/FilterList';

import { connect } from 'react-redux'
import * as actions from './../../../store/actions/accountActions'
import * as filterActions from './../../../store/actions/filterActions'
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

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
        flex: 1,
        color: "white"
    },
    buttonSelected: {
        color: "white"
    },
    button: {

    }
})

class Hover extends React.Component {
    state = {
        hovered: false
    }

    hover = (v) => {
        this.setState({hovered: v})
    }
    render() {
        return (
            <span onMouseEnter={()=>this.hover(true)} onMouseLeave={()=>this.hover(false)}>{this.props.render(this.state.hovered)}</span>
        )
    }
}

const ActionCreator = (props) => {
    const { classes, shouldShowFilter, selectedView, filtersActive } = props
    const actionsArray = [
            filtersActive&&<Hover render={(hovered)=>(
                <Button variant="outlined" style={{background: hovered?red[500]:green[500], color: "white", border: "1px solid", borderColor: hovered?red[700]:green[700]}} size="small">
                    {hovered?"DELETE FILTERS":"FILTERS ACTIVE"}
                </Button>
            )}/>,
            <IconButton className={shouldShowFilter?classes.buttonSelected:classes.button} aria-label="Show filters" onClick={e => props.toggleFilterPanel()}>
                <FilterIcon/>
            </IconButton>,
            <IconButton className={selectedView==="table"?classes.buttonSelected:classes.button} aria-label="Switch to table view" onClick={() => props.changeSearchPageView("table")} disabled>
                <TableIcon />
            </IconButton>,
            <IconButton className={selectedView==="date"?classes.buttonSelected:classes.button} aria-label="Switch to date view" onClick={() => props.changeSearchPageView("date")} disabled>
                <DateRangeIcon />
            </IconButton>,
            <IconButton className={classes.button} aria-label="Add an alert alarm" disabled>
                <AlarmIcon/>
            </IconButton>,
            <IconButton className={classes.button} aria-label="Add to watchlist" onClick={e => props.doSelectItem("create-watch")}>
                <AddIcon />
            </IconButton>
        ]

    return (<span>{actionsArray}</span>)
}

const mapStateToProps = (state, ownProps) => {
    return {
        shouldShowFilter: state.filter.showFilter,
        selectedView: state.filter.selectedView,
        filtersActive: state.filter.searchFilter||state.filter.filters.length>0,
    }
}



export const TopBarActions = connect(mapStateToProps, {...actions, ...filterActions})(withStyles(styles)(ActionCreator))
export const topBarTitle = ["Regulatory Developments"]

