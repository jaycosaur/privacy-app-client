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
import CodeEditor from '@instructure/ui-code-editor/lib/components/CodeEditor'

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

const ChartCard = (props) => (
    <Card style={{flex: 1, border: "1px solid #ddd", margin: 16, height: 300}} elevation={0}>
        <CardContent style={{display: "flex", alignItems: "flex-end"}}>
            {
                [...Array(30)].map((i,j)=><a style={{background: "#ddd", flex: 1, margin: "0px 4px", height: 250*Math.random()}}/>)
            }
        </CardContent>
    </Card>
)

const TrackerCard = (props) => (
    <Card style={{minWidth: 500, border: "1px solid #ddd", margin: 16,}} elevation={0}>
        <AppBar position="static" elevation={0} color="default" style={{background: "none", borderBottom: "1px solid #eee" }}>
            <Toolbar variant="dense">
                {props.title}
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

const TEXT = (
`<!-- Hotjar Tracking Code for https://app.polibase.com.au/ -->
<script>
    (function(h,o,t,j,a,r){
        h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
        h._hjSettings={hjid:911593,hjsv:6};
        a=o.getElementsByTagName('head')[0];
        r=o.createElement('script');r.async=1;
        r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
        a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
</script>`
)

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
            <AuthViewRouteContainer textHeader="Integrate With Your Site">
                <div className={classes.root}>
                    <Card style={{background: "#fefefe", marginBottom: 16}}>
                        <CardContent style={{display: "flex", justifyContent: "space-between", alignItems: "center", padding: 16}}>
                            <Typography variant="headline" style={{padding: 0}} color="textSecondary">Your Site Id</Typography>
                            <Typography variant="title" align="center">ABCD-12345-ERFHI-ABCD-12345-ERFHI</Typography>
                        </CardContent>
                    </Card>
                    <Typography gutterBottom>{`Copy and paste the code snippet into the <head> tag on every page where you wish to track visitors and collect feedback.`}</Typography>
                    <Card style={{background: "#fefefe", marginBottom: 16}}>
                        <CardContent>
                            <CodeEditor
                                label='code editor'
                                defaultValue={TEXT}
                                language='javascript'
                                options={{ lineNumbers: false }}
                                readOnly={true}
                            />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <Typography variant="subheading">Verify Installation</Typography>
                            <Button variant="contained" color="secondary">Verify Now</Button>
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