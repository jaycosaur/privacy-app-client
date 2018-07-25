import React from 'react'
import { itemData } from './../../sampledata'
import { Row, Button, Icon } from 'antd'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Chip from '@material-ui/core/Chip';
import ListTableView from './../ListContainerViews/TableView'
import ListTimelineView from './../ListContainerViews/TimelineView'


const columnData = [
    { id: 'title', numeric: false, padding: "none", label: 'Legislation Title', linkKey: 'link' },
    { id: 'chamber', numeric: false, padding: false, label: 'Chamber', shrinkText: true },
    { id: 'status', numeric: false, padding: false, label: 'Status', shrinkText: true, isChip: true },
    { id: 'portfolio', numeric: false, padding: false, label: 'Portfolio' },
    { id: 'date', numeric: false, padding: false, label: 'Posted Date' },
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


const ItemList = (props) => {
    const defaultView = (itemData.slice(0, 25).map((i,j)=>({...i,id:j})).map((item) => <ListItem item={item} {...props}/>))

    const tableView =  <ListTableView showHeader={false} columnData={columnData} data={itemData.slice(0, 15).map((i,j)=>({...i,id:j,link: "/item"}))} />

    const dateView = <ListTimelineView 
        grouping={(itemData.slice(0, 25).map(i=>i.date))} 
        itemRender={(itemData.slice(0, 25).map((i,j)=>({...i,id:j})).map((item) => <ListItem item={item} {...props}/>))} 
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

const RowWrap = props => (
    <div style={{ padding: "8px 0px" }}>
        {props.children}
    </div>
)

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
    render() {
        const { item } = this.props

        return (
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <RowWrap>
                        <h3 style={{fontWeight: 400 }}>{item.title}</h3>
                        {
                                [["Chamber", item.chamber], ["Status", item.status], ["Portfolio", item.portfolio]].map((item, i) => (
                                    <Chip key={i} label={`${item[0]}: ${item[1]}`} />
                                ))
                            }
                        <Row>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <small><Link to="/item"><strong>View Item</strong></Link> | <strong>Last Updated:</strong> 4 minutes ago | <strong>Posted Date:</strong> {item.date}</small>
                            </div>
                        </Row>
                    </RowWrap>
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
            </ExpansionPanel>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        selectedView: state.filter.selectedView
    }
}

export default connect(mapStateToProps)(withStyles(styles)(ItemList))

