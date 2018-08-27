import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LatestNews from './../containers/AuthHome/LatestNews'
import LatestBlogPosts from './../containers/AuthHome/LatestBlogPosts';
import DueWeeklyTasks from './../containers/AuthHome/DueWeeklyTasks';
import ProjectOverview from './../containers/AuthHome/ProjectOverview';
import withWidth, { isWidthUp } from '@material-ui/core/withWidth';
import MainViewTopActionBarContainer from './../containers/MainViewTopActionBarContainer'
import Fade from '@material-ui/core/Fade';
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import AuthViewRouteContainer from './AuthViewRouteContainer'
import HeaderIcon from '@material-ui/icons/ViewCompact'

const styles = (theme) => ({
    root: {
        padding: theme.spacing.unit*2,
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

const PilotCard = (props) => (
    <Card square={props.square} style={{display: "flex", marginBottom: 16}}>
        <div style={{background: "rgba(98,58,162,1)", display: "flex", alignItems: "center"}}>
            <div style={{width: 140, height: 140, background: "rgba(98,58,162,1)", padding: 16}}>
                <img src={require('./../assets/OrangeRocket.png')} height={108} width={108}/>
            </div>
        </div>
        <div style={{flex: 1, background: "white"}}>
            <CardContent style={{display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between", alignItems: "space-between", alignContent: "space-between"}}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Typography variant="subheading" gutterBottom color="primary">Welcome to the Polibase Trial!</Typography>
                </div>
                <Typography variant="caption" color="textSecondary">During the trial, you'll have full functionality of the Polibase platform - with a few limitations! At the end of the thirty days, you can upgrade to the paid version of Polibase and keep all your obligations and documents secure.</Typography>
            </CardContent>
        </div>
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
        const TopBar = <MainViewTopActionBarContainer variant="dense" icon={<HeaderIcon style={{color: "white"}}/>}>
            <Typography noWrap style={{color: "white", flex: 1, marginLeft: 8}} variant="subheading">
                {isWidthUp('sm', this.props.width)?"Simple regulatory intelligence. Automating regulatory compliance for Australian organisations.":"Simple regulatory intelligence.  Automating regulatory compliance for Australian organisations."}
            </Typography>
        </MainViewTopActionBarContainer>
        const { organisationId } = organisation
        return (
            <AuthViewRouteContainer topbar={TopBar}>
                {!organisationId&&(
                        <div className={classes.blankRoot}>
                            <div style={{maxWidth: "700px", marginTop: -100, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                                <img src={require('./../assets/OrangeRocket.png')} height={120} width={120} style={{marginBottom: 32}}/>
                                <Typography variant="display1" gutterBottom  color="secondary" paragraph align="center">Welcome to Polibase!</Typography>
                                <Typography variant="subheading" gutterBottom paragraph>Time to set-up your compliance workspace.</Typography>
                                <Link to="create-new-team"><Button variant="extendedFab" color="secondary" style={{marginTop: 32, marginBottom: 32}}>Set-up your workspace</Button></Link>
                                <Typography variant="body1">Having trouble? Click the bottom right-hand corner for help.</Typography>
                            </div>
                        </div>
                    )}
                
                {organisationId&&<Grid container spacing={isWidthUp('sm', this.props.width)?16:0} className={classes.root}>
                    <Grid item sm={12} md={4}>
                        <Fade in={mounted}>
                            <PilotCard square={!isWidthUp('sm', this.props.width)}/>
                        </Fade>
                        <Fade in={mounted}>
                            <ProjectOverview square={!isWidthUp('sm', this.props.width)} />
                        </Fade>
                        <Fade in={mounted}>
                            <DueWeeklyTasks square={!isWidthUp('sm', this.props.width)}/>
                        </Fade>
                    </Grid>
                    <Grid item sm={12} md={8}>
                        <LatestNews square={!isWidthUp('sm', this.props.width)}/>
                    </Grid>
                    <Grid item xs={12}>
                        <div className={classes.disclaimer}>
                            <Typography variant="subheading" gutterBottom align="center" color="primary">DISCLAIMER</Typography>
                            <Typography variant="caption" color="textSecondary">
                                The Polibase (<a href="https://www.polibase.com.au" target="_blank">www.polibase.com.au</a>) is a resource for publicly available information. Nothing on this website or via any link should be used as a source of legal advice. This website does not create a legal relationship between the user and Examine Group Pty Ltd. Nor is this website intended to do so. 
                                Please do not act or solely rely on any public information in this website. The latest versions of legislation and regulation are available on the Australian government websites referenced on each website. Updates on regulation, legislation or compliance obligations are mere guidance and do not substantiate a legal relationship. Every update should be double-checked with the respective government authority’s website and authorised producer of information. 
                                All information is of a general nature only and must never been taken as specific or complete advice on legal or regulatory matters. Users of ‘Polibase’ should make their own independent inquiries before acting on any information and Polibase does not accept any liability on obfuscated legal or government documents. 
                            </Typography>
                        </div>
                    </Grid>
                </Grid>}
            </AuthViewRouteContainer>)
        }
    }

const mapStateToProps = (state) => {
    return {
        organisation: state.organisation
    }
}

export default connect(mapStateToProps)(withWidth()(withStyles(styles)(HomeView)))