import React from 'react'
import AuthViewRouteContainer from './AuthViewRouteContainer'

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import BuildIcon from '@material-ui/icons/Build';
import LockIcon from '@material-ui/icons/Lock';
import DnsIcon from '@material-ui/icons/Dns';

import Zoom from '@material-ui/core/Zoom';
import Fade from '@material-ui/core/Fade';
import YouTube from 'react-youtube';
import ListSubheader from '@material-ui/core/ListSubheader';

const FAQData = [
    {
        category: "PRODUCT",
        title: "What are the unique advantages of using Polibase?",
        body: [
            "Unmatched range of sources for continual policy, news, and compliance updates.",
            "24/7 monitoring with our AI technology.",
            "Added commentary and analysis beyond just raw and unstructured information.",
            "Single point of access from which to manage all actions items company wide."
        ]
    },
    {
        category: "PRODUCT",
        title: "Do you have a mobile app?",
        body: "At present you’re able to access the product through all mobile compatible web browsers."
    },
    {
        category: "PRODUCT",
        title: "Can more than one user in the organisation access the platform and collaborate?",
        body: "Yes, ideally all relevant stakeholders within a company would be signed up and using the platform to manage compliance and regulatory workflow between them."
    },
    {
        category: "PRODUCT",
        title: "What’s the fundamental difference between the compliance and policy manager?",
        body: "Put simply, the compliance manager assists you in handling your current compliance obligations whereas the policy manager simultaneously enables you to be proactive and predict what regulatory issues are going to affect you, allowing your business to plan ahead with real time insights."
    },
    {
        category: "SETUP",
        title: "How much onboarding support will we receive as a customer?",
        body: "We’ll contact you to arrange a one-on-one and personalised meeting to ensure you’re familiar and proficient able to use product by the end of the process. We’ll also issue guides to help you with more detailed troubleshoot and are available for feedback around the clock."
    },
    {
        category: "SETUP",
        title: "Do you offer customised solutions outside of the standard product offering?",
        body: "Yes! Polibase can consult to tailor and build out special products more suited to your specific needs in areas ranging from data indexing to internal policy classification requirements."
    },
    {
        category: "SECURITY",
        title: "What measures do you have in place to protect consumer data?",
        body: <span>Polibase ensures the integrity and safe management of our users information through the measures outlined in our <a href="https://polibase.com.au" target="_blank">security and privacy policy</a>. These include:</span>,
        extra: [
            "Outlining the personal information we collect",
            "The circumstances under which personal information may be disclosed",
            "The options available to you to unsubscribe & request user data",
            "Identifying how and where we store customer information "
        ]
    },
    {
        category: "SECURITY",
        title: "Where can I find further details about my rights as a user?",
        body: <span>Please refer to our <a href="https://polibase.com.au" target="_blank">terms of use</a> and <a href="https://polibase.com.au" target="_blank">terms and conditions</a> for more extensive conditions around payment terms, consumer guarantees and dispute resolution mechanisms.</span>
    }
]

const renderIfArray = (text) => {
    if (typeof text === "object" && text.map){
        return text.map(i=><li>{i}</li>)
    } else {
        return text
    }
}

const QuestionItem = (props) => (
    <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <CardContent>
                <Typography variant="title" style={{fontWeight: 300}}>{props.title}</Typography>
            </CardContent>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
            <CardContent style={{paddingTop: 0}}>
                <Typography variant="subheading">
                    {renderIfArray(props.body)}
                    {props.extra&&renderIfArray(props.extra)}
                </Typography>
            </CardContent>
        </ExpansionPanelDetails>

    </ExpansionPanel>
)

const keyToName = {
    PRODUCT: "Product & Features",
    SETUP: "Setup",
    SECURITY: "Security & User Information"
}


export default class HelpView extends React.Component {
    state = {
        transition: false,
        filter: null
    }

    componentDidMount(){
        this.setState({transition: true})
    }

    selectFilter = (key) => {
        this.setState(state=>({
            filter: state.filter===key?null:key
        }))
    }

    render(){
        return (
        <AuthViewRouteContainer>
            <div style={{background: "#623aa2", padding: "50px 0"}}>
                <CardContent>
                    <Typography variant="display1" align="center" gutterBottom style={{color: "white", marginBottom: 32, fontWeight: 300}}>Polibase Help and Frequently Asked Questions</Typography>
                    <Typography variant="subheading" align="center" style={{color: "white"}}>HELP AND SUPPORT QUESTIONS</Typography>
                </CardContent>
            </div>
            <Grid container spacing={16} style={{padding: 16, background: "white", minHeight: "80vh"}}>
                <Grid item xs={3}>
                    <Fade in={this.state.transition}>
                        <List component="nav" subheader={<ListSubheader component="div">Help Categories</ListSubheader>}>
                            <ListItem button onClick={()=>this.selectFilter("PRODUCT")}>
                                <ListItemIcon style={{color: this.state.filter==="PRODUCT"&&"#f97794"}}>
                                    <DnsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Product & Features" />
                            </ListItem>
                            <ListItem button onClick={()=>this.selectFilter("SETUP")}>
                                <ListItemIcon  style={{color: this.state.filter==="SETUP"&&"#f97794"}}>
                                    <BuildIcon />
                                </ListItemIcon>
                                <ListItemText primary="Setup" />
                            </ListItem>
                            <ListItem button onClick={()=>this.selectFilter("SECURITY")}>
                                <ListItemIcon  style={{color: this.state.filter==="SECURITY"&&"#f97794"}}>
                                    <LockIcon />
                                </ListItemIcon>
                                <ListItemText primary="Security & User Information" />
                            </ListItem>
                        </List>
                    </Fade>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="display1" marginBottom>{this.state.filter?keyToName[this.state.filter]:"Showing All"}</Typography>
                    <Divider style={{marginBottom: 16, marginTop: 16}}/>
                    {FAQData.filter(i=>this.state.filter?i.category===this.state.filter:true).map((i,j)=>(
                        <Zoom in={this.state.transition} style={{ transitionDelay: this.state.transition ? 100*j : 0 }}>
                            <QuestionItem key={i.title} {...i}/>
                        </Zoom>
                    ))}
                </Grid>
            </Grid>
        </AuthViewRouteContainer>
          )
    }
}
