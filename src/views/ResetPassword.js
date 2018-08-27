import React from 'react'
import { message } from 'antd'
import { connect } from 'react-redux'
import * as authActions from './../store/actions/authActions'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import EntryFlowView from './EntryFlowView'
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import Recaptcha from 'react-recaptcha'

const styles = theme => {
    return ({
      mainText: {
          [theme.breakpoints.down('sm')]: {
              ...theme.typography.display1,
              color: theme.palette.secondary.main,
              fontWeight: 500,
          },
          [theme.breakpoints.up('md')]: {
              ...theme.typography.display4,
              color: theme.palette.secondary.main,
              fontWeight: 500,
          },
      },
      secondaryText: {
          color: theme.palette.secondary.light,
          fontWeight: 300,
          [theme.breakpoints.down('sm')]: {
              ...theme.typography.display2,
              color: theme.palette.secondary.light,
              fontWeight: 300,
              textAlign: "center",
              marginTop: 64
          },
      },
      formCard: {
          maxWidth: 400,
          [theme.breakpoints.down('xs')]: {
              height: "60%"
          },
      },
      mainButton: {
          marginTop: 16, 
          width: "100%",
          height: 64,
          color: "white"
      }
    }
  )};
  


const validate = values => {
    const errors = {}
    if (!values.email) {
        errors.email = 'Required'
    } else if (values.email.length === 0) {
        errors.email = 'Required'
    }
    return errors
  }
  
const renderTextField = ({ input: { value, onChange }, label, meta: { touched, error }, ...custom }) => (
    <TextField 
        label={label}
        value={value}
        onChange={onChange}
        fullWidth
        error={touched && error}
        {...custom}
        margin="dense"
    />
)

const InputWrap = (props) => (
    <Button
        variant="contained" 
        disableFocusRipple
        style={{
            width: "100%",
            background: "white",
            borderRadius: "50px",
            paddingLeft: 32,
            paddingRight: 32,
            marginBottom: 16
        }} >
        {props.children}
    </Button>
)
  
class MaterialUiForm extends React.Component {
    render(){
      const { handleSubmit, submitting, isLoading, classes} = this.props
      return (
          <form onSubmit={handleSubmit} onKeyPress={e=>e.key==="Enter"&&handleSubmit}>
              <InputWrap>
                  <Field name="email" suggested="reset-email" component={renderTextField} placeholder="Email address"/>
              </InputWrap>
              <Button 
                color="secondary" 
                disabled={ submitting || isLoading }
                variant="extendedFab" 
                type="submit"
                className={classes.mainButton}
                >
                <strong>SEND EMAIL</strong>{isLoading&&"..."}
              </Button>
              <Typography align="center" variant="subheading" style={{marginTop: 24, width: "100%"}}><Link to="/" style={{color: "white", width: "100%", textAlign: "center", fontWeight: 300}}>Already signed up?</Link></Typography>
          </form>
      )
    }  
}

const WrappedForm = reduxForm({form: 'signinUserForm', validate})(MaterialUiForm)

const SignupView = (props) => {
    if (props.signInError){
        message.error(props.signInErrorMessage)
    }

    if (props.resetEmailSent){
        message.success('Email successfully sent, check your inbox! Redirecting to sign-in.', 3, ()=>props.history.push("/"));
    }

    const { classes, resetEmailSent } = props
    return (
        <EntryFlowView
            alternate
            leftCard={
                [
                    <Hidden mdDown>
                        <Typography variant="display4" align="left" gutterBottom className={classes.mainText}>POLIBASE.</Typography>
                    </Hidden>,
                    <Typography variant="display2" className={classes.secondaryText}>Making compliance simple.</Typography>
                ]
            }
            rightCard={
                [
                    <Typography variant="display2" align="left" style={{color: "white"}} gutterBottom>Reset Password</Typography>,
                    !resetEmailSent&&<Typography variant="subheading" align="left" style={{color: "white", marginBottom: 32}} gutterBottom>
                        We will send a link to your email address to reset your password.
                    </Typography>,
                    !resetEmailSent&&<WrappedForm isLoading={props.isSigningUp} onSubmit={props.doPasswordReset} classes={classes}/>,
                    resetEmailSent&&<Typography variant="title" align="left" style={{color: "white", marginTop: 32}} gutterBottom>
                    Email sent successfully.
                </Typography>
                ]
            }>
        </EntryFlowView>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        isSigningIn: state.user.isSendingResetEmail,
        signInError: state.user.resetEmailError,
        signInErrorMessage: state.user.resetEmailErrorMessage&&state.user.resetEmailErrorMessage.code,
        resetEmailSent: state.user.resetEmailSent
    }
}

export default connect(mapStateToProps, authActions)(withStyles(styles)(SignupView))
