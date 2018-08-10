import React from 'react'
import { getWatchlistItem, clearFilterData } from '../store/actions/watchlistActions'
import * as teamActions from '../store/actions/teamActions'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';

import TeamManagerTopActionBar from '../containers/TeamManagerTopActionBar'

import AuthViewRouteContainer from './AuthViewRouteContainer'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';


import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import TeamIcon from '@material-ui/icons/Group';
import Tooltip from '@material-ui/core/Tooltip';

import DomainIcon from '@material-ui/icons/Domain';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ListIcon from '@material-ui/icons/List';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import DescriptionIcon from '@material-ui/icons/Description';

import StorageIcon from '@material-ui/icons/Storage';
import PersonIcon from '@material-ui/icons/PersonOutline';
import NotificationOnIcon from '@material-ui/icons/NotificationsActive';
import NotificationOffIcon from '@material-ui/icons/NotificationsOff';
import AdminIcon from '@material-ui/icons/VerifiedUser';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandIcon from '@material-ui/icons/MoreVert'
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
import TableFooter from '@material-ui/core/TableFooter';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
        padding: theme.spacing.unit*4
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
        alignItems: "center"
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
  });

class AddUserFields extends React.Component {
    state = {
        users: [],
        formValue: null,
        showForm: true,
    }

    showForm = () => {
        this.setState({
            showForm: true
        })
    }

    handleChange = event => {
        this.setState({ formValue: event.target.value });
    }

    handleBlur = () => {

    }

    handleEnter = e => {
        if (e.key === "Enter"){
            this.props.handleAddUser(this.state.formValue)

            this.setState(state=>({
                users: [...state.users, state.formValue],
                formValue: "",
                showForm: false
            }))
        }
    }

    handleDelete = id => {
        this.setState(state=>({
            users: [
                ...state.users.slice(0, id),
                ...state.users.slice(id + 1)
            ]
        }))
    }

    render(){
        const { classes } = this.props
        const hasAddedUsers = this.state.users.length>0
        const showForm = !hasAddedUsers||this.state.showForm
        return (
            <Card elevation={10}>
                <List subheader={<ListSubheader>Invited Users</ListSubheader>}>
                {this.state.users.map((email,id) => (
                    <ListItem key={id} dense button className={classes.listItem}>
                        <Avatar>
                            <PersonIcon />
                        </Avatar>
                        <ListItemText primary={`${email}`} />
                        <ListItemSecondaryAction>
                            <IconButton className={classes.button} aria-label="Delete" onClick={()=>this.handleDelete(id)}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
                </List>
                {showForm&&<FormControl className={classes.formControl} aria-describedby="name-helper-text">
                    <Input 
                        id="name-helper" 
                        type="email"
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
                </FormControl>}
                <div className={classes.formButtonContainer}>
                    <Button disabled={showForm} onClick={this.showForm} variant="fab" color="secondary" aria-label="add" className={classes.button}>
                        <PersonAddIcon />
                    </Button>
                    <Button disabled={!hasAddedUsers} variant="contained" size="large" color="primary" style={{color: "white", float: "right"}}><SendIcon /> INVITE NOW</Button>
                </div>
            </Card>
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
            [<IconButton onClick={this.handleClickOpen} {...otherProps}>
                {this.props.render()}
            </IconButton>,
            <Dialog
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

class SearchView extends React.Component {
    static getDerivedStateFromProps(props) {
        if (props.isSignedIn === true && props.user.accountInformation.loadSucceeded && !props.organisation.isLoading && !props.organisation.hasFetched && props.user.accountInformation.info.organisationId){
        props.getOrganisationInformation({organisationId: props.user.accountInformation.info.organisationId})
        }
    }

    inviteNewUser = (email) => this.props.inviteUserToOrganisation({ email })

    render(){
        const { match: { }, classes, organisation } = this.props
        const { isLoading, hasFetched, name, organisationId, users, website, isCurrentUserAdmin } = organisation
        const { actionCount, currentData, plan, planLimits, projectCount, taskCount, userCount } = organisation
        console.log(organisation)

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
                            <div style={{maxWidth: "500px", marginTop: -100, display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                                <TeamIcon style={{fontSize: 160, color: "#ddd"}}/>
                                <Typography variant="display1" gutterBottom  paragraph align="center">Oh no! You haven't been assigned a team!</Typography>
                                <Typography variant="title" gutterBottom paragraph>We are in the closed BETA at the moment, so you can't create your own team or invite users yourself.</Typography>
                                <Typography variant="subheading">Please contact team@polibase.com.au to let us know you are having trouble.</Typography>
                            </div>
                        </div>
                    )}
                    {organisationId&&<Grid container spacing={24}>
                        <Grid item xs={4}>
                            <Card style={{marginBottom: 16}}>
                                <CardHeader
                                    action={
                                        <IconButton disabled={!isCurrentUserAdmin}>
                                            <EditIcon />
                                        </IconButton>
                                    }
                                    title={`Team ${name}`}
                                    subheader={<span>Website: <a href={website} target="_blank">{website}</a></span>}
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
                                        <List>
                                            <ListItem>
                                                <Avatar style={{background: "#f97794"}}>
                                                    {<DomainIcon />}
                                                </Avatar>
                                                <ListItemText primary={plan} secondary={`Current Plan`} />
                                                <Button variant="contained" color="primary" style={{color: "white"}}>
                                                    UPGRADE
                                                </Button>
                                            </ListItem>
                                        </List>
                                    </Card>
                                </div>
                            </Card>
                            <Card>
                                LEAVE TEAM 
                                <div style={{flex: 1}}/>
                                <IconButtonWithConfirm 
                                        title={`Leave ${name} team?`}
                                        text={`Are you sure you want to do this? This action cannot be undone and you will need to be reinvited to the team.`}
                                        onClick={()=>console.log('leaving....')}
                                        render={()=>(<LeaveIcon />)}
                                    />
                            </Card>
                            <Card className={classes.card} elevation={10} style={{marginBottom: 16}}>
                                <CardContent className={classes.flexColumn}>
                                    {!isCurrentUserAdmin&&"Only managers can invite others to join the team."}
                                    {isCurrentUserAdmin&&[<div className={classes.innerCardLeft}>
                                        <Typography variant="headline" component="h2" className={classes.pos}>
                                            Invite members to {name}
                                        </Typography>
                                        <Typography variant="subheading" className={classes.pos}>
                                            Users will be sent an invite link to there email.
                                        </Typography>
                                    </div>,
                                    <div className={classes.innerCardRight}>
                                        <AddUserFields classes={classes} handleAddUser={(email)=>this.inviteNewUser(email)} invitedUsers={null}/>
                                    </div>]}
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={8}>
                            <Card>
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
                                                <IconButton className={classes.notificationButton} aria-label="Add an alarm">
                                                    {n.notificationsEnabled?<NotificationOnIcon />:<NotificationOffIcon />}
                                                </IconButton>
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
                                    </TableBody>
                                </Table>
                            </Card>
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
        organisation: state.organisation
    }
}

const SearchViewWithStyles = withStyles(styles)(SearchView)

export default connect(mapStateToProps, {getWatchlistItem, clearFilterData, ...teamActions})(SearchViewWithStyles)