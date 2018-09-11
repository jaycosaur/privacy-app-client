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
    if (!values.password) {
        errors.password = 'Required'
    } else if (values.password.length === 0) {
        errors.password = 'Required'
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
    <div
        style={{
            width: "100%",
            background: "white",
            borderRadius: "50px",
            padding: 16,
            paddingLeft: 32,
            paddingRight: 32,
            marginBottom: 16,
        }} >
        {props.children}
    </div>
)
  
class MaterialUiForm extends React.Component {
    state = {
      verified: false
    }

    verifyCallback = (e) => {
      this.setState({
        verified: true
      })
    }

    render(){
      const { handleSubmit, submitting, isLoading, classes} = this.props
      return (
          <form onSubmit={handleSubmit} onKeyPress={e=>e.key==="Enter"&&handleSubmit}>
              <InputWrap>
                  <Field name="email" suggested="signup-email" component={renderTextField} placeholder="Email address"/>
              </InputWrap>
              <InputWrap>
                  <Field suggested="signup-password" name="password" component={renderTextField} placeholder="Password" type="password"/>
              </InputWrap>
              <Recaptcha
                sitekey="6Ld2a2wUAAAAAN6QnVPRbFWhXfO2_AV1iBX7RijO"
                verifyCallback={this.verifyCallback}
              />
              <Button 
                color="secondary" 
                disabled={ !this.state.verified || submitting || isLoading }
                variant="extendedFab" 
                type="submit"
                className={classes.mainButton}
                >
                <strong>SIGNUP</strong>{isLoading&&"..."}
              </Button>
              <Typography align="center" variant="subheading" style={{marginTop: 24, width: "100%"}}><Link to="/" style={{color: "white", width: "100%", textAlign: "center", fontWeight: 300}}>Already signed up?</Link></Typography>
          </form>
      )
    }  
}

const WrappedForm = reduxForm({form: 'signinUserForm', validate})(MaterialUiForm)

const SignupView = (props) => {
    if (props.signUpError){
        message.error(props.signUpErrorMessage.message)
    }
    const { classes } = props
    return (
        <EntryFlowView
            alternate
            leftCard={
                [
                    <Hidden mdDown>
                        <Typography variant="display4" align="left" gutterBottom className={classes.mainText}>PRIVTALK.</Typography>
                    </Hidden>,
                    <Typography variant="display2" className={classes.secondaryText}>Making privicy simple.</Typography>
                ]
            }
            rightCard={
                [
                    <Typography variant="display2" align="left" style={{color: "white"}} gutterBottom>Signup to Privtalk</Typography>,
                    <Typography variant="subheading" align="left" style={{color: "white", marginBottom: 32}} gutterBottom>
                        Manage compliance across your organisation and stay on-top of ever-changing laws, all on one easy-to-use web platform. We'd love to have you on-board.
                    </Typography>,
                    <WrappedForm isLoading={props.isSigningUp} onSubmit={props.doCreateUserWithEmailAndPassword} classes={classes}/>
                ]
            }>
        </EntryFlowView>
    )
}

const mapStateToProps = (state) => {
  return {
      isSigningUp: state.user.isSigningUp,
      signUpError: state.user.signUpError,
      signUpErrorMessage: state.user.signUpErrorMessage,
  }
}

export default connect(mapStateToProps, authActions)(withStyles(styles)(SignupView))
