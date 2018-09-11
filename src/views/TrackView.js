import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import MainViewTopActionBarContainer from './../containers/MainViewTopActionBarContainer'
import Fade from '@material-ui/core/Fade';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import AuthViewRouteContainer from './AuthViewRouteContainer'

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import HeaderIcon from '@material-ui/icons/ViewCompact'

const styles = (theme) => ({
    root: {
        padding: theme.spacing.unit*2,
        paddingLeft: theme.spacing.unit*4,
        paddingRight: theme.spacing.unit*4,
        width: "100%",
        [theme.breakpoints.down('sm')]:{
            padding: 0,
            width: "100%"
        }
    },
    coverBig: {
        width: 120,
        height: 120,
    },
    cardFlex: {
        display: 'flex',
        marginBottom: theme.spacing.unit*4,
    },
    disclaimer: {
        padding: 32,
        [theme.breakpoints.down('sm')]:{
            padding: "1em"
        }
    },
    blankRoot: {
        height: "80vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
})

class Hover extends React.Component {
    state = {
        hovered: false
    }
    onOver = () => {
        this.setState({
            hovered: true
        })
    }
    onLeave = () => {
        this.setState({
            hovered: false
        })
    }
    render(){
        return (
            <span onMouseEnter={this.onOver} onMouseOut={this.onLeave} style={{width: "100%", height: "100%",display: "flex", alignItems: "flex-end"}}>{this.props.render(this.state.hovered)}</span>
        )
    }
}
const EventArray = [...Array(30)].map(i=>Math.random())

const ChartCard = (props) => (
    <Card style={{flex: 1, border: "1px solid #ddd", margin: "16px 0px", padding: 8, height: 300}} elevation={0}>
        <div style={{width: "100%", display: "flex"}}>
            <div style={{flex: 1}}/>
            <div>
                <Button variant="outlined" size="small" style={{borderRadius: "4px 0px 0px 4px"}}>1 hour</Button>
                <Button variant="outlined" size="small" style={{borderRadius: 0}}>1 day</Button>
                <Button variant="outlined" size="small" style={{borderRadius: 0}}>1 week</Button>
                <Button variant="outlined" size="small" style={{borderRadius: "0px 4px 4px 0px"}}>1 month</Button>
            </div>
        </div>
        <CardContent style={{display: "flex", alignItems: "stretch"}}>
            <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                <Typography variant="caption" color="textSecondary">50</Typography>
                <Typography variant="caption" color="textSecondary">0</Typography>
            </div>
            <div style={{display: "flex", alignItems: "flex-end", flex: 1, margin: 4}}>
                {
                    EventArray.map((i,j)=>(<a style={{flex: 1, margin: "0px 4px", height: 200,display: "flex", alignItems: "flex-end"}}>
                        <Hover render={(hovered)=><div style={{background: hovered?"#f50057":"#ddd", flex: 1, height: 200*i}}/>}/>
                    </a>))
                }
            </div>
        </CardContent>
    </Card>
)

const TrackerCard = (props) => (
    <Card style={{minWidth: 500, border: "1px solid #ddd", margin: "16px 0px",}} elevation={0}>
        <AppBar position="static" elevation={0} color="default" style={{background: "none", borderBottom: "1px solid #eee" }}>
            <Toolbar variant="dense">
                <Typography variant="button">{props.title}</Typography>
            </Toolbar>
        </AppBar>
        <CardContent>
            Test
        </CardContent>
    </Card>
)

const TRACKER_EVENTS = [
    "Requesting correction of inaccurate data",
    "Right to be forgotten (erasure)",
    "Right to request processing restriction of certain information",
    "Obligation to be notified with data is rectified",
    "Right to request data in a particular format (portability)",
    "Right to object to automated processing of data",
    "Customer Notification of Breach",
    "Right to request data initially",
    "Fully informed consent for us of data",
    "Anonymisation Request",
    "Opt-In Notification of How Often Their Data is Used",
    "Third-Party App Notification Interactions",
    "Basic Information on GDPR for Consumer (Guide)",
]

class TrackView extends React.Component {
    state = {
        mounted: false
    }

    componentDidMount(){
        this.setState({
            mounted: true
        })
    }

    render(){
        const { classes, organisation } = this.props
        const { mounted } = this.state
        const { organisationId } = organisation
        const ButtonContainer = (props) => {
            const length = props.length
            return (
                <div>
                    <Button>{props.children[0]}</Button>
                    {props.children.slice(1,length-1).map(i=><Button>{props.children[0]}</Button>)}
                </div>
            )
        }
        return (
            <AuthViewRouteContainer textHeader="Track and Monitor">
                <div className={classes.root}>
                    <ChartCard />
                    {TRACKER_EVENTS.map(i=><TrackerCard title={i}/>)}
                </div>
            </AuthViewRouteContainer>)
        }
    }

const mapStateToProps = (state) => {
    return {
        organisation: state.organisation
    }
}

export default connect(mapStateToProps)(withWidth()(withStyles(styles)(TrackView)))