import React from 'react'
import { Icon } from 'antd'

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';

import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TurnedInIcon from '@material-ui/icons/TurnedIn';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import InfiniteScroll from 'react-infinite-scroller';

import Chip from '@material-ui/core/Chip';
import ListTableView from './../ListContainerViews/TableView'
import ListTimelineView from './../ListContainerViews/TimelineView'

import * as searchActions from './../../store/actions/searchActions'
import * as searchViewActions from './../../store/actions/searchViewActions'
import * as watchlistActions from './../../store/actions/watchlistActions'
import moment from 'moment'
import { debounce } from "debounce";

const MEDIA_KEY = "media"
const REG_KEY = "reg"
const RESEARCH_KEY = "research"
const GLOBAL_KEY = "global"

const storeKeyName = (searchCat) => {
    switch(searchCat){
        case "media-and-commentary":
            return MEDIA_KEY
        case "regulation":
            return REG_KEY
        case "research":
            return RESEARCH_KEY
        default:
            return GLOBAL_KEY
    }
}

const searchIndexKey = (searchCat) => {
    switch(searchCat){
        case "media-and-commentary":
            return 'MEDIA'
        case "regulation":
            return 'REGULATION'
        case "research":
            return 'RESEARCH'
        default:
            return "GLOBAL"
    }
}



const columnData = [
    { id: 'title', numeric: false, padding: "none", label: 'Legislation Title', linkKey: 'link' },
    { id: 'SOURCE', numeric: false, padding: false, label: 'Source', shrinkText: true, isChip: true },
    { id: 'SUBTYPE', numeric: false, padding: false, label: 'Subtype', shrinkText: true, isChip: true },
    { id: 'TYPE', numeric: false, padding: false, label: 'Type', shrinkText: true, isChip: true },
    { id: 'lastUpdatedISO', numeric: false, padding: false, label: 'Last Updated' },
  ]

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
  });

class ListItem extends React.Component {
    state = {
        isExpanded: false
    }
    toggleExpand = () => {
        console.log(this.props.item)
        this.setState(state => {
            return {
                isExpanded: !state.isExpanded
            }
        })
    }

    toggleReadLater = () => {
        if(!this.props.inReadLaterList){
            this.props.saveToReadLaterList(this.props.item.id)
        } else {
            this.props.removeFromReadLaterList(this.props.item.id)
        }
    }

    render() {
        const { item } = this.props
        
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <IconButton onClick={()=>this.toggleReadLater()} disabled={!item.id}> 
                        {this.props.inReadLaterList?<TurnedInIcon/>:<TurnedInNotIcon/>}
                    </IconButton>
                    
                    <div style={{display: "flex", flexDirection: "column", flex: 1}}>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                            <div style={{display: "flex", alignItems: "center", flex: 1}}>
                                <Typography variant="subheading" gutterBottom><a href={item.link} target="_blank" >{item.title}</a></Typography>
                            </div>
                            {
                                [["Chamber", item.chamber], ["Status", item.status], ["Portfolio", item.portfolio]].map((item, i) => (
                                    item[1]&&<Chip key={i} label={`${item[0]}: ${item[1]}`} />
                                ))
                            }
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                            <Typography variant="caption">
                                <strong>Last Updated:</strong> {moment(item.lastUpdatedISO).fromNow()} |  <strong>Posted Date:</strong> {moment(item.createdOn).format("LLLL")}
                            </Typography>
                        </div>
                    </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        {item.summary}
                    </Typography>
                    <div>
                        <a target="_blank" href={item.explanatoryMemorandum}><Button size="small" type="dashed"><Icon type="file" />Explanatory Memorandum</Button></a>
                        <a target="_blank" href={item.billLink} style={{ marginLeft: 16 }}><Button size="small" type="dashed"><Icon type="link" />Bill</Button></a>
                    </div>
                </ExpansionPanelDetails>
                <ExpansionPanelActions>
                    <Button variant="contained" color="secondary" style={{marginRight: 16}}>ADD TO WATCHLIST</Button>
                    <Button variant="contained" color="primary" style={{color: "white"}}>
                        Create Obligation
                    </Button>
                </ExpansionPanelActions>
            </ExpansionPanel>
        )
    }
}

class ListItemLoader extends React.Component {
    render() {   
        const bg = "#eee"     
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<div style={{background: bg, width: 48, height: 48, borderRadius: 50}}/>}>
                    <div style={{background: bg, width: 32, height: 32, borderRadius: 50, margin: 6}}/>
                    <div style={{display: "flex", flexDirection: "column", flex: 1}}>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%"}}>
                            <div style={{background: bg, width: 600, height: 24, borderRadius: 5, marginBottom: 8}}/>
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
                            <div style={{background: bg, width: 400, height: 16, borderRadius: 5}}/>
                        </div>
                    </div>
                </ExpansionPanelSummary>
            </ExpansionPanel>
        )
    }
}

class SearchView extends React.Component {
    state = {
        stopLoad: false,
        filters: []
    }

