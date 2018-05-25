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
            <Select style={{width: 160}} defaultValue="Select Field">
              <Option value="jack">Chamber</Option>
              <Option value="lucy">Status</Option>
              <Option value="disabled" disabled>Portfolio</Option>
              <Option value="Yiminghe">Latest Update</Option>
            </Select>
          </Element>
          <Element>
            <Select style={{width: 220}} defaultValue="Choose operation">
              <Option value="jack">IS</Option>
              <Option value="lucy">IS NOT</Option>
              <Option value="disabled" disabled>INCLUDES</Option>
              <Option value="Yiminghe">DOES NOT INCLUDE</Option>
            </Select>
          </Element>
        </div>
        <Element flexGrow={1}>
            <Input.Search />
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
        <FilterItem itemNumber={i} {...props}/>
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
