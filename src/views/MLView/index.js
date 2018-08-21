import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';

import AuthViewRouteContainer from './../AuthViewRouteContainer'

import HeaderIcon from '@material-ui/icons/ViewCompact'

import AutoTagging from './AutoTagging'
import NewsSummary from './NewsSummary'
import SpamNews from './SpamNews'
import HighlightSample from './HighlightSample'

import { connect } from 'react-redux'
import * as actions from './../../store/actions/MLactions'

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const styles = (theme) => ({
    root: {
        padding: theme.spacing.unit*2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        overflow: "auto",
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
    }
})

const PilotCard = (props) => (
    <Card square={props.square} style={{display: "flex", marginBottom: 16}}>
        <div style={{background: "rgba(98,58,162,1)", display: "flex", alignItems: "center"}}>
            <div style={{width: 140, height: 140, background: "rgba(98,58,162,1)", padding: 16}}>
                <img src={require('./../../assets/OrangeRocket.png')} height={108} width={108}/>
            </div>
        </div>
        <div style={{flex: 1, background: "white"}}>
            <CardContent style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "center", alignItems: "center", alignContent: "center"}}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Typography variant="headline" gutterBottom color="primary">Polibase ML Showcase!</Typography>
                </div>
            </CardContent>
        </div>
    </Card>
)

class HomeView extends React.Component {
    state = {
        value: 0
    }

    handleChange = (event, value) => {
        this.setState({ value });
      };

    render(){
        const { classes } = this.props
        const { value } = this.state

        return (
            <AuthViewRouteContainer>
                <AppBar position="static">
                    <Tabs value={value} onChange={this.handleChange} centered style={{color: "white"}}>
                        <Tab label="Auto-Categorisation" />
                        <Tab label="News" />
                        <Tab label="Sample Digest"/>
                    </Tabs>
                </AppBar>
                {value === 0 && <Grid container spacing={isWidthUp('sm', this.props.width)?16:0} className={classes.root}>
                    <Grid item sm={6} md={6}>
                        <PilotCard square={!isWidthUp('sm', this.props.width)}/>
                        <AutoTagging state={this.props.ML.tag} handleSubmit={({ title }) => this.props.autotagFromTitle({ title })}/>
                    </Grid>
                </Grid>}
                {value === 1 && <Grid container spacing={isWidthUp('sm', this.props.width)?16:0} className={classes.root}>
                    <Grid item sm={6} md={6}>
                        <SpamNews state={this.props.ML.spam} handleSubmit={({ title }) => this.props.isNewsSpam({ title })} />
                        <NewsSummary state={this.props.ML.summarise} handleSubmit={({ body, numberOfSentences }) => this.props.summariseNews({ body, numberOfSentences })}/>
                    </Grid>
                </Grid>}
                {value === 2 && <Grid container spacing={isWidthUp('sm', this.props.width)?16:0} className={classes.root}>
                    <Grid item sm={6} md={6}>
                        <HighlightSample />
                    </Grid>
                </Grid>}
                
            </AuthViewRouteContainer>)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ML: state.ML
    }
}

export default connect(mapStateToProps, actions)(withWidth()(withStyles(styles)(HomeView)))