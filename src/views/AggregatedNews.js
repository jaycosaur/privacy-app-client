import React from 'react'

import { List, Avatar, Icon, Tooltip } from 'antd';
import { Link } from 'react-router-dom'

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase'


import * as actions from './../store/actions/newsActions'
import * as searchActions from './../store/actions/searchActions'
import { connect } from 'react-redux'
import Loader from './../components/FullPageLoader'
import Moment from 'react-moment'
import * as moment from 'moment'

import ListTableView from './../containers/ListContainerViews/TableView'
import ListTimelineView from './../containers/ListContainerViews/TimelineView'

const searchStoreIndex = ""

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

  deSelectStory = () => {
    this.setState({ selectedStory: null });
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

    const columnData = [
      { id: 'title', numeric: false, padding: false, label: 'Title', shrinkText: true, linkKey: 'link'  },
      { id: 'content', numeric: false, padding: false, label: 'Content', shrinkText: true},
      { id: 'isoDate', numeric: false, padding: false, label: 'Posted' },
      { id: 'avatar', numeric: false, padding: "none", label: 'source'},
    ]

    const defaultView = (
        <Card style={{borderRadius: 0}}>
          <CardContent style={{}}>
          <List
              itemLayout="horizontal"
              dataSource={this.props.rssItems.sort((a,b)=>moment(b.isoDate).isAfter(a.isoDate))}
              loading={this.props.isFetchingRss}
              renderItem={(item) => (
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
          </CardContent>
      </Card>
    )
    const classes = {}

    const TimelineItemView = (props) => (
      <ButtonBase style={{width: "100%"}}>
        <Link to={props.link} style={{width: "100%"}}>
          <Card className={classes.card} style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
            <div className={classes.details} style={{
                display: 'flex',
                flexDirection: 'column',
              }}>
              <CardContent className={classes.content} style={{}}>
                <Typography variant="headline">{props.title}</Typography>
                <Typography variant="subheading" color="textSecondary">
                  {props.content}
                </Typography>
                <Typography variant="paragraph" color="textSecondary">
                  <strong>Posted <Moment fromNow>{props.isoDate}</Moment></strong>
                  <small>{props.creator&&`(by ${props.creator})`}</small>
                </Typography>
              </CardContent>
            </div>
            <CardMedia
              className={classes.cover}
              style={{width: 151,
                height: 151, padding: 8, margin: 32}}
              image={src2avatar(props.source)}
              title="Live from space album cover"
            />
          </Card> 
        </Link>
      </ButtonBase>
    )

    const ViewType = (props) => {
      const tableView =  (
        <ListTableView 
          showHeader={false} 
          columnData={columnData} 
          data={this.props.rssItems.sort((a,b)=>moment(b.timestamp)
                  .isAfter(a.timestamp))
                  .map((i)=>({...i,id: i.objectID, avatar: <Avatar src={src2avatar(i.source)} shape="square"/>}))} 
          handleRowSelect={(item, allSelected)=>console.log(item, allSelected)}
        />
      )
      const dateView = <ListTimelineView 
        grouping={this.props.rssItems.sort((a,b)=>moment(b.timestamp).isAfter(a.timestamp)).map((i)=>(<Moment fromNow>{i.isoDate}</Moment>))}
        itemRender={this.props.rssItems.sort((a,b)=>moment(b.timestamp).isAfter(a.timestamp)).map((i)=> <TimelineItemView {...i}/>)} 
        />
  
      switch(props.selectedView){
          case "date":
              return dateView
          case "table":
              return tableView
          default:
              return defaultView
      }
    }

    return (
        !this.props.isFetching?<ViewType {...this.props}/>
        :<div style={{width: "100%", height: "90vh", display: "flex", justifyContent: "center", alignItems: "center"}}><Loader /></div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    searchTags: state.news.searchTags,
    isSaving: state.news.isSaving,
    isUnsaved: state.news.isUnsaved,
    isFetching: state.news.isFetching,
    isFetchingRss: state.news.isFetchingRss,
    rssItems: state.news.rssItems,
    selectedView: state.filter.selectedView,
    storeRef: state.search[searchStoreIndex]
  }
}

export default connect(mapStateToProps,{ ...actions, ...searchActions })(NewsView)