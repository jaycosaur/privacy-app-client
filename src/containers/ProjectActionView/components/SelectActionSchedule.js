import React from 'react'
import { connect } from 'react-redux'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import DutyIcon from '@material-ui/icons/VerifiedUser';
import ObligationIcon from '@material-ui/icons/Beenhere';
import ProcessIcon from '@material-ui/icons/Update';
import ScheduleIcon from '@material-ui/icons/Schedule';




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
        this.props.handleChange&&this.props.handleChange({schedule: v})
    }

    render() {
        const { anchorEl } = this.state;

        const statusItems = [
            {
                value: "d",
                text: "Every Day",
            },
            {
                value: "w",
                text: "Every Week",
            },
            {
                value: "M",
                text: "Every Month",
            },
            {
                value: "Q",
                text: "Every Quarter",
            },{
                value: "Y",
                text: "Every Year",
            },
        ]

        const { value } = this.props
        return (
            [<Button 
                onClick={this.handleClick}
                style={{opacity: 0.9 }}
                aria-haspopup="true"
                aria-owns={anchorEl ? 'simple-menu' : null}
                color={value&&"secondary"}
                style={{color: !value&&"#ccc"}}
                >
                <ScheduleIcon />
            </Button>,
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={this.handleClose}
            >
                <MenuItem
                    key={'clear'}
                    value={null}
                    selected={this.props.value=== null}
                    onClick={(event) => this.handleSelect(event, null)}
                    >
                    Clear
                </MenuItem>
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

const mapStateToProps = (state) => {
    return {
        teamUsers: state.organisation.users
    }
}
export default connect(mapStateToProps)(SelectTeamMember)