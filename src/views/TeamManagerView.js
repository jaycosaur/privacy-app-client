import React from 'react'
import * as teamActions from '../store/actions/teamActions'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import YoutubeDialogView from './YoutubeDialogView'
import TeamManagerTopActionBar from '../containers/TeamManagerTopActionBar'
import qs from 'qs'
import AuthViewRouteContainer from './AuthViewRouteContainer'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import TeamIcon from '@material-ui/icons/Group';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Clear';

import DomainIcon from '@material-ui/icons/Domain';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ListIcon from '@material-ui/icons/List';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DescriptionIcon from '@material-ui/icons/Description';

import StorageIcon from '@material-ui/icons/Storage';
import NotificationOnIcon from '@material-ui/icons/NotificationsActive';
import NotificationOffIcon from '@material-ui/icons/NotificationsOff';
import AdminIcon from '@material-ui/icons/VerifiedUser';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit'
import LeaveIcon from '@material-ui/icons/Rowing'

import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ListSubheader from '@material-ui/core/ListSubheader';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { Field, reduxForm } from 'redux-form';
import TextField from '@material-ui/core/TextField'
import Modal from '@material-ui/core/Modal';

const styles = theme => ({
    card: {
        minWidth: 275,
        background: theme.palette.secondary.light//lighten(theme.palette.secondary.light, 1),
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
    },
    pos: {
        marginBottom: theme.spacing.unit*4,
    },
    root: {
        padding: theme.spacing.unit*2
    },
    blankRoot: {
        height: "80vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    innerCardLeft: {
        flex: 1,
        padding: theme.spacing.unit,
        marginBottom: theme.spacing.unit*4,
    },
    innerCardRight: {
        flex: 1,
    },
    flex: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column"
    },
    formControl: {
        width: "100%",
        padding: theme.spacing.unit*4,
        paddingBottom: 0
    },
    formControlWithUsers: {

    },
    formButtonContainer: {
        padding: theme.spacing.unit*4,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },
    listItem: {
        transition: theme.transitions.create('opacity'),
    }
  })

const validate = values => {
    const errors = {}
    const requiredFields = [ 'name' ]
    requiredFields.forEach(field => {
      if (!values[ field ]) {
        errors[ field ] = 'Required'
      }
    })
    return errors
  }
  
  const renderTextField = ({ input: { value, onChange }, label, meta: { touched, error }, ...custom }) => (
    <TextField 
      label={error||label}
      error={touched && error}
      value={value}
      fullWidth
      onChange={onChange}
    />
  )

  const InformationDialogForm = (props) => {
    const { handleSubmit, pristine, isLoading } = props
    return (
        <Dialog
            open={props.open}
            onClose={props.onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Update Team Information</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} style={{width: "100%"}}>
                    <Field name="name" component={renderTextField} label="Your team name"/>
                    <Field name="website" component={renderTextField} label="Your team website"/>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={pristine||isLoading} color="primary" autoFocus>
                    Update
                </Button>
            </DialogActions>
        </Dialog>
    ) 
}


const InformationDialogFormWrapped = reduxForm({form: 'UpdateOrganisationInformation',validate})(InformationDialogForm)

class ChangeTeamInformationDialog extends React.Component {
    state = {
        open: false,
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }

    handleSubmit = (values) => {
        this.props.handleSubmit(values)
        this.handleClose()
    }

    render(){
        const { state, ...otherProps } = this.props
        return (
            [<IconButton key="button" onClick={this.handleClickOpen} {...otherProps}>
                {this.props.render()}
            </IconButton>,
            <InformationDialogFormWrapped key="dialog" 
                initialValues={state}
                onSubmit={(e)=>this.handleSubmit(e)} 
                onClose={()=>this.handleClose()}
                open={this.state.open}
            />]
        )
    }
}

class AddUserDialog extends React.Component {
    state = {
        formValue: null,
        open: false,
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }
    handleClose = () => {
        this.setState({
            open: false
        })
    }

    handleChange = event => {
        this.setState({ formValue: event.target.value });
    }

    handleEnter = e => {
        if (e.key === "Enter"){
            this.props.handleAddUser(this.state.formValue)

            this.setState(() => ({
                formValue: "",
                showForm: false,
                open: false
            }))
        }
    }

