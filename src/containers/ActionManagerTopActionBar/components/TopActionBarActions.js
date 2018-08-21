import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connect } from 'react-redux'
import * as reduxActions from '../../../store/actions/actionManagerActions'

import { Field, reduxForm } from 'redux-form';

const validate = values => {
    const errors = {}
    if (!values.title) {
        errors.title = 'Required'
    } else if (values.title.length === 0) {
        errors.title = 'Required'
    }
    if (!values.description) {
        errors.description = 'Required'
    } else if (values.description.length === 0) {
        errors.description = 'Required'
    }
    return errors
  }
  
  const renderTextField = ({ input: { value, onChange }, label, meta: { touched, error } }) => (
    <TextField 
      label={label}
      errorText={touched && error}
      value={value}
      onChange={onChange}
      fullWidth
      margin="dense"
      error={error}
    />
  )
  
  const MaterialUiForm = props => {
    const { handleSubmit } = props
    return (
      <form onSubmit={handleSubmit}>
        <DialogTitle id="form-dialog-title">Create New Project</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Let's get started in making a new project. To begin fill out the form below and select Create Project.
            </DialogContentText>
            <Field name="title" component={renderTextField} label="Project title"/>
            <Field name="description" component={renderTextField} label="Project description"/>
        </DialogContent>
        <DialogActions>
            <Button onClick={()=>props.closeCreateProjectsInManagerDialogue()} color="primary">
                Cancel
            </Button>
            <Button type="submit" color="primary">
                Create Project
            </Button>
        </DialogActions>
      </form>
    )
  }

const WrappedForm = reduxForm({form: 'createProjectForm',validate})(MaterialUiForm)

const styles = () => ({
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    strongTitle: {
        flex: 1,
        color: "white"
    },
    buttonSelected: {
        color: "white"
    },
    button: {
        color: "white"
    }
})

const ActionCreator = (props) => {
    const { classes } = props
    const actionsArray = [
            <Button variant="contained" color="secondary" aria-label="Add" className={classes.button} onClick={()=>props.openCreateProjectsInManagerDialogue()}>
                ADD PROJECT
            </Button>,
            <Dialog
                open={props.createDialogueIsOpen}
                onClose={()=>props.closeCreateProjectsInManagerDialogue()}
                aria-labelledby="form-dialog-title"
            >
                <WrappedForm onSubmit={props.createProjectInManager} {...props}/>
            </Dialog>
        ]

    return (<span>{actionsArray}</span>)
}

const mapStateToProps = (state) => {
    return {
        createDialogueIsOpen: state.actionManager.dialogs.createProject.isOpen
    }
}

export const TopBarActions = connect(mapStateToProps, {...reduxActions})(withStyles(styles)(ActionCreator))
export const topBarTitle = ["Regulatory Developments", <small>(343 results, 15 new)</small>]

