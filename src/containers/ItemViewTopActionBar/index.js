import React from 'react'

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';

import { Link } from 'react-router-dom'

import { connect } from 'react-redux'
import * as actions from './../../store/actions/accountActions'
import * as filterActions from './../../store/actions/filterActions'

import MainViewTopActionBarContainer from './../MainViewTopActionBarContainer'
import Button from '@material-ui/core/Button'
import SettingsIcon from '@material-ui/icons/Settings';
import BackIcon from '@material-ui/icons/ArrowBack';
import WatchIcon from '@material-ui/icons/VisibilityOff';
import { lighten } from '@material-ui/core/styles/colorManipulator';


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
    button: {},
    topNavBackground: {
        background:  theme.palette.primary.light
    }
})

const Index = (props) => {
    const { classes } = props
    const barActions = [<div>
        <Link to="/home"><Button  variant="contained"  style={{marginRight: 16}}><BackIcon /> Go Back</Button></Link>
        <Button  variant="contained"   style={{marginRight: 16}}><WatchIcon /> Watch</Button>
    </div>,
    <Button  variant="fab" mini style={{float: "right"}}><SettingsIcon /></Button>]


    return (
        <MainViewTopActionBarContainer color="primary" className={classes.topNavBackground} actions={barActions}>
            <Typography className={classes.strongTitle} variant="title">
                <Icon style={{width: 22, height: 22}} className={'fas fa-balance-scale'} />
                Tax Laws Amendment (Tax Incentives for Innovation) Bill 2016
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