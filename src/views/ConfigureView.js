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
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';

const styles = (theme) => ({
    root: {
        padding: theme.spacing.unit*2,
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

class RouteSelectorContainer extends React.Component{
    state = {
        routes: []
    }

    addRoute = () => {
        this.setState(state=>({
            routes: [...state.routes, {route: undefined, config: {isActive: false}}]
        }))
    }

    updateConfig = (key, value, index) => {
        this.setState(state=>({
            routes: [...state.routes.slice(0,index),
                {
                    ...state.routes[index],
                    config: {
                        ...state.routes[index],
                        [key]: value
                    },
                },
                ...state.routes.slice(index+1),
            ]
        }))
    }

    updateRoute = (index) => (e) => {
        const route = e.target.value
        this.setState(state=>({
            routes: [...state.routes.slice(0,index),
                {
                    ...state.routes[index],
                    route
                },
                ...state.routes.slice(index+1),
            ]
        }))
    }

    render(){
        const RouteContainer = ({empty, ...attrs}) => (
            <Card square elevation={0} style={{display: "flex", alignItems: "stretch",border: "1px solid #ddd", flex: 1}}>
                {!empty&&<div key="index" style={{width: 32,height: "100%", background: "#ccc", alignSelf: "stretch"}}>{attrs.index+1}</div>}
                <CardContent key="content" style={{display: "flex", alignItems: "center", flex: 1, padding: 8}}>
                    {empty&&<Button onClick={this.addRoute}>Add Route</Button>}
                    {!empty&&<div style={{display: "flex", alignItems: "center",flex: 1}}>
                        <div key="input" style={{flex: 1, padding: 4 }}>
                            <TextField
                                fullWidth
                                id="name"
                                placeholder="Route Path"
                                value={attrs.route}
                                onChange={this.updateRoute(attrs.index)}
                                margin="normal"
                            />
                        </div>
                        <Switch key="switch" color="primary" onChange={()=>this.updateConfig("isActive",!attrs.config.isActive,attrs.index)} checked={attrs.config.isActive}/><Typography variant="caption">{attrs.config.isActive?"ON":"OFF"}</Typography>
                    </div>}
                </CardContent>
            </Card>
        )
        return (
            [
                this.state.routes.map((route,index)=><RouteContainer key={index} index={index} {...route}/>),
                <RouteContainer key="empty" empty/>
            ]
        )
    }
}

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
        return (
            <AuthViewRouteContainer textHeader="Configure Your Site">
                <div className={classes.root}>
                    <Typography>{`Copy and paste the code snippet into the <head> tag on every page where you wish to track visitors and collect feedback.`}</Typography>
                    <Card>
                        <CardContent>
                            <RouteSelectorContainer />
                        </CardContent>
                    </Card>
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