    handleAccept = () => {
        this.props.handleAddUser(this.state.formValue)
        this.setState(() => ({
            formValue: "",
            open: false
        }))
    }

    render(){
        const { onClick, ...otherProps} = this.props

        return (
            [<IconButton key="button" color="secondary" onClick={this.handleClickOpen} {...otherProps}>
                {this.props.render()}
            </IconButton>,
            <Dialog
                key="dialog"
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.props.text}
                    </DialogContentText>
                    <FormControl aria-describedby="name-helper-text" style={{width: "100%"}}>
                        <Input 
                            id="name-helper" 
                            type="email"
                            fullWidth
                            value={this.state.formValue} 
                            onKeyPress={this.handleEnter} 
                            onBlur={this.handleBlur} 
                            onChange={this.handleChange} 
                            placeholder="Email"
                            startAdornment={
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            }
                        />
                        <FormHelperText id="name-helper-text">Enter a users email to send a personal invite</FormHelperText>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleAccept} color="primary" autoFocus>
                        Add User
                    </Button>
                </DialogActions>
            </Dialog>]
        )
    }
}

class IconButtonWithConfirm extends React.Component {
    state = {
        open: false,
    };
    
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    handleAccept = () => {
        this.props.onClick()
        this.handleClose()
    }
    
    render() {
        const {onClick, ...otherProps} = this.props
        return (
            [<IconButton key="button" onClick={this.handleClickOpen} {...otherProps}>
                {this.props.render()}
            </IconButton>,
            <Dialog
                key= "dialog"
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{this.props.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {this.props.text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleAccept} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>]
        );
    }
}

class PlanSelectorDialog extends React.Component {
    state = {
        open: false,
    };
    
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    handleAccept = () => {
        this.props.onClick()
        this.handleClose()
    }
    
    render() {
        return (
            [<Button disabled={this.props.disabled} onClick={this.handleClickOpen} variant="contained" color="primary" style={{color: "white"}}>
                {this.props.children}
            </Button>,
            <Dialog
                key= "dialog"
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <AppBar position="static" color="secondary">
                    <Toolbar>
                        <Typography variant="title" color="inherit">
                            Change your plan
                        </Typography>
                        <IconButton onClick={this.handleClose} color="primary">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <div>
                    <Grid container spacing={8} justify="center">
                        <Card style={{width: 160, height: 500}}>
                        </Card>
                        <Card style={{width: 160, height: 500}}>
                        </Card>
                    </Grid>
                </div>
                <DialogActions>
                    <Button onClick={this.handleAccept} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>])
    }
}

class TeamManagerView extends React.Component {
    state = {

    }
    static getDerivedStateFromProps(props) {
        if (props.isSignedIn === true && props.user.accountInformation.loadSucceeded && !props.organisation.isLoading && !props.organisation.hasFetched && props.user.accountInformation.info.organisationId){
            props.getOrganisationInformation({organisationId: props.user.accountInformation.info.organisationId})
        }
        return null
    }

    inviteNewUser = (email) => this.props.inviteUserToOrganisation({ email })

