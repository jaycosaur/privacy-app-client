import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    avatar: {
      backgroundColor: theme.palette.primary.dark,
    },
  });
  
const CardContainer = (props) => {
    const { classes, children, containerTitle, containerSubtitle, containerAvatar, marginTop, noContainer } = props;
    return (
        <Card className={classes.card} style={{marginTop: marginTop}} elevation={10}>
            <CardHeader 
                avatar={
                    <Avatar aria-label={containerTitle} className={classes.avatar}>
                        {containerAvatar}
                    </Avatar>
                } 
                action={
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                } 
                title={containerTitle} 
                subheader={containerSubtitle} 
            />
            <Divider light />
            {noContainer?children:<CardContent>{children}</CardContent>}
        </Card>
        );
}
  
  CardContainer.propTypes = {
    classes: PropTypes.object.isRequired,
    containerTitle: PropTypes.node.isRequired,
    containerSubtitle: PropTypes.node.isRequired,
    containerAvatar: PropTypes.node.isRequired
  };
  
  export default withStyles(styles)(CardContainer);
