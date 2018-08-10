import React from 'react'

import ButtonMD from '@material-ui/core/Button';

import TextField from '@material-ui/core/TextField';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import moment from 'moment'
import SelectTeamMember from './../components/SelectTeamMember'
import PeopleIcon from '@material-ui/icons/People';
import { connect } from 'react-redux'

import { Field, reduxForm } from 'redux-form';

const getInitials = (fullName) => fullName.split(" ").map(n=>n[0]).join("")

const shortenName = (fullName) => fullName.split(" ").map((n,i)=>i===0?`${n[0]}.`:n).join(" ")


const RenderUserAvatarAndName = (props) => {
    return <Avatar className={props.className}>{props.id&&props.team[props.id].displayName?getInitials(props.team[props.id].displayName):<PeopleIcon />}</Avatar>
}

const mstp = (state, ownProps) => {
    return {
        team: state.organisation.users.reduce((a,u)=>({...a, [u.userId]:{...u}}),{})
    }
}
    
const UserAvatarAndName = connect(mstp)(RenderUserAvatarAndName)

const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = 'Required'
    } else if (values.title.length === 0) {
        errors.title = 'Required'
    }
    return errors
  }
  
const renderTextField = ({ input: { value, onChange }, label,multiline, rows, meta: { touched, error } }) => (
    <TextField 
        label={label}
        errorText={touched && error}
        value={value}
        onChange={onChange}
        fullWidth
        error={error}
        multiline={multiline}
        rows={rows}
    />
)
  
const MaterialUiForm = props => {
    const { handleSubmit, pristine, submitting } = props
    return (
        <form onSubmit={handleSubmit}>
            <DialogContent>
                <Field name="title" component={renderTextField} label="Title" />
            </DialogContent>
            <DialogContent>
                <Field name="description" component={renderTextField} label="Description" multiline rows={4}/>
            </DialogContent>
            <DialogContent>
                <Field name="documentReference" component={renderTextField} label="Linked document reference" multiline rows={4}/>
            </DialogContent>
            <DialogActions>
                <ButtonMD type="submit" color="primary" disabled={pristine || submitting}>
                    Update
                </ButtonMD>
            </DialogActions>
        </form>
    )
}

const WrappedForm = reduxForm({form: 'createProjectForm', validate})(MaterialUiForm)

const styles = theme => ({
    row: {
      display: 'flex',
      justifyContent: 'center',
    },
    avatar: {
      margin: 4,
    },
    bigAvatar: {
      background: "#623aa2"
    },
    containerCardFlex: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    root: {
        padding: theme.spacing.unit*2
    },
    containerCard: {
        marginBottom: theme.spacing.unit*2,
    }
  })

  
const InfoTabView = (props) => {
    const { classes, data } = props;

    console.log(data)
    return (
        <div className={classes.root}>
            <Card className={classes.containerCard}>
                <CardContent className={classes.containerCardFlex}>
                     
                    <div>
                        <div className={classes.containerCardFlex}>
                            <SelectTeamMember
                                handleChange={({userId})=>this.props.updateInfo({ownerId: userId})} 
                                buttonContent={<UserAvatarAndName className={classNames(classes.avatar, classes.bigAvatar)} id={data.ownerId} avatar/>} 
                                buttonStyle={{marginRight: "8px"}}
                            />
                        </div>
                        <Typography variant="caption">
                            Obligation Owner
                        </Typography>
                    </div>
                    <div>
                        <div className={classes.containerCardFlex}>
                            <Avatar className={classes.avatar}>TM</Avatar>
                            <Avatar className={classes.avatar}>TM</Avatar>
                            <Avatar className={classes.avatar}>TM</Avatar>
                            <Avatar className={classes.avatar}>TM</Avatar>
                            <IconButton>
                                <PersonAddIcon />
                            </IconButton>
                        </div>
                        <Typography variant="caption">
                            Users Subscribed to Updates
                        </Typography>
                    </div>
                </CardContent> 
            </Card>
            <Card className={classes.containerCard}>
                <WrappedForm onSubmit={props.updateInfo} initialValues={{title: data.title, description: data.description, documentReference: data.documentReference}}/>
            </Card>
            {false&&<Card className={classes.containerCard}>
                {<List>
                    <ListItem>
                        <ListItemText primary="Number of Tasks" />
                        {data.tasks?Object.keys(data.tasks).length:"None"}
                    </ListItem>
                    <ListItem>
                        <ListItemText inset primary="Completed" />
                        {data.tasks?Object.keys(data.tasks).filter(i=>data.tasks[i].isDone).length:"None"}
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Number of Notes" />
                        {data.notes?Object.keys(data.notes).length:"None"}
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Number of Files" />
                        {data.files?Object.keys(data.files).length:"None"}
                    </ListItem>
                </List>}
            </Card>}
            <div>
                <Typography variant="caption">
                    Created: {moment(data.created).format("LLLL")}
                </Typography>
            </div>
        </div>
        )
    }

export default withStyles(styles)(InfoTabView);
