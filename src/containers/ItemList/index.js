import React from 'react'
import { itemData } from './../../sampledata'
import { Tag, Row, Button, Avatar, Icon, Layout } from 'antd'
import { themeColors, primaryThemeShades } from './../../theme'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import { connect } from 'react-redux'
import green from '@material-ui/core/colors/green';
import Toolbar from '@material-ui/core/Toolbar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Chip from '@material-ui/core/Chip';

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
    const defaultView = (<Layout.Content>
        {itemData.slice(0, 15).map((item, i) => <ListItem item={item} {...props}/>)}
    </Layout.Content>)

    const tableView =  (<Layout.Content>
            <TableItemView data={itemData.slice(0, 15)}/>
        </Layout.Content>)

    const dateView = ""

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
        const { item, selectedView } = this.props

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

const tableStyles = theme => ({
    root: {
        flexGrow: 1,
        height: "92vh",
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
      }})

class TableItemView extends React.Component {
    render(){
        const {classes , data} = this.props
        return (
            <Paper elevation={0} style={{borderRadius: 0}}>
                {true&&<Toolbar style={{background: green[300]}} disableGutters={true}></Toolbar>}
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox"><Checkbox /></TableCell>
                        <TableCell padding="dense">Legislation Title</TableCell>
                        <TableCell padding="dense">Chamber</TableCell>
                        <TableCell padding="dense">Status</TableCell>
                        <TableCell padding="dense">Portfolio</TableCell>
                        <TableCell padding="dense">Posted Date</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((n,i) => {
                        return (
                        <TableRow key={i} hover>
                            <TableCell padding="checkbox">
                                <Checkbox />
                            </TableCell>
                            <TableCell padding="dense" component="th" scope="row">
                                <Link to="/item">{n.title}</Link>
                            </TableCell>
                            <TableCell padding="dense"><Chip label={<small>{n.chamber}</small>}/></TableCell>
                            <TableCell padding="dense">{n.status}</TableCell>
                            <TableCell padding="dense"><Chip label={<small>{n.portfolio}</small>}/></TableCell>
                            <TableCell padding="dense">{n.date}</TableCell>
                        </TableRow>
                        );
                    })}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        selectedView: state.filter.selectedView
    }
}

export default connect(mapStateToProps)(withStyles(styles)(ItemList))

