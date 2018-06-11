import React from 'react'

import { Select, Radio, Row, Col, Button, List, Avatar, Card, Icon, Tooltip } from 'antd';
import { themeColors, highlightThemeShades, primaryThemeShades } from './../theme'
import * as actions from './../store/actions/newsActions'
import { connect } from 'react-redux'
import Loader from './../components/FullPageLoader'
import Moment from 'react-moment'
import * as moment from 'moment'

const Option = Select.Option;

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}><Icon type="tag-o" /> {i.toString(36) + i}</Option>);
}

function handleChange(value) {
  console.log(value);
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

const NewsSourceAvatar = (props) => <Avatar shape="square" size="large" src={props.src} style={{margin: "0px 8px"}}>SITE</Avatar>

class NewsView extends React.Component {
  state = {
    selectedStory: null
  }
  componentDidMount(){
    this.props.fetchNewsSettings()
  }

  selectStory = (id) => {
    this.setState({selectedStory: id})
  }

  deSelectStory = (id) => {
    this.setState({selectedStory: null})
  }

  render() {
    const src2avatar = (src) => {
      switch(src){
        case "canberratimes":
          return "https://images-na.ssl-images-amazon.com/images/I/515Xyd2a1DL.png"
        case "abcnews":
          return "https://crunchbase-production-res.cloudinary.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1487974641/m4xu8idtom4cbfrpjeja.png"
        case "sbsnews":
          return "https://static-s.aa-cdn.net/img/ios/432849691/7106e1ff4da146f99e943b750cd558d8?v=1"
        case "smh":
          return "https://startme.com/favicon/smh.com.au"
        case "theage":
          return "http://www.allyoucanread.com/images/fi/theage_com_au.ico"
        default:
          return null
      }
    }
    return (
      !this.props.isFetching?<Row>
        <Row style={{width: "100%", padding: "32px 140px", background: primaryThemeShades[3]}}>
            <Row style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginBottom: 32}}>
                <h1 style={{textAlign: "center", fontSize: "4em", fontWeight: 800, marginBottom: 0, color: "white"}}>Polity News Tracker</h1>
                <h2 style={{textAlign: "center", fontSize: "2em", color: "white", fontWeight: 300}}>We listen, watch and track news for you.</h2>
                <div>
                  <NewsSourceAvatar src="https://images-na.ssl-images-amazon.com/images/I/515Xyd2a1DL.png"/>
                  <NewsSourceAvatar src="https://crunchbase-production-res.cloudinary.com/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/v1487974641/m4xu8idtom4cbfrpjeja.png"/>
                  <NewsSourceAvatar src="https://static-s.aa-cdn.net/img/ios/432849691/7106e1ff4da146f99e943b750cd558d8?v=1"/>
                  <NewsSourceAvatar src="https://al-shabaka.org/wp-content/uploads/2016/01/f3c9e3989acac29769ce01b920f526bb.png"/>
                  <NewsSourceAvatar src="https://startme.com/favicon/smh.com.au"/>
                  <NewsSourceAvatar src="http://www.allyoucanread.com/images/fi/theage_com_au.ico"/>
                  <NewsSourceAvatar src="https://is1-ssl.mzstatic.com/image/thumb/Purple118/v4/ae/0b/79/ae0b794c-169b-5c88-c968-2ae4c4305b81/source/256x256bb.jpg"/>
                  <NewsSourceAvatar src="https://static-s.aa-cdn.net/img/ios/316391924/f38699c422db0585661cfe7e2c826447?v=1"/>
                </div>
            </Row>
            <Row style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <Col span={18}>
                    <InputDiv handleChange={this.props.handleTagChange} value={this.props.searchTags}/>
                </Col>
                <Button size="large" loading={this.props.isSaving} disabled={!this.props.isUnsaved} onClick={this.props.saveNewsSettings} style={{background: highlightThemeShades[2], color: primaryThemeShades[3], borderColor: highlightThemeShades[2]}}><strong>Save News Tags</strong></Button>
            </Row>
        </Row>
        <Row style={{width: "100%", padding: "32px 140px"}}>
            <Card style={{borderRadius: 8}}>
                <List
                    itemLayout="horizontal"
                    dataSource={this.props.rssItems.sort((a,b)=>moment(b.isoDate).isAfter(a.isoDate))}
                    loading={this.props.isFetchingRss}
                    renderItem={(item,i) => (
                    <List.Item key={item.objectID}>
                        <List.Item.Meta 
                            avatar={<Avatar src={src2avatar(item.source)} shape="square"/>}
                            title={<a href={item.link} target="_blank">{item.title} <a href={item.link} target="_blank"><Icon type="share-alt" /> share</a></a>}
                            description={
                              <p>
                                <Tooltip title={<small>Posted <Moment format="dddd DD MMMM YYYY hh:mm a">{item.isoDate}</Moment></small>}>
                                  <strong>Posted <Moment fromNow>{item.isoDate}</Moment></strong>
                                </Tooltip> 
                                - {item.content}
                                <small>{item.creator&&` (by ${item.creator})`}</small>
                              </p>}
                        />
                    </List.Item>
                    )}
                />
            </Card>
            
        </Row>
    </Row>:<div style={{width: "100%", height: "90vh", display: "flex", justifyContent: "center", alignItems: "center"}}><Loader /></div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    searchTags: state.news.searchTags,
    isSaving: state.news.isSaving,
    isUnsaved: state.news.isUnsaved,
    isFetching: state.news.isFetching,
    isFetchingRss: state.news.isFetchingRss,
    rssItems: state.news.rssItems
  }
}

export default connect(mapStateToProps, actions)(NewsView)