import React from 'react'
import { message } from 'antd'
import { connect } from 'react-redux'
import * as authActions from './../store/actions/authActions'
import { Link } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import backgroundImg from './../assets/unauthbackground.jpg';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Field, reduxForm } from 'redux-form';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';

const styles = theme => {
    
    console.log(theme)
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
        [theme.breakpoints.up('md')]: {
            background: "linear-gradient(to right, rgba(249,119,148,0) 0%, rgba(249,119,148,0.1) 25%, rgba(249,119,148,0.1) 100%)"
        },
        padding: "2em"
    },
    titleContainer: {
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
        errorText={touched && error}
        value={value}
        onChange={onChange}
        fullWidth
        margin="normal"
        error={touched && error}
        {...custom}
        margin="dense"
        autocomplete="off"
    />
)

const InputWrap = (props) => (
    <Button
        variant="contained" 
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
    const { handleSubmit, pristine, reset, submitting, submitSucceeded } = props
    return (
        <form onSubmit={handleSubmit} autocomplete="off" onKeyPress={e=>e.key==="Enter"&&handleSubmit}>
            <InputWrap>
                <Field name="email" component={renderTextField} placeholder="Email address"/>
            </InputWrap>
            <InputWrap>
                <Field name="password" component={renderTextField} placeholder="Password" type="password"/>
            </InputWrap>
            <div style={{marginBottom: 24, width: "100%"}}><Link to="/signin/resetpassword" style={{float: "right", color: "white"}}>Forgot password</Link></div>
            <Button 
              color="secondary" 
              disabled={ submitting || props.isLoading}
              variant="extendedFab" 
              type="submit"
              style={{ 
                marginTop: 16, 
                width: "100%",
                height: 64,
                color: "white"
              }} 
              className="login-form-button"
              >
              <strong>SIGN-IN</strong>{props.isLoading&&"..."}
            </Button>
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
      <div style={{
        background: "white",
        backgroundImage: `url(${backgroundImg})`,
        position: "fixed",
        backgroundSize: "cover",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}>
        <Grid container className={classes.root} spacing={0}>
            <Hidden xsDown>
                <Grid item sm={12} md={6} className={classes.titleContainer}>
                    <Hidden mdDown>
                        <Typography variant="display4" align="left" gutterBottom className={classes.mainText}>POLIBASE.</Typography>
                    </Hidden>
                    <Typography variant="display2" className={classes.secondaryText}>Automating regulatory compliance for Australian organisations.</Typography>
                </Grid>
            </Hidden>
            <Grid item sm={12} md={6} className={classes.formContainer}>
                <div className={classes.formCard}>
                    <Typography variant="title" align="left" style={{color: "white"}} gutterBottom>Sign-in</Typography>
                    <Typography variant="subheading" align="left" style={{color: "white", marginBottom: 32}} gutterBottom>
                        We are currently undergoing closed BETA. If you would like to be part of this BETA please drop us a line <a href="http://polibase.com.au/sign-up-for-the-pilot/" target="_blank">here.</a>
                    </Typography>
                    <WrappedForm isLoading={props.isSigningIn} onSubmit={props.signInWithEmailAndPassword}/>
                </div>
            </Grid>
        </Grid>
      </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        isSigningIn: state.user.isSigningIn,
        signInError: state.user.signInError,
        signInErrorMessage: state.user.signInErrorMessage&&state.user.signInErrorMessage.code
    }
}

export default connect(mapStateToProps, authActions)(withStyles(styles)(Signin))
