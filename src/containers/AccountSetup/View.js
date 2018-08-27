import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


import { connect } from 'react-redux'

import WindowContainer from './containers/WindowContainer'
import * as accountSetupActions from './../../store/actions/accountSetupActions'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Field, reduxForm } from 'redux-form'

import TextField from '@material-ui/core/TextField'

import * as queryString from 'qs'

import TellUsAboutYourself from './views/TellUsAboutYourself'
import TellUsAboutYourTeam from './views/TellUsAboutYourTeam'
import InviteNewTeamMembers from './views/InviteNewTeamMembers'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'name']
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  return errors
}

const renderTextField = ({ input: { value, onChange }, label, meta: { touched, error } }) => (
  <TextField 
    label={(touched && error)?error:label}
    error={touched && error}
    value={value}
    onChange={onChange}
    fullWidth
  />
)

const MaterialUiForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit} style={{width: "100%"}}>
        <div style={{marginBottom: 24}}>
            <Field name="name" component={renderTextField} label="Organisation Name"/>
        </div>
        <div style={{marginBottom: 24}}>
            <Field name="website" component={renderTextField} label="Organisation Website (optional)"/>
        </div>
        <div>
            <Button style={{float: "left"}} type="submit" variant="outlined" disabled={pristine || submitting}>Submit</Button>
        </div>
    </form>
  )
}

const mapStateToProps = (state) => {
    return {
        accountSetup: state.user.accountSetup,
        isSubmitting: state.organisation.creatingNewOrganisation,
        createNewOrganisationSuccess: state.organisation.createNewOrganisationSuccess,
        newTeamInfo: state.organisation.newTeamInfo,
        createNewOrganisationError:  state.organisation.createNewOrganisationError
    }
}

const WrappedForm = reduxForm({form: 'UserSetupInformationForm',validate})(MaterialUiForm)

const ViewSwitch = (props) => {
    const { newTeamInfo, isSubmitting, createNewOrganisationSuccess, createNewOrganisationError, location: { pathname } } = props
    switch(pathname){
        case "/create-new-team":
            return <TellUsAboutYourTeam  {...props}/>
        case "/invite-users":
            return <InviteNewTeamMembers {...props}/>
        case "/awaiting-invite":
            return [
                <Typography variant="headline" style={{color: "white"}} gutterBottom>Invites are sent directly to your email. Just click the button in the email.</Typography>,
                <Typography variant="subheading" style={{color: "white"}}>Invites can take up to 5 minutes to send, if you haven't recieved an invite don't forget to check your spam or ask the sender to resend.</Typography>,
            ]
        default: 
            return <TellUsAboutYourTeam  {...props}/>
    }
}

export default connect(mapStateToProps, {...accountSetupActions})(ViewSwitch)