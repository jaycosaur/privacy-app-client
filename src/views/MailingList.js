import React, { Component } from 'react'
import AuthViewRouteContainer from './AuthViewRouteContainer'
import { connect } from 'react-redux'
import moment from 'moment'
import * as mailingListActions from './../store/actions/mailingListActions'

import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import EmailIcon from '@material-ui/icons/Email';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import CopyIcon from '@material-ui/icons/ContentCopy';
import EditIcon from '@material-ui/icons/Edit'
import GroupIcon from '@material-ui/icons/Group'


import DeleteIcon from '@material-ui/icons/Delete';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TopBar from './../containers/MailingListTopBar'

const bg = "#ddd"
const Mock = (style) => <div style={{background: bg, ...style}}/>


class Digest extends Component {
    render() {
        const { isDeleting, data: { isDraft, createdOn } } = this.props
        return (
            <Card style={{marginBottom: 16, width: "100%", opacity: isDeleting&&0.6}}>
                <CardHeader
                    avatar={<Avatar>{!isDraft?<EmailIcon />:<DraftsIcon />}</Avatar>}
                    action={
                        <Tooltip title="Delete Digest">
                        <IconButton disabled={false&&!isDraft} onClick={()=>this.props.handleDelete()}>
                        <DeleteIcon />
                    </IconButton></Tooltip>}
                    title={<Mock width={400} height={20} marginBottom={4} borderRadius={5}/>}
                    subheader={ moment(createdOn).format("LLLL") }
                />
                <CardContent>
                    <Mock width={600} height={40} marginBottom={4} borderRadius={5}/>
                </CardContent>
                <CardActions disableActionSpacing>
                    <Tooltip title="Edit Digest">
                        <IconButton disabled={!isDraft}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Copy Digest">
                        <IconButton>
                            <CopyIcon />
                        </IconButton>
                    </Tooltip>
                    <div style={{flex: 1}}/>
                    <Tooltip title="Send Digest">
                        <IconButton disabled={!isDraft}>
                            <SendIcon />
                        </IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
        )
    }
}

class MailingGroup extends Component {
    state = { 
        expanded: false,
        emails: [],
        title: "",
        emailInput: "",
        isTouched: false,
    }

    static getDerivedStateFromProps(props){
        return ({
            title: props.data.title,
            emails: props.data.members,
        })
    }

    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    }


    handleEmailDelete = (id) =>{
        this.setState(state=>({
            emails: [...state.emails.slice(0,id), ...state.emails.slice(id+1)]
        }))
    }

    handleEmailFieldChange = (e) => {
        let value = e.target.value

        const isEmail = (email) => {
            return (email.indexOf('@')>-1)&&(email.split('@')[1].indexOf('.')>-1)
        }

        const delimitChars = [";", ",", " "]

        const splitString = (string) => {
            const split = (a, d) => a.map(i=>i.split(d)).reduce((arr,v)=>[...arr, ...v], [])
            return delimitChars.reduce((o,i)=>split(o, i),[string])
        }
            
        if (value.indexOf(";")>-1||value.indexOf(",")>-1||value.indexOf(" ")>-1){
            this.setState(state=>({
                emails: [...state.emails, ...splitString(value).filter(i=>i.length>0).filter(i=>isEmail(i))],
                emailInput: ""
            }))

        } else {
            this.setState({
                emailInput: e.target.value,
            })
        }
        
    }

    isTouched = () => {
        if (!this.state.isTouched&&(this.state.title!==this.props.title||this.state.emails!==this.props.members)){
            this.setState({
                isTouched: true
            })
        }
        if (this.state.isTouched&&this.state.title===this.props.title&&this.state.emails===this.props.members){
            this.setState({
                isTouched: false
            })
        }

    }

    handleTitleChange = (e) => {
        this.setState({
            title: e.target.value,
        })
    }

    submitUpdate = () => {
        this.props.handleUpdate({
            title: this.state.title,
            members: this.state.emails
        })
        this.setState({
            expanded: false
        })
    }

    componentDidUpdate(prevState){
        if (prevState.title!==this.state.title||prevState.emails!==this.state.emails){
            this.isTouched()
        }
    }

    render() {
        const { isDeleting, data: { createdOn, title, members } } = this.props
        return (
            <Card style={{marginBottom: 16, flexGrow: 1, opacity: isDeleting&&0.6}}>
                <CardHeader
                    avatar={<Avatar><GroupIcon/></Avatar>}
                    action={<Tooltip title="Delete Mailing Group">
                        <IconButton onClick={()=>this.props.handleDelete()}>
                        <DeleteIcon />
                    </IconButton></Tooltip>}
                    title={title||"Unamed Mailing Group"}
                    subheader={ moment(createdOn).format("LLLL") }
                />
                <CardContent>
                    <Typography variant="body2">{members&&members.length>0?`This mailing group contains ${members.length} emails.`:"There are no members in this mailing group yet."}</Typography>
                </CardContent>
                <CardActions disableActionSpacing>
                    <Tooltip title="Edit Mailing Group">
                        <IconButton onClick={this.handleExpandClick}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Copy Mailing Group">
                        <IconButton>
                            <CopyIcon />
                        </IconButton>
                    </Tooltip>
                    <div style={{flex: 1}}/>
                </CardActions>
                <Dialog
                    open={this.state.expanded}
                    onClose={this.handleExpandClick}
                    aria-labelledby="form-dialog-title"
                    >
                    <DialogTitle id="update-mailing-group-dialog">Update Mailing Group</DialogTitle>
                    <DialogContent>
                        <TextField
                                id="full-width"
                                label="Mailing Group Title"
                                placeholder="Enter a title..."
                                fullWidth
                                margin="normal"
                                onChange={this.handleTitleChange}
                                value={this.state.title}
                            />
                            <Card style={{marginTop: 16}}>
                                <CardContent>
                                    {this.state.emails.length>0?this.state.emails.map((i,j)=><Chip
                                        key={i}
                                        label={i}
                                        style={{margin: "4px 8px"}}
                                        onDelete={()=>this.handleEmailDelete(j)}
                                        color="primary"
                                    />): <Typography variant="subheading" align="center">No emails have been added.</Typography>}
                                    <TextField
                                        id="full-width"
                                        label="Emails"
                                        placeholder="Enter emails"
                                        helperText="Emails can be separated by a comma, semicolon, or space."
                                        fullWidth
                                        margin="normal"
                                        onChange={this.handleEmailFieldChange}
                                        value={this.state.emailInput}
                                    />
                                    <div>
                                        <div style={{flex: 1}}/>
                                    </div>
                                </CardContent>
                            </Card>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleExpandClick} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.submitUpdate()} variant="contained" color="secondary" disabled={!this.state.isTouched}>Update</Button>
                    </DialogActions>
                </Dialog>
            </Card>
        )
    }
}

