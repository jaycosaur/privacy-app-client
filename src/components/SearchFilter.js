import React from 'react'
import { Input, Select, Tooltip } from 'antd'
import { connect } from 'react-redux'
import * as actions from './../store/actions/filterActions'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import Avatar from '@material-ui/core/Avatar';

const fields = {
  chamber: "Chamber",
  status: "Status",
  portfolio: "Portfolio",
  update: "Update",
  summary: "Summary",
  title: "Title"
}

const operations = {
  is: "IS",
  isnot: "IS NOT",
  includes: "INCLUDES",
  notinclude: "DOES NOT INCLUDE",
  isblank: "IS BLANK"
}

class ListMenu extends React.Component {
  button = null;

  state = {
    anchorEl: null,
  };

  handleClickListItem = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuItemClick = (event, index) => {
    this.setState({ anchorEl: null });
    this.props.onSelect(index)
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <div>
          <Button
            aria-haspopup="true"
            aria-controls="lock-menu"
            aria-label="When device is locked"
            onClick={this.handleClickListItem}
            variant="contained"
            style={{marginRight: 16, color: "#623aa2", ...this.props.style}}
          >
            <span style={{height: 41, display: "flex", alignItems: "center"}}>
              <div>{this.props.value?this.props.selectionOptions[this.props.value]:this.props.defaultValue}</div>
            </span>
          </Button>
        <Menu
          id="button-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: 48 * 4.5,
              width: this.props.style&&this.props.style.width||200,
            },
          }}
        >
          {Object.keys(this.props.selectionOptions).map((key, index) => (
            <MenuItem
              key={key}
              selected={key === this.props.value}
              onClick={event => this.handleMenuItemClick(event, key)}
            >
              {this.props.selectionOptions[key]}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

const Element = (props) => <div style={{flexGrow: props.flexGrow, marginRight: 16}}>{props.children}</div>

const FilterRow = (props) => (
    <div style={{display: "flex", marginBottom: 8, width: "100%", justifyContent: "space-between", alignItems: "center"}}>{props.children}</div>
)

class FilterItem extends React.Component {
  render() {
    return (
      <FilterRow>
        <Element>
          <Avatar>{this.props.itemNumber+1}</Avatar>
        </Element>
        <ListMenu style={{width: 140}} value={this.props.item.field} defaultValue="Select field" onSelect={e => this.props.handleFilterFieldChange(this.props.itemNumber,e)} selectionOptions={fields}/>
        <ListMenu style={{width: 200}} value={this.props.item.operation} defaultValue="Choose operation" onSelect={e => this.props.handleFilterOperationChange(this.props.itemNumber,e)} selectionOptions={operations}/>
        {this.props.item.operation!=="isblank"&&<Button 
          disabled={this.props.item.operation==="isblank"}
          variant="contained" 
          style={{marginRight: 16, flex: 1, color: "white"}}>
          <TextField
            placeholder="Enter some filter tags"
            fullWidth
            value={this.props.item.input}
            margin="dense"
            onChange={e => this.props.handleFilterInputChange(this.props.itemNumber,e.target.value)}
            disabled={this.props.item.operation==="isblank"}
          />
        </Button>}
        {this.props.item.operation==="isblank"&&<div style={{flex: 1}}/>}
        <IconButton onClick={e => this.props.removeFilter(this.props.itemNumber)}>
          <DeleteIcon />
        </IconButton>
      </FilterRow>
    )
  }
}

const AddFilterItem = (props) => (
  <FilterRow>
    <Element>
      {!props.alt
        ?<Tooltip placement="right" title="Add another filter."><Button variant="fab" color="primary" style={{color: "white"}} mini onClick={props.onClick}><AddIcon /></Button></Tooltip>
        :<Button variant="extendedFab" color="primary" style={{color: "white"}} onClick={props.onClick}><AddIcon /> ADD A FILTER</Button>
      }
    </Element>
  </FilterRow>
)

const SearchFilterContainer = ({filterItems, ...props}) => {
  return (
    <div>
      {filterItems.map((item, i)=> (
        <FilterItem item={item} itemNumber={i} {...props}/>
      ))}
      {filterItems.length<5&&<AddFilterItem alt={filterItems.length===0} onClick={props.addNewFilter}/>}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    filterItems: state.filter.filters
  }
}

export default connect(mapStateToProps, actions)(SearchFilterContainer)
