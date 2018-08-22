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
import DraftsIcon from '@material-ui/icons/Drafts';
import Zoom from '@material-ui/core/Zoom';
import Fade from '@material-ui/core/Fade';
import YouTube from 'react-youtube';


export default class HelpView extends React.Component {
    state = {
        transition: false
    }

    componentDidMount(){
        this.setState({transition: true})
    }
    render(){
        return (
        <AuthViewRouteContainer>
            <div>
                <div style={{background: "white", padding: "50px 0"}}>
                    <CardContent>
                        <Typography variant="display1" align="center" gutterBottom style={{color: "#f97794", marginBottom: 32}}>Polibase Help and Frequently Asked Questions</Typography>
                        <Typography variant="subheading" align="center" style={{color: "#f97794"}}>HELP AND SUPPORT QUESTIONS</Typography>
                    </CardContent>
                </div>
                <Grid container spacing={16} style={{padding: 16}}>
                    <Grid item xs={3}>
                        <Fade in={this.state.transition}>
                        <Card>
                        <List component="nav">
                            <ListItem button>
                                <ListItemIcon>
                                    <InboxIcon />
                                </ListItemIcon>
                                <ListItemText primary="Overview" />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Features" />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Pricing" />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <DraftsIcon />
                                </ListItemIcon>
                                <ListItemText primary="Security" />
                            </ListItem>
                        </List>
                        <Divider />
                        <List component="nav">
                            <ListItem button>
                                <ListItemText primary="Using the Platform" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="Setup" />
                            </ListItem>
                            <ListItem button>
                                <ListItemText primary="Administration" />
                            </ListItem>
                        </List>
                        </Card>
                        </Fade>
                    </Grid>
                    <Grid item xs={9}>
        
                        <Zoom in={this.state.transition}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="title">How does Gmail in G Suite differ from free Gmail?</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                <Typography>
                                G Suite’s Gmail features include: custom business email @yourcompany, unlimited group email addresses, 99.9% guaranteed uptime, twice the storage of free Gmail, zero ads, 24/7 phone and email support, G Suite Sync for Microsoft Outlook, and more.
                                </Typography>
                                </ExpansionPanelDetails>
                        
                            </ExpansionPanel>
                        </Zoom>
                        <Zoom in={this.state.transition} style={{ transitionDelay: this.state.transition ? 200 : 0 }}>
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography >Expansion Panel 2</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                                </Typography>
                                <Paper square elevation={12} style={{height: '390px',
                                    width: '640px'}}>
                                <YouTube
                                    videoId="2g811Eo7K8U"
                                    opts={{height: '390',
                                    width: '640',
                                    playerVars: { // https://developers.google.com/youtube/player_parameters
                                      autoplay: 0
                                    }}}
                                /></Paper>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        </Zoom>
                        <Zoom in={this.state.transition} style={{ transitionDelay: this.state.transition ? 400 : 0 }}>
                            <ExpansionPanel disabled>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography >Disabled Expansion Panel</Typography>
                                </ExpansionPanelSummary>
                            </ExpansionPanel>
                        </Zoom>
                    </Grid>
                </Grid>
            </div>
        </AuthViewRouteContainer>
          )
    }
}