class MailingList extends Component {
    state = {
        value: 0
    }

    handleChange = (value) => {
        this.setState({ value });
    };

    componentDidMount(){
        !this.props.digests.isLoaded&&!this.props.digests.isLoading&&this.props.getOrganisationDigests()
        !this.props.mailingGroups.isLoaded&&!this.props.mailingGroups.isLoading&&this.props.getOrganisationMailingGroups()
    }

    render() {
        const { mailingGroups, digests } = this.props
        const O2A = (o) => Object.keys(o).map(k=>o[k]) 

        const EmptyScreen = ({text}) => (
            <div style={{width: "100%", height: "60vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <div>
                    <img src={require("./../assets/RocketWide.png")} alt="" width="600px"/>
                    <Typography variant="headline" align="center" style={{color: "rgb(158, 158, 158)", marginTop: 32}}>{text}</Typography>
                </div>
            </div>
        )

        return (
        <AuthViewRouteContainer topbar={<TopBar/>}>
            <AppBar position="static">
                <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="secondary"
                    textColor="secondary"
                    centered
                    fullWidth
                    >
                    <Tab label="Drafts" />
                    <Tab label="Published" />
                    <Tab label="Mailing Groups" />
                </Tabs>
            </AppBar>
            <div style={{padding: "auto", display: "flex", justifyContent: "center", paddingTop: 32}}>
                <div style={{width: 800, display: "flex", flexDirection: "column"}}>
                    {this.state.value===0&&(
                        digests.digests&&O2A(digests.digests).length>0
                        ?
                            O2A(digests.digests)
                            .sort((a,b)=>moment(a.createdOn).isBefore(b.createdOn))
                            .map(i=><Digest key={i.id} data={i} isDraft handleDelete={()=>this.props.deleteOrganisationDigest(i.id)}/>)
                        : <EmptyScreen text="You have no draft digests." />
                    )
                    
                    
                    }
                    {this.state.value===1&&(
                        <EmptyScreen  text="You have no published digests." />
                    )}
                    {this.state.value===2&&(
                        mailingGroups.groups&&O2A(mailingGroups.groups).length>0
                        ?
                        O2A(mailingGroups.groups)
                            .sort((a,b)=>moment(a.createdOn).isBefore(b.createdOn))
                            .map(i=><MailingGroup 
                                        key={i.id} 
                                        data={i} 
                                        handleDelete={()=>this.props.deleteOrganisationMailingGroup(i.id)}
                                        handleUpdate={({members, title})=>this.props.updateOrganisationMailingGroup({members, title, id: i.id})}
                                        />)
                        : <EmptyScreen text="You have not created any mailing groups." />
                    )}
                </div>
            </div>
        </AuthViewRouteContainer>
        )
  }
}

const View = (props) => {
    return props.userHasOrganisation?<MailingList {...props}/>:"No Organisation!"
}

const mapStateToProps = (state) => {
    return {
        mailingGroups: state.mailingList.mailingGroups,
        digests: state.mailingList.digests,
        userHasOrganisation: state.organisation.organisationId
    }
}

export default connect(mapStateToProps, { ...mailingListActions })(View)