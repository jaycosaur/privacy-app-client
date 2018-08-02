import React from 'react'
import { connect } from 'react-redux'
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import MenuList from '@material-ui/core/MenuList';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';


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
        this.props.handleChange&&this.props.handleChange({status: v})
    }

    render() {
        const { anchorEl } = this.state;

        const statusItems = [
            {
                value: "TODO",
                text: "TO-DO"
            },
            {
                value: "INPROGRESS",
                text: "IN PROGRESS"
            },
            {
                value: "DONE",
                text: "DONE"
            },
        ]

        const getStateFromValue = (v) => statusItems.map(i=>i.value).indexOf(v)>-1?statusItems[statusItems.map(i=>i.value).indexOf(v)]:null

        const { isUrgent, isDue, value } = this.props
        return (
            [<Button
                variant={value!=="DONE"&&isUrgent?"contained":"outlined"}
                size="medium" 
                aria-owns={anchorEl ? 'simple-menu' : null}
                style={{opacity: 0.9, marginRight: 8}}
                aria-haspopup="true"
                onClick={this.handleClick}
                color={isUrgent?"secondary":value==="TODO"?"primary":(value==="INPROGRESS"?"secondary":"default")}
                style={{color: value==="DONE"?"green":(isDue&&!isUrgent)?"red":null,opacity: 0.9, marginRight: 8 }}
            >
                {value!=="DONE"?(isUrgent?"URGENT":isDue?"OVERDUE":getStateFromValue(value).text):getStateFromValue(value).text}
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