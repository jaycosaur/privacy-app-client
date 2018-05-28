import React from 'react'

import { Select, Radio, Row, Col, Button, List, Avatar, Card, Icon } from 'antd';
import { themeColors, highlightThemeShades, primaryThemeShades } from './../theme'
import * as actions from './../store/actions/newsActions'
import { connect } from 'react-redux'
import Loader from './../components/FullPageLoader'

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
          {children}
        </Select>
    )
  }
}

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

const NewsSourceAvatar = (props) => <Avatar shape="square" size="large" style={{margin: "0px 8px"}}>SITE</Avatar>

class NewsView extends React.Component {
  componentDidMount(){
    this.props.fetchNewsSettings()
  }

  render() {
    return (
      !this.props.isFetching?<Row>
        <Row style={{width: "100%", padding: "32px 140px", background: primaryThemeShades[3]}}>
            <Row style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginBottom: 32}}>
                <h1 style={{textAlign: "center", fontSize: "4em", fontWeight: 800, marginBottom: 0, color: "white"}}>Polity News Tracker</h1>
                <h2 style={{textAlign: "center", fontSize: "2em", color: "white", fontWeight: 300}}>News site listener, watcher and tracker.</h2>
                <div><NewsSourceAvatar /><NewsSourceAvatar /><NewsSourceAvatar /><NewsSourceAvatar /><NewsSourceAvatar /><NewsSourceAvatar /><NewsSourceAvatar /><NewsSourceAvatar /></div>
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
                    dataSource={data}
                    renderItem={item => (
                    <List.Item actions={[<a><Icon type="share-alt" /> share</a>]}>
                        <List.Item.Meta 
                            avatar={<Avatar size="large" shape="square">SITE</Avatar>}
                            title={<a href="https://ant.design">Some amazing news title, look how sweet this is going to be {item.title} <small>(newsiteurl.com.au)</small></a>}
                            description={<p><strong>Posted 32 minutes ago.</strong> - Ant Design, a design language for background applications, is refined by Ant UED Team</p>}
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
  }
}

export default connect(mapStateToProps, actions)(NewsView)