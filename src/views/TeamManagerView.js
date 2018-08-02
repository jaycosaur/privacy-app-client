import React from 'react'
import { getWatchlistItem, clearFilterData } from '../store/actions/watchlistActions'
import * as teamActions from '../store/actions/teamActions'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles';

import TeamManagerTopActionBar from '../containers/TeamManagerTopActionBar'

import AuthViewRouteContainer from './AuthViewRouteContainer'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import EmailIcon from '@material-ui/icons/Email';
import TeamIcon from '@material-ui/icons/Group';

import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/PersonOutline';
import NotificationOnIcon from '@material-ui/icons/NotificationsActive';
import NotificationOffIcon from '@material-ui/icons/NotificationsOff';
import AdminIcon from '@material-ui/icons/VerifiedUser';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandIcon from '@material-ui/icons/MoreVert'
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

class SearchView extends React.Component{

    static getDerivedStateFromProps(props) {
          if (props.isSignedIn === true && props.user.accountInformation.loadSucceeded && !props.organisation.isLoading && !props.organisation.hasFetched && props.user.accountInformation.info.organisationId){
            props.getOrganisationInformation({organisationId: props.user.accountInformation.info.organisationId})
          }
      }

    render(){
        const { match: { }, classes, organisation } = this.props
        const { isLoading, hasFetched, name, organisationId, users, website } = organisation

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
                        <Grid item xs={8}>
                            <Card style={{marginBottom: 16}}>
                                <CardContent>
                                    <h3>Organisation Name: {name}</h3>
                                    <h3>Organisation Id: {organisationId}</h3>
                                    <h3>Organisation Website: {website}</h3>
                                    <h3>Number of Members: {users?users.length:0}</h3>
                                </CardContent>
                            </Card>
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
                                        <TableRow key={n.id} hover>
                                            <TableCell padding="checkbox" numeric >
                                                {n.isAdmin&&<AdminIcon />}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {n.displayName&&n.displayName}
                                            </TableCell>
                                            <TableCell>{n.email}</TableCell>
                                            <TableCell>{n.hasSignedUp?"Registered":"Invite Sent"}</TableCell>
                                            <TableCell padding="checkbox" numeric >
                                                <IconButton className={classes.notificationButton} aria-label="Add an alarm">
                                                    {n.notificationsEnabled?<NotificationOnIcon />:<NotificationOffIcon />}
                                                </IconButton>
                                                <IconButton className={classes.expandButton} aria-label="Add an alarm">
                                                    <ExpandIcon />
                                                </IconButton>
                                                
                                            </TableCell>
                                        </TableRow>
                                        );
                                    })}
                                    </TableBody>
                                </Table>
                            </Card>
                        </Grid>
                        <Grid item xs={4}>
                            <Card className={classes.card} elevation={10} style={{marginBottom: 16}}>
                                <CardContent className={classes.flexColumn}>
                                    <div className={classes.innerCardLeft}>
                                        <Typography variant="headline" component="h2" className={classes.pos}>
                                            Invite more users
                                        </Typography>
                                        <Typography variant="subheading" className={classes.pos}>
                                            Market buzz ramen launch party rockstar growth hacking partner network. Innovator burn rate prototype low hanging fruit monetization startup marketing pitch twitter success creative advisor backing launch party.
                                        </Typography>
                                        <Button variant="outlined" size="small" onClick={() => this.props.getOrganisationInformation({organisationId: this.props.user.accountInformation.info.organisationId})}>Why should I do this?</Button>
                                    </div>
                                    <div className={classes.innerCardRight}>
                                        <AddUserFields classes={classes}/>
                                    </div>
                                </CardContent>
                            </Card>
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