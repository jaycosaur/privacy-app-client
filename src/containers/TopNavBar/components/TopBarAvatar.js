import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import UserIcon from '@material-ui/icons/Person'
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames'

import { connect } from 'react-redux'

const getInitials = (name) => {
    return name.split(" ").map(i=>i[0]).join("").toUpperCase()
}

const TopBarAvatar = (props) => {
    const { user: { displayName }, classes, isLoading, hasLoaded } = props
    return (
        <Avatar alt="Profile Picture" className={classNames(classes.avatar,isLoading&&hasLoaded&&classes.loading)}>{displayName?getInitials(displayName):<UserIcon/>}</Avatar>
    )
}

const styles = (theme) => ({
    avatar: {
        background: theme.palette.primary.main,
        fontWeight: 200,
        fontSize: "70%"
    },
    loading: {
        opacity: 0.8,
        background: "#ccc"
    }
})

const mapStateToProps = (state) => {
    return {
        user: state.user.accountInformation.info,
        isLoading: state.user.accountInformation.isLoading,
        hasLoaded: state.user.accountInformation.hasSucceeded
    }
}
export default connect(mapStateToProps)(withStyles(styles)(TopBarAvatar))