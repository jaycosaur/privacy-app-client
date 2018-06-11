import React from 'react'
import { connect } from 'react-redux'
import * as actions from './../store/actions/watchlistActions'
import { Select, Radio, Row, Col, Button, List, Avatar, Card, Icon, Layout, Badge, Popconfirm, notification } from 'antd';
import { themeColors, highlightThemeShades, primaryThemeShades } from './../theme'
import Loader from './../components/FullPageLoader'
import { Link } from 'react-router-dom'


const Option = Select.Option;

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
  }
];

const openNotification = () => {
    notification.open({
      message: 'Create a new Watch Alert',
      description: "From the policy tracking page, simply configure your search terms and your filters than click the 'Create Watch' button.",
      icon: <Icon type="global" style={{ color: themeColors[3] }} />,
      duration: 10,
    });
  };

class WatchlistView extends React.Component {
    componentDidMount(){
        this.props.getWatchlistItems()
      }
    render() {
        return (
            !this.props.isFetching?<div style={{minHeight: "100vh"}}>
                <Layout.Header style={{background: primaryThemeShades[3], boxShadow: "0 5px 5px -5px #333", zIndex: 100, position: "fixed", left: 0, top: 64, width: "100%"}}>
                    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <Button ghost shape="circle" icon="setting" style={{marginRight: 16}}/>
                            <span style={{fontWeight: 800, fontSize: "2em", color: highlightThemeShades[2]}}>WATCHLIST</span>
                        </div>
                        <div>
                            <Link to="policy-tracker"><Button onClick={openNotification} style={{ background: highlightThemeShades[2], borderColor: highlightThemeShades[2], color: primaryThemeShades[3]}}><strong><Icon type="plus-circle-o" /> CREATE NEW POLICY ALERT</strong></Button></Link>
                        </div>
                    </div>  
                </Layout.Header>
                <Row style={{width: "100%", padding: "32px 140px", marginTop: 64}}>
                    <Card style={{borderRadius: 8}}>
                    {this.props.watchlistItems.length>0?<List
                            itemLayout="horizontal"
                            dataSource={this.props.watchlistItems}
                            renderItem={item => (
                            <List.Item key={item.id} 
                                actions={
                                    [
                                        <Button size="small"><Icon type="setting" /> Settings</Button>, 
                                        <Popconfirm title="Are you sure delete this Watch?" onConfirm={e=> this.props.deleteWatchlistItem(item.id)} okText="Yes" cancelText="No">
                                            <Button loading={this.props.isDeleting===item.id} size="small" type="danger" ghost>{this.props.isDeleting!==item.id&&<Icon type="delete" />} Delete Watch</Button>
                                        </Popconfirm>]}>
                                <List.Item.Meta 
                                    avatar={<Badge count={Math.round(Math.random()*20)}overflowCount={10} style={{ backgroundColor: '#52c41a' }}><Avatar size="large" shape="square" icon="global" /></Badge>}
                                    title={<Link to={`/policy-tracker/${item.id}`}>{item.title}</Link>}
                                    description={<p><small><strong>Watching</strong> {item.watchedItemIds.length} items | <strong>Latest Update:</strong> 6 hours ago. </small></p>}
                                />
                            </List.Item>
                            )}
                        />: <p style={{textAlign: "center", margin: 0}}>Oh no! It looks like you haven't created any Watch Alerts yet. Add some then check back here.</p>}
                    </Card>
                </Row>
            </div>:<div style={{width: "100%", height: "90vh", display: "flex", justifyContent: "center", alignItems: "center"}}><Loader /></div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        /*isSaving: state.watchlist.isSaving,
        isUnsaved: state.watchlist.isUnsaved,*/
        isFetching: state.watchlist.isFetching,
        isDeleting: state.watchlist.isDeleting,
        watchlistItems: state.watchlist.watchlistItems
    }
}

export default connect(mapStateToProps, actions)(WatchlistView)