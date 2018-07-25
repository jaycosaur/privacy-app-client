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
        <div style={{width: 400, display: "flex", justifyContent: "center"}}><InputDiv handleChange={props.handleTagChange} value={props.searchTags}/><Button size="large" loading={props.isSaving} disabled={!props.isUnsaved} onClick={props.saveNewsSettings} style={{background: highlightThemeShades[2], color: primaryThemeShades[3], borderColor: highlightThemeShades[2]}}><strong>Save News Tags</strong></Button></div>,
      ]            
      return <span>{actionsArray}</span>
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
export const topBarTitle = ["Media & Commentary",
            <span>
              <NewsSourceAvatar src="https://images-na.ssl-images-amazon.com/images/I/515Xyd2a1DL.png"/>
              <NewsSourceAvatar src="https://crunchbase-production-res.cloudinary.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1487974641/m4xu8idtom4cbfrpjeja.png"/>
              <NewsSourceAvatar src="https://static-s.aa-cdn.net/img/ios/432849691/7106e1ff4da146f99e943b750cd558d8?v=1"/>
              <NewsSourceAvatar src="https://al-shabaka.org/wp-content/uploads/2016/01/f3c9e3989acac29769ce01b920f526bb.png"/>
              <NewsSourceAvatar src="https://startme.com/favicon/smh.com.au"/>
              <NewsSourceAvatar src="http://www.allyoucanread.com/images/fi/theage_com_au.ico"/>
              <NewsSourceAvatar src="https://is1-ssl.mzstatic.com/image/thumb/Purple118/v4/ae/0b/79/ae0b794c-169b-5c88-c968-2ae4c4305b81/source/256x256bb.jpg"/>
              <NewsSourceAvatar src="https://static-s.aa-cdn.net/img/ios/316391924/f38699c422db0585661cfe7e2c826447?v=1"/>
            </span>]