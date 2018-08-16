import React from 'react'
import { connect } from 'react-redux'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

import DutyIcon from '@material-ui/icons/VerifiedUser';
import ObligationIcon from '@material-ui/icons/Beenhere';
import ProcessIcon from '@material-ui/icons/Update';




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

    handleSelect = (e, v) => {
        this.handleClose()
        this.props.handleChange&&this.props.handleChange({complianceType: v})
    }

    render() {
        const { anchorEl } = this.state;

        const statusItems = [
            {
                value: "DUTY",
                text: "DUTY",
                icon: <DutyIcon fontSize="inherit" style={{marginRight: 4}}/>
            },
            {
                value: "OBLIGATION",
                text: "OBLIGATION",
                icon:<ObligationIcon fontSize="inherit" style={{marginRight: 4}} />
            },
            {
                value: "PROCESS",
                text: "PROCESS",
                icon: <ProcessIcon fontSize="inherit" style={{marginRight: 4}} />
            },
        ]

        const getStateFromValue = (v) => statusItems.map(i=>i.value).indexOf(v)>-1?statusItems[statusItems.map(i=>i.value).indexOf(v)]:null

        const { value } = this.props
        return (
            [<Button
                variant={"contained"}
                size="small" 
                aria-owns={anchorEl ? 'simple-menu' : null}
                style={{opacity: 0.9 }}
                aria-haspopup="true"
                onClick={this.handleClick}
                color={"default"}
            >
                {value?[getStateFromValue(value).text]:"NOT SET"}
            </Button>,
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
            >
                {statusItems.map((status,index) => (
                    <MenuItem
                        key={status.value}
                        value={status.value}
                        selected={status.value === this.props.value}
                        onClick={(event) => this.handleSelect(event, statusItems[index].value)}
                        >
                        {status.text}
                    </MenuItem>
                ))}
            </Menu>]
        )
}
}

const mapStateToProps = (state, ownProps) => {
    return {
        teamUsers: state.organisation.users
    }
}
export default connect(mapStateToProps)(SelectTeamMember)