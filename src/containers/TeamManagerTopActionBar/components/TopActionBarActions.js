import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import { Link } from 'react-router-dom'

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
    const actionsArray = <Link to="/compliance-workspace"><Button variant="contained" color="secondary" style={{color: "white"}}>Your Workspace</Button></Link>

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

