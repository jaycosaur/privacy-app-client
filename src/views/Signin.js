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

const styles = theme => {
    return ({
    root: {
      flexGrow: 1,
      height: "100vh"
    },
    control: {
      padding: theme.spacing.unit * 2,
    },
    formContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        padding: "2em",
        background: theme.palette.secondary.main
    },
    titleContainer: {
        background: theme.palette.primary.main,
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        padding: "8em",
        [theme.breakpoints.down('sm')]: {
            padding: "4em"
        }
    },
    mainText: {
        [theme.breakpoints.down('sm')]: {
            ...theme.typography.display1,
            color: "white",
            fontWeight: 500,
        },
        [theme.breakpoints.up('md')]: {
            ...theme.typography.display4,
            color: "white",
            fontWeight: 500,
        },
    },
    secondaryText: {
        color: "white",
        fontWeight: 300,
        [theme.breakpoints.down('sm')]: {
            ...theme.typography.display2,
            color: "white",
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
    signinButton: {
        background: theme.palette.primary.main,
        marginTop: 16, 
        width: "100%",
        height: 64,
        color: "white"
    }
  })};
  


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
  
const MaterialUiForm = props => {
    const { handleSubmit, submitting} = props
    return (
        <form onSubmit={handleSubmit} onKeyPress={e=>e.key==="Enter"&&handleSubmit}>
            <InputWrap>
                <Field name="email" suggested="current-email" component={renderTextField} placeholder="Email address"/>
            </InputWrap>
            <InputWrap>
                <Field suggested="current-password" name="password" component={renderTextField} placeholder="Password" type="password"/>
            </InputWrap>
            <div style={{marginBottom: 24, width: "100%"}}><Link to="/signin/resetpassword" style={{float: "right", color: "white"}}>Forgot password</Link></div>
            <Button 
              color="secondary" 
              disabled={ submitting || props.isLoading}
              variant="extendedFab" 
              type="submit"
              className={props.classes.signinButton}
              >
              <strong>SIGN-IN</strong>{props.isLoading&&"..."}
            </Button>
            <Typography align="center" variant="subheading" style={{marginTop: 24, width: "100%"}}><Link to="/signin/signup" style={{color: "white", width: "100%", textAlign: "center", fontWeight: 300}}>Not a member? <strong>Signup now</strong>.</Link></Typography>
        </form>
    )
}

const WrappedForm = reduxForm({form: 'signinUserForm', validate})(MaterialUiForm)

const Signin = (props) => {
    if (props.signInError&&props.signInErrorMessage){
        message.error(props.signInErrorMessage)
    }
    const { classes } = props
    return (
        <EntryFlowView
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
                    <Typography variant="display2" align="left" style={{color: "white"}} gutterBottom>Sign-in</Typography>,
                    <Typography variant="title" align="left" style={{color: "white", marginBottom: 32}} gutterBottom>
                        Managing compliance has never been this easy.
                    </Typography>,
                    <WrappedForm isLoading={props.isSigningIn} onSubmit={props.signInWithEmailAndPassword} classes={classes}/>
                ]
            }>
        </EntryFlowView>
    )
}

const mapStateToProps = (state) => {
    return {
        isSigningIn: state.user.isSigningIn,
        signInError: state.user.signInError,
        signInErrorMessage: state.user.signInErrorMessage&&state.user.signInErrorMessage.code
    }
}

export default connect(mapStateToProps, authActions)(withStyles(styles)(Signin))
