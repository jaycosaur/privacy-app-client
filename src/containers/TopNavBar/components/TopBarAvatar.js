import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import UserIcon from '@material-ui/icons/Person'
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux'

const getInitials = (name) => {
    return name.split(" ").map(i=>i[0]).join("").toUpperCase()
}

const TopBarAvatar = (props) => {
    const { user: { displayName }, classes } = props
    return (
        <Avatar alt="Profile Picture" className={classes.avatar}>{displayName?getInitials(displayName):<UserIcon/>}</Avatar>
    )
}

const styles = (theme) => ({
    avatar: {
        background: theme.palette.primary.main,
        fontWeight: 200,
        fontSize: "70%"
    }
})

const mapStateToProps = (state) => {
    return {
        user: state.user.accountInformation.info
    }
}
export default connect(mapStateToProps)(withStyles(styles)(TopBarAvatar))