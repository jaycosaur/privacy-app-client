import React from 'react'
import { connect } from 'react-redux'
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import CloudIcon from '@material-ui/icons/Cloud';

import DescriptionIcon from '@material-ui/icons/Description';

import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import AlgoliaSearch from './AlgoliaSearch'

function Transition(props) {
    return <Slide direction="up" {...props} />;
  }

class SelectTeamMember extends React.Component {
    state = {
        anchorEl: null,
        search: null,
        menuSelection: null
    };
    
    handleClick = event => {
        this.props.handleClick&&this.props.handleClick(event)
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleClose = () => {
        this.setState({ anchorEl: null, menuSelection: null });
    };

    handleMenuSelect = (val) => {
        this.setState({menuSelection: val})
        if(!val){
            this.props.handleChange({id: null})
        }
    }

    handleSelect = (id) => {
        this.handleClose()
        this.props.handleChange&&this.props.handleChange({id: {itemRef: id, itemType: "baseitem"}})
    }

    render() {
        const { anchorEl } = this.state;

        const { hasValue } = this.props

        const menuItems = [
            {
                value: "teamstorage",
                text: "Team Storage",
            },
            {
                value: "baseitem",
                text: "Polibase",
            },
            {
                value: null,
                text: "Clear",
            },
        ]
        let itemType = null
        let itemRef = null

        if (hasValue&&typeof hasValue === "string"){
            itemType = "baseitem"
            itemRef = hasValue
        }

        if (hasValue&&typeof hasValue === "object"){
            itemType = hasValue.itemType
            itemRef = hasValue.itemRef
        }

        return (
            [<Button
                onClick={this.handleClick}
                size="small" variant="outlined" style={{background: "white",marginLeft: 8}}
                >
                {itemRef?[...itemRef].slice(0,12).join(""):<span style={{color: "#bbb"}}>Not Assigned</span>}{itemType==="teamstorage"?<CloudIcon style={{fontSize: 20, color: "#bbb", marginLeft: 8}}/>:<DescriptionIcon style={{fontSize: 20, color: "#bbb", marginLeft: 8}}/>}
            </Button>,
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
            >
                {menuItems.map((status,index) => (
                    <MenuItem
                        key={status.value}
                        value={status.value}
                        selected={itemType && status.value === itemType}
                        onClick={() => this.handleMenuSelect(menuItems[index].value)}
                        >
                        <small>{status.text}</small>
                    </MenuItem>
                ))}
            </Menu>,
            <Dialog 
                open={this.state.menuSelection==="baseitem"} 
                onClose={this.handleClose} 
                fullScreen
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

const mapStateToProps = (state, props) => {
    return {
        teamUsers: state.organisation.users,
    }
}
export default connect(mapStateToProps)(SelectTeamMember)