    componentDidMount() {
        this.loadItems(0)
    }

    loadItemsUn = (page,itemsPerPage) => {
        (!this.props.search||!this.props.search.isLoading)&&this.props.getSearch({
            query: this.props.filters.filter(i=>i.field==="title").map(i=>i.input).join(" "), 
            filters: null, 
            key: storeKeyName(this.props.searchCategory) ,
            page, 
            hitsPerPage: itemsPerPage,
            searchType: searchIndexKey(this.props.searchCategory)})
    }

    loadItems = (page,itemsPerPage) => debounce(this.loadItemsUn(page,itemsPerPage),500)

    componentDidUpdate(prevProps, prevState, snapshot){
        const searchResults = this.props.search && this.props.search.results
        const searchMeta = this.props.search && this.props.search.searchMeta
        searchMeta&&this.props.setNumberOfResults(searchResults.length)
        searchMeta&&this.props.setNumberOfResultsTotal(searchMeta.nbHits)
        searchMeta&&this.props.setFetchedIn(searchMeta.processingTimeMS)
        // if(prevProps.filters.filter(i=>i.input!==null&&i.field!==null&&i.operation!==null)!==this.props.filters.filter(i=>i.input!==null&&i.field!==null&&i.operation!==null)){
        if(prevProps.filters!==this.props.filters || prevProps.searchFilter!==this.props.searchFilter){
            this.loadItems(0)
        }
    }

    render() {
        const searchResults = this.props.search && this.props.search.results
        const searchMeta = this.props.search && this.props.search.searchMeta
        const isLoading = this.props.search && this.props.search.isLoading
        const Loader = () => [...Array(7)].map(i=><ListItemLoader key={i}/>)
        const { searchCategory } = this.props

        const view = () => {
            return <ListTableView 
                        showHeader={false} 
                        columnData={columnData} 
                        data={searchResults.map((i,j)=>({...i, index:j, lastUpdatedISO: moment(i.lastUpdatedISO).format("ll")}))} 
                        handleRowSelect={this.props.handleRowSelect}
                        handleRequestSort={this.props.handleRequestSort}
                        handleRowClearSelected={this.props.handleRowClearSelected}
                        numberOfResults={searchMeta.nbHits}
                        loadMore={this.loadItems}
                        />
            switch(this.props.selectedView){
                case "date":
                    return <div style={{height: "100%", overflow: "auto"}}>
                        <InfiniteScroll
                                pageStart={1}
                                loadMore={this.loadItems}
                                hasMore={!isLoading&&searchMeta.page<=searchMeta.nbPages}
                                initialLoad={false}
                                loader={<Loader/>}
                                useWindow={false}
                            >
                            <ListTimelineView 
                                grouping={(searchResults.sort((a,b)=>moment(searchCategory!=="media-and-commentary"?a.createdOn:a.isoDate).isBefore(searchCategory!=="media-and-commentary"?b.createdOn:b.isoDate)).map(i=>moment(searchCategory!=="media-and-commentary"?i.createdOn:i.isoDate).format("LL")))} 
                                itemRender={(searchResults.sort((a,b)=>moment(searchCategory!=="media-and-commentary"?a.createdOn:a.isoDate).isBefore(searchCategory!=="media-and-commentary"?b.createdOn:b.isoDate)).map((item) => <ListItem item={item} {...this.props}/>))} 
                            />
                        </InfiniteScroll>
                    </div>
                case "table":
                    return <ListTableView 
                        showHeader={false} 
                        columnData={columnData} 
                        data={searchResults.map((i,j)=>({...i, index:j, lastUpdatedISO: moment(i.lastUpdatedISO).format("ll")}))} 
                        handleRowSelect={this.props.handleRowSelect}
                        handleRequestSort={this.props.handleRequestSort}
                        handleRowClearSelected={this.props.handleRowClearSelected}
                        numberOfResults={searchMeta.nbHits}
                        />
                default:
                    return (
                        <div style={{height: "100%", overflow: "auto"}}>
                            <InfiniteScroll
                                pageStart={1}
                                loadMore={this.loadItems}
                                hasMore={!isLoading&&searchMeta.page<=searchMeta.nbPages}
                                initialLoad={false}
                                loader={<Loader/>}
                                useWindow={false}
                            >
                                {searchResults.map((item) => <ListItem key={item.id} item={item} inReadLaterList={this.props.readLater.map(i=>i.id).indexOf(item.id)>-1} {...this.props}/>)}
                            </InfiniteScroll>
                        </div>
                    )
                    
        }}
        return searchResults?view():[...Array(12)].map(i=><ListItemLoader key={i}/>)
    }
}

const mapStateToProps = (state,props) => {
    return {
        selectedView: state.filter.selectedView,
        search: state.search[storeKeyName(props.searchCategory)],
        filters: state.filter.filters,
        searchFilter: state.filter.searchFilter,
        readLater: state.readLater.items
    }
}

export default connect(mapStateToProps, {...searchActions, ...watchlistActions, ...searchViewActions})(withStyles(styles)(SearchView))

