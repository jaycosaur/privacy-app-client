import React from 'react'
import { Input } from 'antd'
import { connect } from 'react-redux'
import * as actions from './../store/actions/filterActions'

const Comp = (props) => {
  return (
    <div className="search-sider-input">
        <Input.Search
            placeholder="Search keywords & topics"
            onSearch={value => props.submitPolicySearch('woot')}
            value={props.keywordInput}
            onChange={e=>props.handleKeywordInputChange(e.target.value)}
            enterButton
            style={{marginBottom: 8, borderRadius: 0}}
            id="search-sider-input"
        />
    </div>
  )
}



const mapStateToProps = (state, ownProps) => {
    return {
        keywordInput: state.filter.keywordInput
    }
}

export default connect(mapStateToProps, actions)(Comp)