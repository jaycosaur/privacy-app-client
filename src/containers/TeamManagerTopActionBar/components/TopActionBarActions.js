import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import PersonAddIcon from '@material-ui/icons/PersonAdd';

import { connect } from 'react-redux'
import * as actions from '../../../store/actions/accountActions'
import * as filterActions from '../../../store/actions/filterActions'

const styles = () => ({
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
        color: "white"
    }
})

const ActionCreator = (props) => {
    const { classes } = props
    const actionsArray = [
            <IconButton disabled className={classes.button} aria-label="Add to watchlist" onClick={() => console.log("Add persona~!")}>
                <PersonAddIcon />
            </IconButton>
        ]

    return (<span>{actionsArray}</span>)
}

const mapStateToProps = (state) => {
    return {
        shouldShowFilter: state.filter.showFilter,
        selectedView: state.filter.selectedView
    }
}



export const TopBarActions = connect(mapStateToProps, {...actions, ...filterActions})(withStyles(styles)(ActionCreator))
export const topBarTitle = ["Regulatory Developments", <small>(343 results, 15 new)</small>]

