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

const ProjectCard = (props) => (
    <Card style={{minWidth: 500, border: "1px solid #ddd", margin: 16,}} elevation={0}>
        <AppBar position="static" elevation={0} color="default" style={{background: "none", borderBottom: "1px solid #eee" }}>
            <Toolbar variant="dense">
                My Project
            </Toolbar>
        </AppBar>
        <CardContent>
            Test
        </CardContent>
    </Card>
)

class HomeView extends React.Component {
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
            <AuthViewRouteContainer textHeader="Your Site Dashboard">
                <div className={classes.root}>
                    <ProjectCard />
                    <ProjectCard />
                    <ProjectCard />
                    <ProjectCard />
                    <ProjectCard />
                    <ProjectCard />
                    <ProjectCard />
                    <ProjectCard />
                    <ProjectCard />
                    <ProjectCard />
                </div>
            </AuthViewRouteContainer>)
        }
    }

const mapStateToProps = (state) => {
    return {
        organisation: state.organisation
    }
}

export default connect(mapStateToProps)(withWidth()(withStyles(styles)(HomeView)))