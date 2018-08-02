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

import { Field, reduxForm } from 'redux-form';

const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = 'Required'
    } else if (values.title.length === 0) {
        errors.title = 'Required'
    }
    return errors
  }
  
const renderTextField = ({ input: { value, onChange }, label,multiline, meta: { touched, error } }) => (
    <TextField 
        label={label}
        errorText={touched && error}
        value={value}
        onChange={onChange}
        fullWidth
        error={error}
        multiline={multiline}
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
                <Field name="description" component={renderTextField} label="Description" multiline/>
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
      width: 80,
      height: 80,
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
                    <Avatar className={classNames(classes.avatar, classes.bigAvatar)}>TM</Avatar>
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
                <WrappedForm onSubmit={props.updateInfo} initialValues={{title: data.title, description: data.description}}/>
            </Card>
            <Card className={classes.containerCard}>
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
            </Card>
            <div>
                <Typography variant="caption">
                    Created: {moment(data.created).format("LLLL")}
                </Typography>
            </div>
        </div>
        )
    }

export default withStyles(styles)(InfoTabView);
