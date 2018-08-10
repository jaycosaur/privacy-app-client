import React from 'react'
import { connect } from 'react-redux'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import Slide from '@material-ui/core/Slide';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import DescriptionIcon from '@material-ui/icons/Description';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import AlgoliaSearch from './AlgoliaSearch'

function Transition(props) {
    return <Slide direction="up" {...props} />;
  }

class SelectTeamMember extends React.Component {
    state = {
        anchorEl: null,
        search: null
    };
    
    handleClick = event => {
        this.props.handleClick&&this.props.handleClick(event)
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleSelect = (id) => {
        this.handleClose()
        this.props.handleChange&&this.props.handleChange({id: id})
    }

    render() {
        const { anchorEl } = this.state;

        const { hasValue } = this.props

        return (
            [<IconButton
                onClick={this.handleClick}
                style={{marginLeft: 8}}
                >
                <Tooltip title="Assign a record">
                    <Avatar style={{background: hasValue&&"#623aa2"}}>
                        <DescriptionIcon />
                    </Avatar>
                </Tooltip>
            </IconButton>,
            <Dialog open={Boolean(anchorEl)} onClose={this.handleClose} fullScreen
            TransitionComponent={Transition}
            >
                <AppBar>
                    <Toolbar>
                        <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                            <CloseIcon style={{color: "white"}}/>
                        </IconButton>
                        <Typography variant="title" style={{marginLeft: 16, flex: 1, color: "white"}}>
                            Link obligation with a piece of legislation, research or news.
                        </Typography>
                    </Toolbar>
                </AppBar>
                <DialogTitle id="simple-dialog-title">Select legislation, research or news.</DialogTitle>
                <DialogContent style={{width: "100%"}}>
                    <AlgoliaSearch selectRecord={this.handleSelect}/>
                </DialogContent>
            </Dialog>
            ]
        )
}
}

const mapStateToProps = (state) => {
    return {
        teamUsers: state.organisation.users,
    }
}
export default connect(mapStateToProps)(SelectTeamMember)