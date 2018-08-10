import React from 'react'

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import TOCIcon from '@material-ui/icons/Toc';

import { connect } from 'react-redux'
import * as actions from '../../store/actions/accountActions'
import * as filterActions from '../../store/actions/filterActions'

import MainViewTopActionBarContainer from '../MainViewTopActionBarContainer'

import * as topbarActions from './components/TopActionBarActions'

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
    button: {}
})

const Index = (props) => {
    const { classes, type="none" } = props
    const actions = <topbarActions.TopBarActions />

    return (
        <MainViewTopActionBarContainer color="primary" actions={actions} icon={<TOCIcon style={{color: "white", marginRight:8}}/> }>
            <Typography noWrap className={classes.strongTitle} variant="title">
                Your Compliance Workspace
            </Typography>
        </MainViewTopActionBarContainer>
    )
}

const mapStateToProps = (state) => {
    return {
        shouldShowFilter: state.filter.showFilter,
        selectedView: state.filter.selectedView
    }
}

export default connect(mapStateToProps, {...actions, ...filterActions})(withStyles(styles)(Index))

