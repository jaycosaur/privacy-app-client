import React from 'react'

import Typography from '@material-ui/core/Typography';
import SearchTopBar from './../../components/SearchTopBar'
import PolicySiderKeywordSearchInput from './../../components/PolicySiderKeywordSearchInput'
import { withStyles } from '@material-ui/core/styles';
import TimelineIcon from '@material-ui/icons/Timeline';


import { connect } from 'react-redux'
import * as actions from './../../store/actions/accountActions'
import * as filterActions from './../../store/actions/filterActions'

import MainViewTopActionBarContainer from './../MainViewTopActionBarContainer'

import * as regulation from './components/RegulatoryTopActionBar'
import * as media from './components/MediaAndCommentaryTopActionBar'

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
    const actions = {
        regulation: <regulation.TopBarActions />,
        none: <regulation.TopBarActions />,
        "media-and-commentary": [<media.TopBarActions />,<regulation.TopBarActions />]
    }

    const titles = {
        "regulation": regulation.topBarTitle,
        'media-and-commentary': media.topBarTitle,
        "research": ["Research and Reports"],
        "none": ["Polity Search - Regulations, Media and Research"],
    }

    return (
        <MainViewTopActionBarContainer actions={actions[type]}>
            <TimelineIcon style={{color: "white", marginRight:8}}/> 
            <Typography className={classes.strongTitle} variant="title">
                {titles[type]}
            </Typography>
            {false&&<PolicySiderKeywordSearchInput />}
            {false&&<SearchTopBar />}
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

