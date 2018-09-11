import React from 'react'
import { Tooltip } from 'antd'
import { connect } from 'react-redux'
import * as actions from './../store/actions/filterActions'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'
import ClearIcon from '@material-ui/icons/Clear'

import Avatar from '@material-ui/core/Avatar';

import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';


import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

/* const fields = {
  chamber: "Chamber",
  status: "Status",
  portfolio: "Portfolio",
  update: "Update",
  summary: "Summary",
  title: "Title"
} */

const fields = [
  {
    key: "TYPE",
    value: "Document Type",
    isFacet: true
  },
  {
    key: "SOURCE",
    value: "Source",
    isFacet: true
  },
  {
    key: "_tags",
    value: "Is Tagged As",
    isFacet: true
  },
  {
    key: "SUBTYPE",
    value: "Document Subtype",
    isFacet: true
  },
  {
    key: "title",
    value: "Title",
  },
]

const operations = [
  {
    key: "is",
    value: "IS",
    isFacet: true
  },
  {
    key: "isnot",
    value: "IS NOT",
    isFacet: true
  },
  {
    key: "includes",
    value: "INCLUDES",
  },
  {
    key: "notinclude",
    value: "DOES NOT INCLUDE",
  },
  {
    key: "isblank",
    value: "IS BLANK",
  },
]

const InputWrapper = (props) => <div style={{marginRight: 16, flex: 1, color: "white", border: "1px solid #E7E7E7", padding: "4px 24px", borderRadius: 4, zIndex: 100}}>{props.children}</div>

class ListMenu extends React.Component {
  button = null;
  state = {
    anchorEl: null,
  };
  handleClickListItem = event => {
    this.props.onClick&&this.props.onClick()
    this.setState({ anchorEl: event.currentTarget });

  };
  handleMenuItemClick = (event, index) => {
    this.setState({ anchorEl: null });
    this.props.onSelect(index)
  }
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
            variant="outlined"
            style={{marginRight: 16, color: "#623aa2", background: "white",border: "1px solid #e8e8e8", ...this.props.style}}
          >
            <span style={{height: 32, display: "flex", alignItems: "center"}}>
              <div>{this.props.value?this.props.selectionOptions.filter(i=>i.key===this.props.value)[0].value:this.props.defaultValue}</div>
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
              width: (this.props.style&&this.props.style.width)||200,
            },
          }}
        >
          {this.props.selectionOptions&&this.props.selectionOptions.map((option, index) => (
            <MenuItem
              key={option.key||option.value}
              selected={option.key === this.props.value}
              onClick={event => this.handleMenuItemClick(event, option.key||option.value)}
            >
              {option.value}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

class ListMenuFacet extends React.Component {
  button = null;
  state = {
    anchorEl: null,
  };
  handleClickListItem = event => {
    this.props.onClick&&this.props.onClick()
    this.setState({ anchorEl: event.currentTarget });

  };
  handleMenuItemClick = (event, index) => {
    this.setState({ anchorEl: null });
    this.props.onSelect(index)
  }
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    return (
      <FormControl style={{width: "100%"}}>
        <InputLabel htmlFor="select-multiple-chip">{this.props.defaultValue}</InputLabel>
        <Select
          onOpen={this.handleClickListItem}
          onClose={this.handleClose}
          open={Boolean(anchorEl)}
          multiple
          value={this.props.value||[]}
          input={<Input id="select-multiple-chip" fullWidth/>}
          MenuProps={{PaperProps:{
            style: {
              maxHeight: 48 * 4.5,
              width: (this.props.style&&this.props.style.width)||200,
            }
          }}}
          onChange={event => this.handleMenuItemClick(event, event.target.value)}
          renderValue={selected => (
            <div>
              {selected.map(value => (
                <Chip key={value} label={value}/>
              ))}
            </div>
          )}
        >
          {this.props.selectionOptions&&this.props.selectionOptions.map((option, index) => (
            <MenuItem
              key={option.value}
              value={option.value}
              selected={option.value === this.props.value}
            >
              {option.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  }
}

const Element = (props) => <div style={{flexGrow: props.flexGrow, marginRight: 16}}>{props.children}</div>

const FilterRow = (props) => (
    <div style={{display: "flex", marginBottom: 8, width: "100%", justifyContent: "space-between", alignItems: "center"}}>
      {props.children}
    </div>
)

class FilterItem extends React.Component {
  render() {
    const { item: { field, operation, input }, itemNumber, filterFacets } = this.props
    const isFacet = field&&fields.filter(i=>i.key===field)[0].isFacet
    return (
      <FilterRow>
        {/* <div style={{background: "#f97794", width: "100%", height: 2, position: "absolute", zIndex: 0}} /> */}
        <Element>
          <Avatar>{itemNumber+1}</Avatar>
        </Element>
        <ListMenu 
          style={{width: 140}} 
          value={field} 
          defaultValue="Select field" 
          onSelect={e => {
            this.props.handleFilterFieldChange(itemNumber,e)
          }} 
          selectionOptions={fields}
          />
        {field&&<ListMenu 
          style={{width: 200}} 
          value={operation} 
          defaultValue="Choose operation" 
          onSelect={
            e => this.props.handleFilterOperationChange(itemNumber,e)
          } 
          selectionOptions={operations.filter(i=>i.isFacet===isFacet)}
          />}
        {operation&&isFacet&&operation!=="isblank"&&
           <InputWrapper><ListMenuFacet
            style={{width: 140}} 
            value={input} 
            defaultValue="Select values" 
            onSelect={e => {
              this.props.handleFilterInputChange(itemNumber,e)
            }} 
            onClick={()=>this.props.getFacetValues(field)}
            selectionOptions={filterFacets&&filterFacets[field]&&filterFacets[field].hits}
          /></InputWrapper>
        }
        {operation&&!isFacet&&operation!=="isblank"&&<InputWrapper>
          <TextField
            placeholder="Enter some filter tags"
            fullWidth
            value={input}
            margin="dense"
            onChange={e => this.props.handleFilterInputChange(itemNumber,e.target.value)}
            disabled={operation==="isblank"}
          />
        </InputWrapper>}
        <div style={{flex: 1}}/>
        <IconButton onClick={e => this.props.removeFilter(itemNumber)}>
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

const FreeTextFilter = (props) => {
    return (
      <FilterRow>
        <div 
          style={{padding: "0px 24px", paddingTop: 4, flex: 1, color: "white", background: "white", display: "flex", border: "1px solid #E7E7E7", borderRadius: 4}}>
          <div style={{flex: 1}}>
            <TextField
              placeholder="Enter some filter tags"
              fullWidth
              value={props.value}
              margin="dense"
              onChange={e => props.handleChange(e.target.value)}
            />
          </div>
          <IconButton onClick={()=>props.clearAction()}>
            <ClearIcon />
          </IconButton>
        </div>
      </FilterRow>
    )
  }

const SearchFilterContainer = ({filterItems, ...props}) => {
  return (
    <div>
      <FreeTextFilter value={props.searchFilter} handleChange={props.updateSearchFilter} clearAction={props.clearSearchFilter}/>
      {filterItems.map((item, i)=> (
        <FilterItem item={item} itemNumber={i} {...props}/>
      ))}
      {filterItems.length<5&&<AddFilterItem alt={filterItems.length===0} onClick={props.addNewFilter}/>}
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    filterItems: state.filter.filters,
    filterFacets: state.filter.facets,
    searchFilter: state.filter.searchFilter
  }
}

export default connect(mapStateToProps, actions)(SearchFilterContainer)
