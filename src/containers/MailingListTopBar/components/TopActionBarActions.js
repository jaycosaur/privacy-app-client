import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';

import PersonAddIcon from '@material-ui/icons/GroupAdd';
import DraftsIcon from '@material-ui/icons/Drafts';
import Tooltip from '@material-ui/core/Tooltip';

import { connect } from 'react-redux'
import * as mailingListActions from '../../../store/actions/mailingListActions'

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
            <Tooltip title="Create Draft Digest">
                <IconButton className={classes.button} aria-label="Create New Draft Digest" onClick={() => props.createOrganisationDigest()}>
                    <DraftsIcon />
                </IconButton>
            </Tooltip>,
            <Tooltip title="Add Mailing Group">
                <IconButton className={classes.button} aria-label="Create New Mailing Group" onClick={() => props.createOrganisationMailingGroup()}>
                    <PersonAddIcon />
                </IconButton>
            </Tooltip>,
        ]

    return (<span>{actionsArray}</span>)
}

const mapStateToProps = (state) => {
    return {
        shouldShowFilter: state.filter.showFilter,
        selectedView: state.filter.selectedView
    }
}



export const TopBarActions = connect(mapStateToProps, {...mailingListActions})(withStyles(styles)(ActionCreator))
export const topBarTitle = ["Regulatory Developments", <small>(343 results, 15 new)</small>]

