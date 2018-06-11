import React from 'react'
import { Button, Input, Select, Avatar, Icon, Tooltip } from 'antd'
import { connect } from 'react-redux'
import * as actions from './../store/actions/filterActions'

const { Option } = Select

const Element = (props) => <div style={{flexGrow: props.flexGrow, marginRight: 16}}>{props.children}</div>
const FilterRow = (props) => (
    <div style={{display: "flex", marginBottom: 8, width: "100%", justifyContent: "space-between"}}>{props.children}</div>
)

class FilterItem extends React.Component {
  render() {
    return (
      <FilterRow>
        <div style={{display: "flex"}}>
          <Element>
            <Avatar shapre="square">{this.props.itemNumber+1}</Avatar>
          </Element>
          <Element>
            <Select style={{width: 160}} id="filterField" value={this.props.item.field} defaultValue="Select Field" onSelect={e => this.props.handleFilterFieldChange(this.props.itemNumber,e)}>
              <Option value="chamber">Chamber</Option>
              <Option value="status">Status</Option>
              <Option value="portfolio">Portfolio</Option>
              <Option value="update">Latest Update</Option>
            </Select>
          </Element>
          <Element>
            <Select style={{width: 220}} id="filterOperation" value={this.props.item.operation} defaultValue="Choose operation" onSelect={e => this.props.handleFilterOperationChange(this.props.itemNumber,e)}>
              <Option value="is">IS</Option>
              <Option value="isnot">IS NOT</Option>
              <Option value="includes">INCLUDES</Option>
              <Option value="notinclude">DOES NOT INCLUDE</Option>
            </Select>
          </Element>
        </div>
        <Element flexGrow={1}>
            <Input.Search value={this.props.item.input} onChange={e => this.props.handleFilterInputChange(this.props.itemNumber,e.target.value)} />
        </Element>
        <Button icon="cross" shape="circle" onClick={e => this.props.removeFilter(this.props.itemNumber)}/>
      </FilterRow>
    )
  }
}

const AddFilterItem = (props) => (
  <FilterRow>
    <Element>
      {!props.alt
        ?<Tooltip placement="right" title="Add another filter."><Button type="primary" shape="square" icon="plus" onClick={props.onClick}/></Tooltip>
        :<Button type="primary" shape="square" onClick={props.onClick}><Icon type="plus-circle-o" /> Add A Filter</Button>
      }
    </Element>
  </FilterRow>
)

const SearchFilterContainer = ({filterItems, ...props}) => {
  return (
    <div style={{paddingBottom: "8px"}}>
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