    render(){
        const { classes, organisation, location } = this.props
        const { name, organisationId, users, website, isCurrentUserAdmin, pendingUsers, isLeavingOrganisation } = organisation
        const { actionCount, currentData, plan, planLimits, projectCount, taskCount, userCount } = organisation

        const { search } = location
        const searchParams = qs.parse(search, { ignoreQueryPrefix: true })

        const AccountInfoListItem = (props) => (
            <ListItem dense className={classes.listItem}>
                <Avatar>
                    {props.icon||<EditIcon />}
                </Avatar>
                <ListItemText primary={props.title} secondary={`${props.value} / ${props.limit} ${props.unit}`} />
                <Tooltip placement="left" title={`${Math.round(100*props.value/props.limit)} % used`}>
                    <CircularProgress className={classes.progress} variant="static" size={40} thickness={4} color="secondary" value={100*props.value/props.limit} />
                </Tooltip>
                <ListItemSecondaryAction>
                </ListItemSecondaryAction>
            </ListItem>
        )
        return (
            <AuthViewRouteContainer topbar={<TeamManagerTopActionBar/>}>
                <div className={classes.root}>
                    {!organisationId&&(
                        <div className={classes.blankRoot}>
                            <div style={{maxWidth: "800px", marginTop: -100, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                                <Typography variant="display2" gutterBottom  color="secondary" paragraph align="center">Oh no! You don't seem to have a team yet.</Typography>
                                <Typography variant="title" gutterBottom paragraph>If you would like to create your own team please click the button below. If you are waiting on an invite to join a team it will be sent via email, so sit tight.</Typography>
                                <Link to="create-new-team"><Button variant="extendedFab" color="secondary" style={{marginTop: 32, marginBottom: 32}}>Create a new team</Button></Link>
                                <Typography variant="body1">Having trouble or haven't recieved the invite link? Please contact team@polibase.com.au to let us know.</Typography>
                            </div>
                        </div>
                    )}
                    {
                        organisationId&&isLeavingOrganisation&&<div className={classes.blankRoot}>
                            <div style={{maxWidth: "800px", marginTop: -100, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                                <CircularProgress color="secondary" size={100}/>
                            </div>
                        </div>
                    }
                    {organisationId&&!isLeavingOrganisation&&<Grid container spacing={16}>
                        <Grid item xs={12} md={4}>
                            <Card style={{marginBottom: 16}}>
                                <CardHeader
                                    action={
                                        <ChangeTeamInformationDialog
                                            handleSubmit={({name, website})=>this.props.updateOrganisationInformation({name, website})}
                                            render={()=>(<EditIcon />)}
                                            disabled={!isCurrentUserAdmin}
                                            state={{
                                                name: organisation.name,
                                                website: organisation.website
                                            }}
                                        />
                                    }
                                    title={`Team ${name}`}
                                    subheader={website&&<span><a href={website} target="_blank">{website}</a></span>}
                                />
                                <List dense subheader={<ListSubheader>Account Information</ListSubheader>}>
                                    {[   
                                        { title: "Members", icon: <TeamIcon />, value: userCount, limit:  planLimits.users, unit: "users"},
                                        { title: "Projects", icon: <ListIcon />, value: projectCount, limit: planLimits.projects, unit: "projects" },
                                        { title: "Obligations", icon: <DescriptionIcon />,value: actionCount, limit: planLimits.actions, unit: "obligations" },
                                        { title: "Tasks", icon: <DoneAllIcon />, value: taskCount, limit: planLimits.tasks, unit: "tasks" },
                                        { title: "Data Storage", icon: <StorageIcon />, value: Math.round(currentData/1000000000), limit: Math.round(planLimits.data/1000000000), unit: "GB" },
                                    ].map((i,j)=><AccountInfoListItem {...i} key={j}/>)
                                    }
                                </List>
                                <div style={{padding: 8}}>
                                    <Card elevation={10}>
                                        <List dense>
                                            <ListItem>
                                                <Avatar style={{background: "#f97794"}}>
                                                    {<DomainIcon />}
                                                </Avatar>
                                                <ListItemText primary={plan} secondary={`Current Plan`} />
                                                <PlanSelectorDialog disabled>
                                                    UPGRADE
                                                </PlanSelectorDialog>
                                            </ListItem>
                                        </List>
                                    </Card>
                                </div>
                            </Card>
                            <Card>
                                <List>
                                    <ListItem>
                                        <ListItemText primary={"Leave team?"} secondary={`This action can't be undone.`} />
                                        <IconButtonWithConfirm 
                                            title={`Leave ${name} team?`}
                                            text={`Are you sure you want to do this? This action cannot be undone and you will need to be reinvited to the team.`}
                                            onClick={()=>this.props.leaveOrganisation()}
                                            render={()=>(<LeaveIcon />)}
                                        />
                                    </ListItem>
                                </List>
                            </Card>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <Card>
                                <Toolbar>
                                    <TeamIcon style={{marginRight: 8}}/> 
                                    <Typography variant="subheading" id="tableTitle" style={{flex: 1}}>
                                        Team Members
                                    </Typography>
                                    <AddUserDialog
                                        handleAddUser={this.inviteNewUser}
                                        title={`Add a new member to the team?`}
                                        text={`Put in the email below and it will send them an invite to the platform with a signup link.`}
                                        render={()=><PersonAddIcon />}
                                        disabled={!isCurrentUserAdmin}
                                    />
                                </Toolbar>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell padding="checkbox" numeric />
                                            <TableCell>Display Name</TableCell>
                                            <TableCell>Email</TableCell>
                                            <TableCell>User Status</TableCell>
                                            <TableCell padding="checkbox" numeric />
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                    { users&&users.map(n => {
                                        return (
                                        <TableRow key={n.userId} hover>
                                            <TableCell padding="checkbox" numeric >
                                                <IconButtonWithConfirm 
                                                    title={`Promote ${n.displayName||n.email} to team manager?`}
                                                    text={`Are you sure you want to do this?`}
                                                    disabled={!isCurrentUserAdmin || n.isAdmin || n.isPromoting} 
                                                    onClick={()=>this.props.promoteUserToAdmin({uid: n.userId})}
                                                    render={()=>(<AdminIcon style={{color: n.isAdmin?"#333":n.isPromoting?"#623aa2":"#ddd"}}/>)}
                                                />
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {n.displayName&&n.displayName}
                                            </TableCell>
                                            <TableCell>{n.email}</TableCell>
                                            <TableCell>{n.isDeleting?"Deleting User...":(n.hasSignedUp?"Registered":"Invite Sent")}</TableCell>
                                            <TableCell padding="checkbox" numeric >
                                                {false&&<IconButton className={classes.notificationButton} aria-label="Add an alarm">
                                                    {n.notificationsEnabled?<NotificationOnIcon />:<NotificationOffIcon />}
                                                </IconButton>}
                                                <IconButtonWithConfirm 
                                                    title={`Delete ${n.displayName||n.email} from this organisation?`}
                                                    text={`Are you sure you want to do this?`}
                                                    disabled={!isCurrentUserAdmin || n.isAdmin || n.isDeleting } 
                                                    aria-label="Delete User" 
                                                    onClick={()=>this.props.removeUserFromOrganisation({uid: n.userId})}
                                                    render={()=>(<DeleteIcon />)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        );
                                    })}
                                    { pendingUsers&&pendingUsers.map(n => {
                                        return (
                                        <TableRow key={n.id} hover  style={{opacity: 0.7}}>
                                            <TableCell padding="checkbox" numeric >
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {n.displayName&&n.displayName}
                                            </TableCell>
                                            <TableCell>{n.email}</TableCell>
                                            <TableCell>{
                                                n.isDeleting?"Deleting User...":(n.isSending?"Sending invite...":<span style={{color: "#f97794"}}>Invite Sent</span>)}</TableCell>
                                            <TableCell padding="checkbox" numeric >
                                                {false&&<IconButton className={classes.notificationButton} aria-label="Add an alarm" disabled>
                                                    {n.notificationsEnabled?<NotificationOnIcon />:<NotificationOffIcon />}
                                                </IconButton>}
                                                <IconButtonWithConfirm 
                                                    title={`Cancel invite for ${n.email}?`}
                                                    text={`Are you sure you want to do this?`}
                                                    disabled={!isCurrentUserAdmin || n.isAdmin || n.isDeleting } 
                                                    aria-label="Delete User" 
                                                    onClick={()=>this.props.revokeInviteUserToOrganisation({id: n.id})}
                                                    render={()=>(<DeleteIcon />)}
                                                />
                                            </TableCell>
                                        </TableRow>
                                        );
                                    })}
                                    </TableBody>
                                </Table>
                            </Card>
                            <div style={{marginTop: 32, flex: 1, display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                                <Typography variant="body2" gutterBottom>Just getting started?</Typography>
                                <YoutubeDialogView videoId="kYw93Qvhujo"><Button variant="extendedFab" color="secondary" style={{color: "white", background: "#2ECC71"}}>Watch a tutorial</Button></YoutubeDialogView>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography style={{width: "100%"}}variant="caption" align="center">Organisation Id - {organisationId}</Typography>
                        </Grid>
                    </Grid>}
                </div>
            </AuthViewRouteContainer>
          )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        isSignedIn: state.user.isSignedIn,
        organisation: state.organisation,
        isLeavingOrganisation: state.organisation.isLeavingOrganisation
    }
}

const TeamManagerViewWithStyles = withStyles(styles)(TeamManagerView)

export default connect(mapStateToProps, {...teamActions})(TeamManagerViewWithStyles)