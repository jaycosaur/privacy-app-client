import React from 'react'

import { Select, Button, Avatar, Icon } from 'antd';
import { highlightThemeShades, primaryThemeShades } from './../../../theme'
import * as actions from './../../../store/actions/newsActions'
import { connect } from 'react-redux'

const Option = Select.Option;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}><Icon type="tag-o" /> {i.toString(36) + i}</Option>);
}


class InputDiv extends React.Component {
  render() {
    return (
        <Select
          mode="tags"
          size="large"
          placeholder="Enter some search tags or areas of interest"
          onChange={this.props.handleChange}
          value={this.props.value}
          style={{ width: '100%' }}
        >
        </Select>
    )
  }
}

const NewsSourceAvatar = (props) => <Avatar shape="square" size="small" src={props.src} style={{margin: "0px 8px"}}>SITE</Avatar>

const ActionCreator = (props) => {
    const actionsArray = [
        <div style={{width: 400, display: "flex", justifyContent: "center"}}>
          <InputDiv handleChange={props.handleTagChange} value={props.searchTags}/>
          <Button size="large" loading={props.isSaving} disabled={!props.isUnsaved} onClick={props.saveNewsSettings} style={{background: highlightThemeShades[2], color: primaryThemeShades[3], borderColor: highlightThemeShades[2]}}><strong>Save News Tags</strong></Button></div>,
      ]            
      return null
}

const mapStateToProps = (state) => {
  return {
    searchTags: state.news.searchTags,
    isSaving: state.news.isSaving,
    isUnsaved: state.news.isUnsaved,
    isFetching: state.news.isFetching,
    isFetchingRss: state.news.isFetchingRss,
    rssItems: state.news.rssItems
  }
}

export const TopBarActions = connect(mapStateToProps, actions)(ActionCreator)
export const topBarTitle = ["Media & Commentary"]