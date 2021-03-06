import React from 'react'
import { connect } from 'react-redux'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip'


class SelectTeamMember extends React.Component {
    state = {
        anchorEl: null,
    };
    
    handleClick = event => {
        this.props.handleClick&&this.props.handleClick(event)
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleSelect = (_, i) => {
        this.handleClose()
        this.props.handleChange&&this.props.handleChange(this.props.teamUsers[i])
    }

    render() {
        const { anchorEl } = this.state;

        const { teamUsers=[], buttonContent="Open Menu", buttonStyle={}} = this.props
        return (
            [<IconButton
                key="button"
                variant="outlined" 
                size="large"
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
                style={{...buttonStyle}}
            >
                <Tooltip title="Assign team member">
                    {buttonContent}
                </Tooltip>
            </IconButton>,
            <Menu
                key="menu"
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
            >
                {teamUsers.map((user,index) => (
                    <MenuItem
                        key={user.userId}
                        value={user.userId}
                        onClick={(event) => this.handleSelect(event, index)}
                        >
                        {user.displayName||user.email}
                    </MenuItem>
                ))}
            </Menu>]
        )
}
}

const mapStateToProps = (state) => {
    return {
        teamUsers: state.organisation.users
    }
}
export default connect(mapStateToProps)(SelectTeamMember)