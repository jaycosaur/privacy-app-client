import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    margin: {
      margin: theme.spacing.unit * 2,
    },
    padding: {
      padding: `0 ${theme.spacing.unit * 2}px`,
    },
  });
  

const AvatarWithBadge = (props) => {
    const { classes, count, render, src } = props
    return (
        <Badge className={classes.margin} badgeContent={count} color="secondary">
            <Avatar className={classes.avatar} src={src}>
                {render()}
            </Avatar>
        </Badge>
    )
}

AvatarWithBadge.propTypes = {
    classes: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired,
    render: PropTypes.func.isRequired,
    src: PropTypes.string
}
  
export default withStyles(styles)(AvatarWithBadge);